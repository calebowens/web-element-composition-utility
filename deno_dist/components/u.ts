import { RootComponent } from './rootComponent.ts'

export class U extends RootComponent {
    public element = document.createElement('u')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}