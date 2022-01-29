import { RootComponent } from './rootComponent'

export class Wbr extends RootComponent {
    public element = document.createElement('wbr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}