import RootComponent from './rootComponent'
import Component from '../component'

export default class Track extends RootComponent {
    public element = document.createElement('track')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}