import { RootComponent } from './rootComponent.ts'

export class EM extends RootComponent {
    public element = document.createElement('em')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}