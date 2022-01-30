import { RootComponent } from './rootComponent.ts'

export class _Object extends RootComponent {
    public element = document.createElement('object')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}