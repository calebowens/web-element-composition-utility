import { Observable } from './observable'

interface Observables {
    [name: string]: Observable<any>
}

export default class Component {
    public observables: Observables
    public attributes: {}
    private self?: Element
    private parent?: Element

    rerender() {
        this.init(this.parent)
    }

    init(parent: Element, _isWebComponent: boolean = false) {
        const components = this.render()

        if (this.parent && this.self) {
            this.parent.removeChild(this.self)

            this.self = undefined
        }

        this.parent = parent

        if (Array.isArray(components)) {
            if (_isWebComponent) {
                this.self = this.parent
            } else {
                this.self = document.createElement('div')
            }

            for (const key in this.attributes) {
                this.self.setAttribute(key, this.attributes[key])
            }
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
            this.root.init(this, true)
        }
    }

    customElements.define(name, CustomElement)
}

