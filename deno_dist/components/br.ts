import { RootComponent } from './rootComponent.ts'

export class BR extends RootComponent {
    public element = document.createElement('br')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}