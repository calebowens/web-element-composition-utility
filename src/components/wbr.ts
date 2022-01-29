import RootComponent from './rootComponent'

export default class Wbr extends RootComponent {
    public element = document.createElement('wbr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}