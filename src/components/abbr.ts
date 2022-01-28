import Component from '../component'

export default class Abbr extends Component {
    public element = document.createElement('abbr')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}