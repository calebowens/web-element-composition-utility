import Component from '../component'

export default class FieldSet extends Component {
    public element = document.createElement('fieldset')

    constructor(public children: string | Component[]) {
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