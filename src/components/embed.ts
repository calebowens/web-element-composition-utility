import Component from '../component'

export default class Embed extends Component {
    public element = document.createElement('embed')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}