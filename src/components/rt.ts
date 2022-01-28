import Component from '../component'

export default class RT extends Component {
    public element = document.createElement('rt')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}