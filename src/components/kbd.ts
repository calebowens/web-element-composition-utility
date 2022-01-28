import Component from '../component'

export default class KBD extends Component {
    public element = document.createElement('kbd')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}