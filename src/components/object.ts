import { RootComponent } from './rootComponent'

export class _Object extends RootComponent {
    public element = document.createElement('object')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}