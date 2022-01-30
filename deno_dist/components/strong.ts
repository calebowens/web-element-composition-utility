import { RootComponent } from './rootComponent.ts'

export class Strong extends RootComponent {
    public element = document.createElement('strong')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}