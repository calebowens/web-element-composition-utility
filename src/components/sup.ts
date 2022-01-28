import Component from '../component'

export default class Sup extends Component {
    public element = document.createElement('sup')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}