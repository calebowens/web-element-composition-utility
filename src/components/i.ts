import { RootComponent } from './rootComponent'

export class I extends RootComponent {
    public element = document.createElement('i')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}