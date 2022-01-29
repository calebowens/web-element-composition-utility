import RootComponent from './rootComponent'

export default class Abbr extends RootComponent {
    public element = document.createElement('abbr')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}