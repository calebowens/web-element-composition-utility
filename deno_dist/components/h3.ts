import { RootComponent } from './rootComponent.ts'

export class H3 extends RootComponent {
    public element = document.createElement('h3')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}