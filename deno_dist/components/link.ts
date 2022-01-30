import { RootComponent } from './rootComponent.ts'

export class Link extends RootComponent {
    public element = document.createElement('link')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}