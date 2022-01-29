import RootComponent from './rootComponent'

export default class EM extends RootComponent {
    public element = document.createElement('em')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}