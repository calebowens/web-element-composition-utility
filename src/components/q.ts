import Component from '../component'

export default class Q extends Component {
    public element = document.createElement('q')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}