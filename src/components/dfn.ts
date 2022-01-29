import RootComponent from './rootComponent'

export default class DFN extends RootComponent {
    public element = document.createElement('dfn')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}