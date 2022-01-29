import RootComponent from './rootComponent'

export default class KBD extends RootComponent {
    public element = document.createElement('kbd')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}