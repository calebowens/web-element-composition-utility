import { Observable } from './observable'

interface Observables {
    [name: string]: Observable<any>
}

interface Attributes {
    [name: string]: string
}

export class Component {
    public observables: Observables = {}
    public attributes: Attributes = {}
    public styles?: string
    private self?: HTMLElement
    private parent?: HTMLElement
    private shadowDom?: ShadowRoot
    public _isWebComponent: boolean = false

    rerender() {
        this.init()
    }

    init(parent?: HTMLElement) {
        const components = this.render()

        if (parent) {
            this.parent = parent
        }

        if (this.parent && this.self) {
            if (this.shadowDom) {
                this.shadowDom.innerHTML = ''
            } else if (this.self.parentElement) {
                this.self.parentElement.removeChild(this.self)

                this.self = undefined
            }
        }

        if (Array.isArray(components)) {
            if (this._isWebComponent) {
                this.self = this.parent
            } else {
                this.self = document.createElement('div')
                this.parent?.appendChild(this.self)
            }

            if (!this.shadowDom) {
                this.shadowDom = this.self?.attachShadow({mode: 'open'})
            }

            for (const key in this.attributes) {
                this.self?.setAttribute(key, this.attributes[key])
            }

            components.forEach((component) => {
                component.init(this.shadowDom as unknown as HTMLElement)
            })

            if (this.styles) {
                const styles = document.createElement('style')
                styles.innerHTML = this.styles

                this.shadowDom?.appendChild(styles)
            }
        } else if (components instanceof Component) {
            components.init(this.parent)
            this.self = components.self
            if (this.self && this.styles) {
                this.self.style.cssText = this.styles
            }
            if (this.parent && this.self) {
                this.parent.appendChild(this.self)
            }
        } else {
            this.self = components
            if (this.self && this.styles) {
                this.self.style.cssText = this.styles
            }
            if (this.parent) {
                this.parent.appendChild(this.self)
            }
        }
    }

    render(): Component[] | Component | HTMLElement {
        return []
    }
}

export function createElement(component: { new (): Component }, name: string) {
    class CustomElement extends HTMLElement {
        public root: Component

        constructor() {
            super()
            this.root = new component()
            this.root._isWebComponent = true
            this.root.init(this)
        }
    }

    customElements.define(name, CustomElement)
}

