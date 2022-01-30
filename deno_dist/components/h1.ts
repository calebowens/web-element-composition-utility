import { RootComponent } from './rootComponent.ts'

export class H1 extends RootComponent {
    public element = document.createElement('h1')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}