# Web Element Composition Utility

## About

WECU is a library that lets you create web components and compose them together using an intuitive OOP system.

The idea behind WECU is that it lets the user take control of the program, with the user calling it on their own terms. WECU is based arround the idea that the GUI is bound to your data in the class, just how your actions are also. It results in creating a nice abstraction over the DOM for implementing reactive behaviour without taking any control away from the programmer like a framework would.

## Who This is For

This library will be ideal for:

- People who want to be able to manage each part of their web app
- Still want convenience of being able to create and compose components
- Would like to be able to program in a more traditional OOP way

## Demo Projects

I've written a demo project using webpack and typescript that I encourage you to check out at [https://github.com/calebowens/wecu-example](https://github.com/calebowens/wecu-example)

## Using Deno as Bundler

For usage with deno you can use the import link `https://deno.land/x/wecu@<VERSION_NUMBER>/deno_dist/index.ts`.

For bundling deno you'll need to use the enable libs "dom" and "es2015" in your deno.json.

## Examples

These examples have been written with the following webpack based setup in mind:

1. Install typescript

- Run `yarn add typescript`
- Add `tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./public/",
    "noImplicitAny": true,
    "target": "es2015",
    "allowJs": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "strict": true
  },
  "include": ["./src"]
}
```

2. Install webpack

- Run `yarn add webpack webpack-cli ts-loader`
- Add `webpack.config.js`

```js
const path = require("path");

module.exports = {
  mode: "development",
  watch: true,

  entry: "./src/main.ts",

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },
};
```

3. Place `main.ts` in `src/`
4. Place `index.html` in `public/`
5. Compile typescript `yarn tsc`
6. Run webpack `yarn webpack`
7. Visit your `index.html`

### Root of an app

main.ts

```ts
import { Component, P } from "wecu";

class Root extends Component {
  constructor() {
    super();
    // Init on the root element
    this.init(document.getElementById("app"));
  }

  render() {
    return [new P("Hello World!")];
  }
}

new Root();
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

### Conditional Rendering

main.ts

```ts
import { Component, P, Button } from "wecu/component";

class Root extends Component {
  private toggle = new Button("Toggle");
  private show = true;

  constructor() {
    super();

    this.init(document.getElementById("app")); // Register the event listener on the internal element of the button

    this.toggle.element.addEventListener("click", () => {
      this.show = !this.show; // We've modified state so we need to re-render the button
      this.rerender();
    });
  }
  render() {
    if (this.show) {
      return [new P("HelloThere!"), this.toggle];
    } else {
      return [this.toggle];
    }
  }
}

new Root();
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

### Using an observable variable

main.ts

```ts
import { Component, Observable, P, Button } from "wecu/component";

class Root extends Component {
  private toggle = new Button("Toggle");

  private show = new Observable(true);

  constructor() {
    super();

    this.init(document.getElementById("app"));

    // Register the event listener on the internal element of the button
    this.toggle.element.addEventListener("click", () => {
      this.show.value = !this.show.value;
    });

    // Rather than calling rerender in the button event listener, I can
    //   observe the value for changes
    this.show.onUpdate(() => {
      this.rerender();
    });
  }

  render() {
    if (this.show) {
      return [new P("Hello There!"), this.toggle];
    } else {
      return [this.toggle];
    }
  }
}

new Root();
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

### Registering a Component as a Web Component

main.ts

```ts
import { Component, createElement, P } from "wecu/component";

class Root extends Component {
  constructor() {
    super();

    // As we're registering it as a web component, I don't need to call
    //   init().
    // We could remove the constructor as we're not instantiating any variables
    //   here.
  }

  render() {
    return [new P("Hello World!")];
  }
}

createElement(Root, "x-root");
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <x-root></x-root>
  </body>
</html>
```

### Styling the Component

main.ts

```ts
import { Component, createElement, P } from "wecu/component";

class Root extends Component {
  render() {
    this.styles = `
      :host {
        width: 100%;
      }

      p {
        color: green;
      }
    `;

    return [new P("Hello World!")];
  }
}

createElement(Root, "x-root");
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <x-root></x-root>
  </body>
</html>
```

### Using an Emitter

main.ts

```ts
import { Button, Component, Input, Emitter, P } from "wecu";

export default class CreateTask extends Component {
  private addTask = new Button("Create Task");
  private input = new Input();

  public taskEmitter = new Emitter<string>();

  constructor() {
    super();

    this.addTask.element.addEventListener("click", () => {
      this.taskEmitter.emit(this.input.element.value);

      this.input.element.value = "";
    });
  }

  render() {
    return [this.input, this.addTask];
  }
}

export default class Root extends Component {
  private tasks: P[] = [];
  private taskCreator = new CreateTask();

  constructor() {
    super();

    this.taskCreator.taskEmitter.onEmit((title) => {
      this.tasks.push(new P(title));

      this.rerender();
    });
  }

  render() {
    return [this.taskCreator, ...this.tasks];
  }
}

createElement(Root, "x-root");
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="main.js" async defer></script>
  </head>

  <body>
    <x-root></x-root>
  </body>
</html>
```
