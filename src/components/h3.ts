import Component from '../component'

export default class H3 extends Component {
    public element = document.createElement('h3')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}