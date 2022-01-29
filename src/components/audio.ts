import { RootComponent } from './rootComponent'
import { Component } from '../component'

export class Audio extends RootComponent {
    public element = document.createElement('audio')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}