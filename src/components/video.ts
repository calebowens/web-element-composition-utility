import Component from '../component'

export default class Video extends Component {
    public element = document.createElement('video')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}