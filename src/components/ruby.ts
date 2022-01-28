import Component from '../component'

export default class Ruby extends Component {
    public element = document.createElement('ruby')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}