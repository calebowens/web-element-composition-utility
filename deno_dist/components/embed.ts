import { RootComponent } from './rootComponent.ts'

export class Embed extends RootComponent {
    public element = document.createElement('embed')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}