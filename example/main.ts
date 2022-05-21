import {
    HTMLComponent,
    Component,
    ShadowComponent,
    registerComponent,
    Button,
    H2,
    P,
    Input,
    TextArea,
    Label,
    Style,
    Observable, WebComponent,
} from '../src'

class Test extends WebComponent {
    onMount(parent: HTMLElement) {
        console.log(parent.getAttribute('name'))
    }
}

registerComponent(Test, 'x-root')