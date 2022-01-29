import { RootComponent } from './rootComponent'

export class Bdi extends RootComponent {
    public element = document.createElement('bdi')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}