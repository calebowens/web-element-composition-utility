import { Observable } from './observable'

interface Observables {
    [name: string]: Observable<any>
}

export default class Component {
    public observables: Observables
    private self?: Element
    private parent?: Element

    rerender() {
        this.init(this.parent)
    }

    init(parent: Element) {
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
        } else {
            this.self = components
        }

        this.parent.appendChild(this.self)
    }

    render(): Component[] | Element {
        return []
    }
}