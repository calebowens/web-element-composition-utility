import RootComponent from './rootComponent'

export default class Strong extends RootComponent {
    public element = document.createElement('strong')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}