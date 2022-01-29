import { RootComponent } from './rootComponent'

export class Cite extends RootComponent {
    public element = document.createElement('cite')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}