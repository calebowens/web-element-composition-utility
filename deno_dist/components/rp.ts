import { RootComponent } from './rootComponent.ts'

export class RP extends RootComponent {
    public element = document.createElement('rp')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}