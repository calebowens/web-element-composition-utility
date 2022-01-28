import Component from '../component'

export default class TR extends Component {
    public element = document.createElement('tr')

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