import RootComponent from './rootComponent'

export default class H2 extends RootComponent {
    public element = document.createElement('h2')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}