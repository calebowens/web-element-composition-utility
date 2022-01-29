import RootComponent from './rootComponent'

export default class Input extends RootComponent {
    public element = document.createElement('input')

    render() {
        return this.element
    }
}