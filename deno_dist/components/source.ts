import { RootComponent } from './rootComponent.ts'

export class Source extends RootComponent {
    public element = document.createElement('source')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}