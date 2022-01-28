import Component from '../component'

export default class Sub extends Component {
    public element = document.createElement('sub')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}