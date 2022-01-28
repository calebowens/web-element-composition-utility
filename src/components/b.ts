import Component from '../component'

export default class B extends Component {
    public element = document.createElement('b')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}