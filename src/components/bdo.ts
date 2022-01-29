import RootComponent from './rootComponent'

export default class Bdo extends RootComponent {
    public element = document.createElement('bdo')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}