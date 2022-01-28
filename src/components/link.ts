import Component from '../component'

export default class Link extends Component {
    public element = document.createElement('link')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}