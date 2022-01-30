import { RootComponent } from './rootComponent.ts'

export class Small extends RootComponent {
    public element = document.createElement('small')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}