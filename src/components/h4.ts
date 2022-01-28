import Component from '../component'

export default class H4 extends Component {
    public element = document.createElement('h4')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}