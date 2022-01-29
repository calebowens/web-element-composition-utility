import { RootComponent } from './rootComponent'

export class Q extends RootComponent {
    public element = document.createElement('q')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}