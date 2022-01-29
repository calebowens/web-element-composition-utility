import { RootComponent } from './rootComponent'

export class Sup extends RootComponent {
    public element = document.createElement('sup')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}