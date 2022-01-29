import { RootComponent } from './rootComponent'

export class Img extends RootComponent {
    public element = document.createElement('img')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}