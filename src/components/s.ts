import RootComponent from './rootComponent'

export default class S extends RootComponent {
    public element = document.createElement('s')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}