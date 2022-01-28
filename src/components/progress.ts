import Component from '../component'

export default class Progress extends Component {
    public element = document.createElement('progress')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}