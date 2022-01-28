import Component from '../component'

export default class Img extends Component {
    public element = document.createElement('img')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}