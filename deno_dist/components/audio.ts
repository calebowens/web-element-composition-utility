import { RootComponent } from './rootComponent.ts'
import { Component } from '../component.ts'

export class Audio extends RootComponent {
    public element = document.createElement('audio')

    constructor() {
        super()
    }

    render() {
        return this.element
    }
}