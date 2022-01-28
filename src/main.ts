import Component from "./component"
import Button from "./components/button"
import Input from "./components/input"

class Root extends Component {
    private button = new Button('reset')
    private textInput = new Input()
    
    private formToggler = new Button('Toggle')
    private showForm = true

    constructor() {
        super()
        this.init(document.getElementById('app'))

        this.button.element.addEventListener('click', () => {
            this.textInput.value = ''
        })

        this.formToggler.element.addEventListener('click', () => {
            this.showForm = !this.showForm
            this.rerender()
        })
    }

    render() {
        if (this.showForm) {
            return [
                this.button,
                this.textInput,
                this.formToggler
            ]
        } else {
            return [
                this.formToggler
            ]
        }
    }
}

new Root()