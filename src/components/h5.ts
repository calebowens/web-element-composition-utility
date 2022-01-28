import Component from '../component'

export default class H5 extends Component {
    public element = document.createElement('h5')

    constructor(public children: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}