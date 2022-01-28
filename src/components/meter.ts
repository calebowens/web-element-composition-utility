import Component from '../component'

export default class Meter extends Component {
    public element = document.createElement('meter')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}