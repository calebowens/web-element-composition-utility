# Web Element Composition Utility

So... I woke up one moring and thought "I don't like traditional web frameworks".

Here is what I don't like:

- You can't just have one or two components in HTML
- You can't manipulate child component's state from its parent, without managing that part of state in the parent
- You don't controll re-renders

This library aims to fix those. Maybe it will or maybe there is good reason for some of the existing constraints.

## About

WECU is a library that lets you create web components and compose them together using an intuitive OOP system.

It has been made and tested using typescript but should also work in javascript but your milage may vary.

## Who This is For

This library will be ideal for:

- People who want to be able to manage each part of their web app
- Still want convenience of being able to create and compose components
- Would like to be able to program in a more traditional OOP way

## Examples

### Root of an app

```ts
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

### Conditional Rendering

```ts
class Root extends Component {
  private toggle = new Button("Toggle");
  private show = true;

  constructor() {
    super();
    this.init(document.getElementById("app"));

    // Register the event listener on the internal element of the button
    this.toggle.element.addEventListener("click", () => {
      this.show = !this.show;

      // We've modified state so we need to re-render the button
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

### Using an observable vairable

```ts
class Root extends Component {
  private toggle = new Button("Toggle");

  @observable()
  private show = true;

  constructor() {
    super();
    this.init(document.getElementById("app"));

    // Register the event listener on the internal element of the button
    this.toggle.element.addEventListener("click", () => {
      this.show = !this.show;
    });

    // Rather than calling rerender in the button event listener, I can just observe the value for changes
    this.observables.show.onUpdate(() => {
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

### Registering a Component as a Web Component

```ts
class Root extends Component {
  constructor() {
    super();

    // As we're registering it as a web component, I dont need to call init.
    // We could just leave off the constructor as we're not using it in this instance
  }

  render() {
    return [new P("Hello World!")];
  }
}

createElement(Root, "x-root");
```
