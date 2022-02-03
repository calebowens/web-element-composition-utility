import { RootComponent } from './rootComponent.ts'
import { Component } from '../component.ts'

export class Canvas extends RootComponent {
    public element = document.createElement('canvas')

    constructor(public children?: string | Component[]) {
        super()
    }

    render() {
        if (Array.isArray(this.children)) {
            this.children.forEach((component) => {
                component.init(this.element)
            })
        } else {
            this.element.innerText = this.children ?? ''
        }

        return this.element
    }
}