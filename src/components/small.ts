import Component from '../component'

export default class Small extends Component {
    public element = document.createElement('small')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}