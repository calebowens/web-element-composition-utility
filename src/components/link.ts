import RootComponent from './rootComponent'

export default class Link extends RootComponent {
    public element = document.createElement('link')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}