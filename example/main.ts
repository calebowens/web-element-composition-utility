import {
    HTMLComponent,
    Component,
    registerComponent,
    Button,
    H2,
    P,
    Input,
    TextArea,
    Label,
} from '../src'


class PostCreator extends Component {
    private submit = new Button('submit')
    private title = new Input()
    private body = new TextArea()

    constructor(appender: (post) => void) {
        super()

        this.submit.element.addEventListener('click', () => {
            const post = new Post(
                (this.title.element as HTMLInputElement).value,
                (this.body.element as HTMLTextAreaElement).value
            );

            (this.title.element as HTMLInputElement).value = '';
            (this.body.element as HTMLTextAreaElement).value = '';


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


class Post extends Component {
    private title: HTMLComponent
    private body: HTMLComponent

    constructor(title: string, body: string) {
        super()

        this.title = new H2(title)
        this.body = new P(body)
    }

    render() {
        return [
            this.title,
            this.body
        ]
    }
}

interface IList<T> {
    append(T): void
}

class PostList extends Component implements IList<Post> {
    private postCreator: PostCreator
    private posts: Post[] = []

    constructor(postCreator: new (appender: (post: Post) => void) => PostCreator) {
        super()

        this.postCreator = new postCreator(this.append.bind(this))
    }

    render() {
        return [
            this.postCreator,
            this.posts
        ]
    }

    append(post: Post) {
        this.posts.push(post)

        this.rerender()
    }
}

class Root extends Component {
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
