import Component, { createElement } from "./component"
import Button from "./components/button"
import Div from "./components/div"
import P from "./components/p"
import { observable } from "./observable"

class SubComponent extends Component {
    render() {
        return new P('Test')
    }
}

class Root extends Component {
    private toggle = new Button('Toggle')

    @observable()
    private show = true

    constructor() {
        super()

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
                this.toggle,
                new Div([new P('Hello again')]),
                new SubComponent()
            ]
        } else {
            return [
                this.toggle
            ]
        }
    }
}

createElement(Root, 'x-test')