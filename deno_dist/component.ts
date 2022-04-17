interface Attributes {
    [name: string]: string
}

export type ComponentTree = (SuperComponent | ComponentTree)[]

export class SuperComponent {
    // public attributes: Attributes = {}
    public element: Element = document.createElement('div')
    private initialised: boolean = false

    constructor() {
    }

    rerender() {
        this._render()
    }

    _init(parent: Element | ShadowRoot) {
        this._render()

        if (this.initialised) {
            this.element.parentElement?.removeChild(this.element)
        } else {
            this.initialised = true
        }

        parent.appendChild(this.element)
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

        this.element.innerHTML = ''

        this._renderComponents(componentTree, this.element)
    }

    protected _renderComponents(components: ComponentTree, parent: Element | ShadowRoot) {
        components.filter(a => a).forEach((component) => {
            if (Array.isArray(component)) {
                // Component is really a ComponentTree
                const newParent = document.createElement('div')

                this.element.appendChild(newParent)

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
    constructor(public children: string | ComponentTree | undefined) {
        super()
    }

    protected _setElement(element: Element) {
        this.element = element
    }

    protected _render() {
        if (this.children) {
            if (typeof this.children === "string") {
                if (this.element instanceof HTMLElement) {
                    this.element.innerText = this.children
                }
            } else {
                this.element.innerHTML = ''

                this._renderComponents(this.children, this.element)
            }
        } else {
            this.element.innerHTML = ''
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

export function mountComponent<T extends Component>(component: { new (): T }, query: string): T {
    const parent = document.querySelector(query)

    if (!parent) {
        throw "Parent not found"
    }

    const instance = new component()

    instance._init(parent)

    return instance
}
