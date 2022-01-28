import Component from '../component'

export default class Source extends Component {
    public element = document.createElement('source')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}