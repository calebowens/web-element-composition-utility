import Component from '../component'

export default class Bdo extends Component {
    public element = document.createElement('bdo')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}