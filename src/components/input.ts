import Component from '../component'
import { observable } from '../observable'

export default class Input extends Component {
    @observable()
    public value: string

    public element = document.createElement('input')

    constructor() {
        super()
        
        this.element.addEventListener('change', (event) => {
            this.value = (event.target as HTMLInputElement).value ?? ''
        })

        this.observables.value.onUpdate((value) => {
            this.element.value = value
        })
    }

    render() {
        return this.element
    }
}