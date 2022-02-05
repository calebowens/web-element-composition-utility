import { S } from './index.ts'
import { Observable } from './observable.ts'

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
    private stylesCache?: string[]
    private self?: HTMLElement
    private parent?: HTMLElement
    private shadowDom?: ShadowRoot
    private nextNeighbor: Element | null = null
    public _isWebComponent: boolean = false

    rerender() {
        this.init()
    }

    init(parent?: HTMLElement, fragment?: DocumentFragment, styles: string[] = []){
        const components = this.render()

        // If there is a parent passed in, assign it to this.parent
        if (parent) {
            this.parent = parent
        }

        if (this.parent && this.self) {
            // If its a web component with a shadow dom, we only want to clear the shadow dom
            if (this.shadowDom && this._isWebComponent) {
                this.shadowDom.innerHTML = ''
            // Otherwise, if the parent is still intact or containing self, remove it from the parent
            } else if (this.parent.contains(this.self)) {
                this.nextNeighbor = this.self.nextElementSibling
                this.parent.removeChild(this.self)

                this.self = undefined
            }
        }

        // If is array of components
        if (Array.isArray(components)) {
            // If its a web component, we want self to = parent so we can just mount the shadow dom directly
            if (this._isWebComponent) {
                this.self = this.parent
            
            // Otherwise, we want to create a div to contain the elements
            } else {
                this.self = document.createElement('div')

                fragment?.insertBefore(this.self, this.nextNeighbor) ??
                    this.parent?.insertBefore(this.self, this.nextNeighbor)
            }

            // We want to create a new dom for each div, and once for the web component case
            if (!this.shadowDom || !this._isWebComponent) {
                this.shadowDom = this.self?.attachShadow({mode: 'open'})
            }

            // Through attributes interface, add attributes to root
            for (const key in this.attributes) {
                this.self?.setAttribute(key, this.attributes[key])
            }

            const _fragment = document.createDocumentFragment()

            // Render children
            components.forEach((component) => {
                component.init(this.shadowDom as unknown as HTMLElement, _fragment)
            })

            // Add a style component
            if (this.styles) {
                const styles = document.createElement('style')

                styles.innerHTML = this.styles

                _fragment.appendChild(styles)
            }

            this.shadowDom?.appendChild(_fragment)
        
        // For returning a single component
        } else if (components instanceof Component) {
            // Render it to the parent, we dont want to make a div to contain it so we're also going to have to
            //   set this.self to the component's self
            components.init(this.parent, undefined, [this.styles ?? '', ...(this.stylesCache) ? [...this.stylesCache, ...styles] : styles])
            this.stylesCache = [...(this.stylesCache) ? this.stylesCache : [], ...styles]
            this.self = components.self

            if (this.parent && this.self) {
                fragment?.insertBefore(this.self, this.nextNeighbor) ??
                    this.parent.insertBefore(this.self, this.nextNeighbor)
            }
        } else {
            this.self = components

            function trim(string: string) {
                return string.replace(/\s{2,}|\n/g, ' ').trim() + ' '
            } 

            if (this.self) {
                let completeStyles = ''

                if (this.styles) {
                    completeStyles += trim(this.styles)
                }

                for (const style of styles) {
                    completeStyles += trim(style)
                }

                this.self.style.cssText = completeStyles
            }

            if (this.parent) {
                fragment?.insertBefore(this.self, this.nextNeighbor) ??
                    this.parent.insertBefore(this.self, this.nextNeighbor)
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

