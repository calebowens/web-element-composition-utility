import Component from '../component'

export default class Stamp extends Component {
    public element = document.createElement('stamp')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}