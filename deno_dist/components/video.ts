import { RootComponent } from './rootComponent.ts'

export class Video extends RootComponent {
    public element = document.createElement('video')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}