import Component from '../component'
import { observable } from '../observable'

export default class Button extends Component {
    public element = document.createElement('button')

    constructor(public children?: string | Component[]) {
        super()
    }

    render() {
        if (Array.isArray(this.children)) {
            this.children.forEach((component) => {
                component.init(this.element)
            })
        } else {
            this.element.innerText = this.children
        }

        return this.element
    }
}