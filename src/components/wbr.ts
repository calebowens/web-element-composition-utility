import Component from '../component'

export default class Wbr extends Component {
    public element = document.createElement('wbr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}