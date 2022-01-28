import Component from '../component'

export default class EM extends Component {
    public element = document.createElement('em')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}