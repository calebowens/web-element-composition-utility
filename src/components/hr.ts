import { RootComponent } from './rootComponent'

export class HR extends RootComponent {
    public element = document.createElement('hr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}