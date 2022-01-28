import Component from '../component'

export default class Bdi extends Component {
    public element = document.createElement('bdi')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}