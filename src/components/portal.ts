import RootComponent from './rootComponent'

export default class Portal extends RootComponent {
    public element = document.createElement('portal')

    constructor(public children?: string){
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}