import Component from '../component'

export default class I extends Component {
    public element = document.createElement('i')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}