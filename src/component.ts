interface Attributes {
    [name: string]: string
}

export type ComponentTree = (SuperComponent | ComponentTree)[]

export class SuperComponent {
    // public attributes: Attributes = {}
    protected _self: Element = document.createElement('div')
    private initialised: boolean = false

    constructor() {
    }

    rerender() {
        this._render()
    }

    _init(parent: Element | ShadowRoot) {
        this._render()

        if (this.initialised) {
            this._self.parentElement?.removeChild(this._self)
        } else {
            this.initialised = true
        }

        parent.appendChild(this._self)
    }

    /**
     * _render MUST mount children to the self component
     * */
    protected _render() {
    }
}


export class Component extends SuperComponent {
    protected _render() {
        const componentTree = this.render()

        this._self.innerHTML = ''

        this._renderComponents(componentTree, this._self)
    }

    protected _renderComponents(components: ComponentTree, parent: Element | ShadowRoot) {
        components.filter(a => a).forEach((component) => {
            if (Array.isArray(component)) {
                // Component is really a ComponentTree
                const newParent = document.createElement('div')

                this._self.appendChild(newParent)

                this._renderComponents(component, newParent)


            } else {
                // Init component which will also rerender it
                // TODO: Consider if this will cause future issues if init() is overridden
                component._init(parent)
            }
        })
    }

    render(): ComponentTree {
        return []
    }
}


export class HTMLComponent extends Component {
    public element!: Element

    constructor(private inner?: string | ComponentTree) {
        super()
    }

    protected _setElement(element: Element) {
        this.element = element
        this._self = this.element
    }

    protected _render() {
        if (this.inner) {
            if (typeof this.inner === "string") {
                if (this._self instanceof HTMLElement) {
                    this._self.innerText = this.inner
                }
            } else {
                this._self.innerHTML = ''

                this._renderComponents(this.inner, this._self)
            }
        }
    }
}


export function registerComponent(component: { new (): Component }, name: string) {
    class CustomElement extends HTMLElement {
        public root: Component

        constructor() {
            super()
            this.root = new component()
            this.root._init(this)
        }
    }

    customElements.define(name, CustomElement)
}
