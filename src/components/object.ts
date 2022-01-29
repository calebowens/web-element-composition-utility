import RootComponent from './rootComponent'

export default class Object extends RootComponent {
    public element = document.createElement('object')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}