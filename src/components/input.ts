import { RootComponent } from './rootComponent'

export class Input extends RootComponent {
    public element = document.createElement('input')

    render() {
        return this.element
    }
}