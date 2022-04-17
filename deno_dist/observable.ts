export class Observable<T> {
    callbacks: ((value: T) => void)[] = []

    constructor(private _value: T) {
    }

    set value(value: T) {
        this._value = value

        this.callbacks.forEach((callback) => new Promise<void>((resolve => {
            callback(value)
            resolve()
        })))
    }

    get value() {
        return this._value
    }

    onUpdate(cb: (value: T) => void) {
        this.callbacks.push(cb)
    }

    removeListener(cb: (value: T) => void) {
        this.callbacks.filter((value) => value !== cb)
    }
}
