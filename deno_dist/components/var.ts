import { RootComponent } from './rootComponent.ts'

export class Var extends RootComponent {
    public element = document.createElement('var')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}