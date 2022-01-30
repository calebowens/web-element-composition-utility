import { RootComponent } from './rootComponent.ts'

export class H4 extends RootComponent {
    public element = document.createElement('h4')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}