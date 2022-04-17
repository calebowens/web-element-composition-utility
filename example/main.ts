import { HTMLComponent, Component, registerComponent } from '../src/component'

class P extends HTMLComponent {
    constructor(innerText: string) {
        super(innerText)
        this.setElement(document.createElement('p'))
    }
}

class Button extends HTMLComponent {
    constructor(innerText: string) {
        super(innerText)
        this.setElement(document.createElement('button'))
    }
}

class Style extends HTMLComponent {
    constructor(innerText: string) {
        super(innerText)
        this.setElement(document.createElement('style'))
    }
}

class Foo extends Component {
    count = 0

    button = new Button('Clicky Click')

    style = new Style(`
p {
    color: red;
}
`)


    constructor() {
        super()

        this.button.element.addEventListener('click', () => {
            this.count += 1

            this.rerender()
        })
    }

    render() {
        return [
            new P(`Hi ${this.count}`),
            [
                new P('Hello'),
                new P('World'),
                this.button
            ],
            this.style
        ]
    }
}

registerComponent(Foo, 'x-root')
