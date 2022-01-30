import { RootComponent } from './rootComponent.ts'
import { Component } from '../component.ts'

export class Track extends RootComponent {
    public element = document.createElement('track')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}