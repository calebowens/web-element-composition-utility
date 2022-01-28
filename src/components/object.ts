import Component from '../component'

export default class Object extends Component {
    public element = document.createElement('object')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}