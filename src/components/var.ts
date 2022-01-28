import Component from '../component'

export default class Var extends Component {
    public element = document.createElement('var')

    constructor(public children?: string) {
        super()
    }

    render() {
        this.element.innerText = this.children

        return this.element
    }
}