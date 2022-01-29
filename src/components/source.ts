import RootComponent from './rootComponent'

export default class Source extends RootComponent {
    public element = document.createElement('source')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}