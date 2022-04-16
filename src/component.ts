interface Attributes {
    [name: string]: string
}

export type ComponentTree = (SuperComponent | ComponentTree)[]

export class SuperComponent {
    // public attributes: Attributes = {}
    protected self: Element = document.createElement('div')
    private initialised: boolean = false

    constructor() {
    }

    rerender() {
        this._render()
    }

    init(parent: Element) {
        this._render()

        if (this.initialised) {
            this.self.parentElement?.removeChild(this.self)
        } else {
            this.initialised = true
        }

        parent.appendChild(this.self)
    }

    /**
     * _render MUST mount children to the self component
     * */
    protected _render() {
    }
}

export class HTMLComponent extends SuperComponent {
    public element!: Element

    constructor(private innerText: string) {
        super()

    }

    protected setElement(element: Element) {
         this.element = element

        this.self = this.element


        if (this.self instanceof HTMLElement) {
            this.self.innerText = this.innerText
        }
    }
}

export class Component extends SuperComponent {
    protected _render() {
        const componentTree = this.render()

        this.self.innerHTML = ''

        this._renderComponents(componentTree, this.self)

        return this.self
    }

    private _renderComponents(components: ComponentTree, parent: Element) {
        components.forEach((component) => {
            if (Array.isArray(component)) {
                // Component is really a ComponentTree
                const newParent = document.createElement('div')

                this.self.appendChild(newParent)

                this._renderComponents(component, newParent)


            } else {
                // Init component which will also rerender it
                // TODO: Consider if this will cause future issues if init() is overridden
                component.init(parent)
            }
        })
    }

    render(): ComponentTree {
        return []
    }
}

export class ShadowComponent extends Component {

}

export function registerComponent(component: { new (): Component }, name: string) {
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
