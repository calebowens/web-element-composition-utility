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
    Observable,
} from '../src'

import { css, unsafeCSS } from 'lit'


class PostCreator extends ShadowComponent {
    private submit = new Button('submit')
    private title = new Input()
    private body = new TextArea()

    constructor(appender: (post) => void) {
        super()

        this.submit.element.addEventListener('click', () => {
            const post = new Post(
                this.title.element.value,
                this.body.element.value
            );

            this.title.element.value = ''
            this.body.element.value = ''


            appender(post)
        })
    }

    render() {
        return [
            [
                new Label('title'),
                this.title,
            ],
            [
                new Label('body'),
                this.body
            ],
            this.submit
        ]
    }
}


class Post extends ShadowComponent {
    private title: HTMLComponent
    private body: HTMLComponent
    public color = new Observable('black')

    constructor(title: string, body: string) {
        super()

        this.title = new H2(title)
        this.body = new P(body)

        this.color.onUpdate(() => {
            this.rerender()
            console.log('rerendered')
        })
    }

    render() {
        const styles = `
:host {
    border: solid ${unsafeCSS(this.color.value)} 2px;
}
`
        return [
            this.title,
            this.body,
            new Style(styles)
        ]
    }
}

interface IList<T> {
    append(T): void
}

class PostList extends Component implements IList<Post> {
    private postCreator: PostCreator
    private posts: Post[] = []

    private color = new Input()

    constructor(postCreator: new (appender: (post: Post) => void) => PostCreator) {
        super()

        this.postCreator = new postCreator(this.append.bind(this))

        this.color.element.addEventListener('input', () => {
            this.posts.forEach((post) => {
                post.color.value = this.color.element.value
            })
        })
    }

    render() {
        return [
            this.postCreator,
            this.posts,
            this.color
        ]
    }

    append(post: Post) {
        this.posts.push(post)

        this.rerender()
    }
}

class Root extends ShadowComponent {
    private postList = new PostList(
        PostCreator
    )

    render() {
        return [
            this.postList
        ]
    }
}

registerComponent(Root, 'x-root')
