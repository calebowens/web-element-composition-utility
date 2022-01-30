import { RootComponent } from './rootComponent.ts'

export class Sub extends RootComponent {
    public element = document.createElement('sub')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}