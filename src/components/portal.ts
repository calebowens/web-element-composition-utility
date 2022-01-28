import Component from '../component'

export default class Portal extends Component {
    public element = document.createElement('portal')

    constructor(public children: string){
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}