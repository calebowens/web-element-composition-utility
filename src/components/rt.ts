import RootComponent from './rootComponent'

export default class RT extends RootComponent {
    public element = document.createElement('rt')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}