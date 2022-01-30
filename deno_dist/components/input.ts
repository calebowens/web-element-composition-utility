import { RootComponent } from './rootComponent.ts'

export class Input extends RootComponent {
    public element = document.createElement('input')

    render() {
        return this.element
    }
}