import { RootComponent } from './rootComponent'

export class H6 extends RootComponent {
    public element = document.createElement('h6')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}