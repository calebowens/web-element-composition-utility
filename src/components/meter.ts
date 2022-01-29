import { RootComponent } from './rootComponent'

export class Meter extends RootComponent {
    public element = document.createElement('meter')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}