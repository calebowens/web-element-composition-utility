import RootComponent from './rootComponent'

export default class HR extends RootComponent {
    public element = document.createElement('hr')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}