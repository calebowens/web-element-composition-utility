import { RootComponent } from './rootComponent'

export class Stamp extends RootComponent {
    public element = document.createElement('stamp')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}