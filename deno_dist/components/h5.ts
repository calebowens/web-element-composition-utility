import { RootComponent } from './rootComponent.ts'

export class H5 extends RootComponent {
    public element = document.createElement('h5')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children ?? ''

        return this.element
    }
}