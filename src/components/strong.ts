import Component from '../component'

export default class Strong extends Component {
    public element = document.createElement('strong')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}