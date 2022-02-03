import { RootComponent } from './rootComponent.ts'
import { Component } from '../component.ts'

export class Footer extends RootComponent {
    public element = document.createElement('footer')

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