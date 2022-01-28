import Component from '../component'

export default class H6 extends Component {
    public element = document.createElement('h6')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}