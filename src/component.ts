import { Observable } from './observable'

interface Observables {
    [name: string]: Observable<any>
}

export default class Component {
    public observables: Observables
    private self?: Element
    private parent?: Element | ShadowRoot

    rerender() {
        this.init(this.parent)
    }

    init(parent: Element | ShadowRoot) {
        const components = this.render()

        if (this.parent && this.self) {
            this.parent.removeChild(this.self)

            this.self = undefined
        }

        this.parent = parent

        if (Array.isArray(components)) {
            this.self = document.createElement('div')
            components.forEach((component) => {
                component.init(this.self)
            })
            this.parent.appendChild(this.self)
        } else if (components instanceof Component) {
            components.init(this.parent)
            this.self = components.self
            this.parent.appendChild(this.self)
        } else {
            this.self = components
            this.parent.appendChild(this.self)
        }
    }

    render(): Component[] | Component | Element {
        return []
    }
}

export function createElement(component: { new (): Component }, name: string) {
    class CustomElement extends HTMLElement {
        public root: Component

        constructor() {
            super()
            this.root = new component()
            this.root.init(this)
        }
    }

    customElements.define(name, CustomElement)
}

