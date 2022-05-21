/**
 * Defines the a tree of components for the class `Component`'s render function.
 */
export type ComponentTree = (SuperComponent | ComponentTree)[]

/**
 * This is the base class for components in wecu. `SuperComponent` can be used if you want to implement specialised behaviour that can't be achieved by extending `Component`.
 */
export class SuperComponent {
    /**
     * This holds the components root element, for a `HTMLComponent`, this would be the Button or paragraph tag, or for a `Component`, this is the containing div.
     *
     * The `_render` method should mount any child elements to this element, so it *should* be safe to set this before its rendered.
     */
    element: Element = document.createElement('div')

    _initialised: boolean = false

    /**
     * This method should be called when the content inside the component has been updated. The most juniour component that needs to be updated should be called to help performance.
     *
     * For example, if you have the choice of rerendering a parent or its child, if the visual update only concerns the child, then calling rerender on the child is prefered.
     */
    rerender() {
        this._render()
    }

    /**
     * This method is used to initalise the component. It calls the `_render` method and mounts `this.element` to the `parent` element passed to it.
     */
    _init(parent: Element | ShadowRoot) {
        this._render()

        if (this._initialised) {
            this.element.parentElement?.removeChild(this.element)
        } else {
            this._initialised = true
        }

        parent.appendChild(this.element)
    }

    /**
     * _render mounts children to the element
     * */
    _render() {
    }
}

function renderComponentTree(components: ComponentTree, parent: Element | ShadowRoot) {
    components.filter(a => a).forEach((component) => {
        if (Array.isArray(component)) {
            // Component is really a ComponentTree
            const newParent = document.createElement('div')

            parent.appendChild(newParent)

            renderComponentTree(component, newParent)


        } else {
            // Init component which will also rerender it
            // TODO: Consider if this will cause future issues if init() is overridden
            component._init(parent)
        }
    })
}

/**
 * The `Component` is a subclass of `SuperComponent` and your custom components will be made by extending this class and implementing a `render` method.
 */
export class Component extends SuperComponent {
    _render() {
        const componentTree = this.render()

        this.element.innerHTML = ''

        renderComponentTree(componentTree, this.element)
    }

    /**
     * This method is where which you should override to compose together child components to build your own components.
     *
     * @returns Returns an array of `SuperComponents` or arrays of `SuperComponents` that should be rendered.
     */
    render(): ComponentTree {
        return []
    }
}

/**
 * The `ShadowComponent` class is a specialization of `Component` which makes use of shadow doms to create encapsulation in the DOM.
 *
 * I recommend reading more about the quirks of shadow doms before using. https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 */
export class ShadowComponent extends Component {
    shadowRoot: ShadowRoot

    constructor() {
        super()

        this.shadowRoot = this.element.attachShadow({ mode: 'open' })
    }

    _render() {
        const componentTree = this.render()

        this.shadowRoot.innerHTML = ''

        renderComponentTree(componentTree, this.shadowRoot)
    }
}

/**
 * This class generally shouldn't need to be extended as we should have all HTML components already implemented as specialisations of this class.
 */
export class HTMLComponent extends SuperComponent {
    /**
     * @arg children The constructor takes in an argument that can either be a string, ComponentTree, or undefined
     * If a string is provided, it will be set as the innerText of `this.element`.
     * If a ComponentTree is provided, it will be rendered and mounted to `this.element`.
     * If it is left undefined, nothing will be mounted to `this.element`
     */
    constructor(public children?: string | ComponentTree) {
        super()
    }

    _setElement(element: Element) {
        this.element = element
    }

    _render() {
        if (this.children) {
            if (typeof this.children === "string") {
                if (this.element instanceof HTMLElement) {
                    this.element.innerText = this.children
                }
            } else {
                this.element.innerHTML = ''

                renderComponentTree(this.children, this.element)
            }
        } else {
            this.element.innerHTML = ''
        }
    }
}

/**
 * WebComponent is a specialization of Component which aids in the creation of Web Components
 */
export class WebComponent extends Component {
    /**
     * This hook allows you to get a reference to the parent element when it is mounted for the first time to the dom.
     * This hook is only called when its registered as a web component.
     *
     * @param parent
     */
    onMount(parent: HTMLElement) {}
}

/**
 * This function registers a Component as a Web Component. See more about Web Components https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 * @arg component This is the component you want to be registered as a Web Component.
 * @arg name This will be the tag name for your component to be registered under.
 */
export function registerComponent(component: { new (): Component | ShadowComponent | WebComponent }, name: string) {
    class CustomElement extends HTMLElement {
        public root: Component | ShadowComponent

        constructor() {
            super()
            this.root = new component()
            this.root._init(this)

            if (this.root instanceof WebComponent) {
                this.root.onMount(this)
            }
        }
    }

    customElements.define(name, CustomElement)
}

/**
 * This function takes in a `Component` class and creates an instance of it and mounts it to the parent element that gets queried by the query string.
 *
 * @arg component This is the component that you want to be mounted.
 * @arg query This is the query string that will be used in a query selector.
 *
 * @returns an instance of the Component passed to the function.
 */
export function mountComponent<T extends Component>(component: { new (): T }, query: string): T {
    const parent = document.querySelector(query)

    if (!parent) {
        throw "Parent not found"
    }

    const instance = new component()

    instance._init(parent)

    return instance
}
