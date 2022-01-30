import { RootComponent } from './rootComponent.ts'

export class Img extends RootComponent {
    public element = document.createElement('img')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}