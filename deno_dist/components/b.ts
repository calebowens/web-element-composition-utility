import { RootComponent } from './rootComponent.ts'

export class B extends RootComponent {
    public element = document.createElement('b')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}