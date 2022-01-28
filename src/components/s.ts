import Component from '../component'

export default class S extends Component {
    public element = document.createElement('s')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}