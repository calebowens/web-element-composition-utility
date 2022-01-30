import { RootComponent } from './rootComponent.ts'

export class RT extends RootComponent {
    public element = document.createElement('rt')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}