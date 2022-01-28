import Component from '../component'

export default class BR extends Component {
    public element = document.createElement('br')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}