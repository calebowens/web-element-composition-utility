import { RootComponent } from './rootComponent'

export class BR extends RootComponent {
    public element = document.createElement('br')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}