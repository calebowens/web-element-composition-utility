import RootComponent from './rootComponent'

export default class Embed extends RootComponent {
    public element = document.createElement('embed')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}