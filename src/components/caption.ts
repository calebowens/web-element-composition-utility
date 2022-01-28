import Component from '../component'

export default class Caption extends Component {
    public element = document.createElement('cap')

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