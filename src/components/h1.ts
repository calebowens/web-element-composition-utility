import Component from '../component'

export default class H1 extends Component {
    public element = document.createElement('h1')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}