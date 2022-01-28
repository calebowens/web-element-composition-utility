import Component from '../component'

export default class Track extends Component {
    public element = document.createElement('track')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}