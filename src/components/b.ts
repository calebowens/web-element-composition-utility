import RootComponent from './rootComponent'

export default class B extends RootComponent {
    public element = document.createElement('b')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}