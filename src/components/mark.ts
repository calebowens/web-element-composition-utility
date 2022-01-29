import { RootComponent } from './rootComponent'

export class Mark extends RootComponent {
    public element = document.createElement('mark')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}