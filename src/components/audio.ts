import Component from '../component'

export default class Audio extends Component {
    public element = document.createElement('audio')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}