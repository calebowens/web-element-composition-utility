import { RootComponent } from './rootComponent'

export class Textarea extends RootComponent {
    public element = document.createElement('textarea')

    render() {
        return this.element
    }
}