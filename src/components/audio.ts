import RootComponent from './rootComponent'
import Component from '../component'

export default class Audio extends RootComponent {
    public element = document.createElement('audio')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}