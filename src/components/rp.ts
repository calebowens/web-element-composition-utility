import Component from '../component'

export default class RP extends Component {
    public element = document.createElement('rp')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}