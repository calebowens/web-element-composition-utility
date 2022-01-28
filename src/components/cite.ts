import Component from '../component'

export default class Cite extends Component {
    public element = document.createElement('cite')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}