import { RootComponent } from './rootComponent.ts'

export class HR extends RootComponent {
    public element = document.createElement('hr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}