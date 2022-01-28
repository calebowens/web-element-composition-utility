import Component from '../component'

export default class U extends Component {
    public element = document.createElement('u')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}