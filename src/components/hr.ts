import Component from '../component'

export default class HR extends Component {
    public element = document.createElement('hr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}