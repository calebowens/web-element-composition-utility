import { RootComponent } from './rootComponent'

export class Progress extends RootComponent {
    public element = document.createElement('progress')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}