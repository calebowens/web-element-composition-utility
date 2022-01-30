import { RootComponent } from './rootComponent.ts'

export class DFN extends RootComponent {
    public element = document.createElement('dfn')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}