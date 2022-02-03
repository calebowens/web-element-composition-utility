import { RootComponent } from './rootComponent.ts'

export class Textarea extends RootComponent {
    public element = document.createElement('textarea')

    render() {
        return this.element
    }
}