import RootComponent from './rootComponent'

export default class Ruby extends RootComponent {
    public element = document.createElement('ruby')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}