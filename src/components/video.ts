import RootComponent from './rootComponent'

export default class Video extends RootComponent {
    public element = document.createElement('video')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}