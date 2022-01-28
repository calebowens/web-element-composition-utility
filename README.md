# web-element-composition-utility

So... I woke up one moring and thought "I don't like traditional web frameworks".
Here is what I don't like
- You can't just have one or two components in HTML
- You can't manipulate child component's state from its parent, without managing that part of state in the parent
- You don't controll re-renders
This library aims to fix those. Maybe it will or maybe there is good reason for some of the existing constraints.

## Examples

### Root of an app

```ts
class Root extends Component {
    constructor() {
        // Init on the root element
        this.init(document.getElementById('app'))
    }

    render() {
        return [
            new P('Hello World!')
        ]
    }
}

new Root()
```

### Conditional Rendering

```ts
class Root extends Component {
    private toggle = new Button('Toggle')
    private show = true

    constructor() {
        super()
        this.init(document.getElementById('app'))

        // Register the event listener on the internal element of the button
        this.toggle.element.addEventListener('click', () => {
            this.show = !this.show

            // We've modified state so we need to re-render the button
            this.rerender()
        })
    }

    render() {
        if (this.show) {
            return [
                new P('Hello There!'),
                this.toggle
            ]
        } else {
            return [
                this.toggle
            ]
        }
    }
}

new Root()
```

### Using an observable vairable

```ts
class Root extends Component {
    private toggle = new Button('Toggle')

    @observable()
    private show = true

    constructor() {
        super()
        this.init(document.getElementById('app'))

        // Register the event listener on the internal element of the button
        this.toggle.element.addEventListener('click', () => {
            this.show = !this.show
        })

        // Rather than calling rerender in the button event listener, I can just observe the value for changes
        this.observables.show.onUpdate(() => {
            this.rerender()
        })
    }

    render() {
        if (this.show) {
            return [
                new P('Hello There!'),
                this.toggle
            ]
        } else {
            return [
                this.toggle
            ]
        }
    }
}

new Root()
```
