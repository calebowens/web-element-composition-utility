import Component from '../component'

export default class Mark extends Component {
    public element = document.createElement('mark')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}