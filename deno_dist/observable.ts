/**
 * This class is another aid in buliding reactive compoennts, by invoking `onUpdate` listeners when the `value` property is set.
 */
export class Observable<T> {
    callbacks: ((value: T) => void)[] = []

    /**
     * @arg _value This is the default value of the Observable.
     */
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

    /**
     * This method sets the value and calls the listeners syncronously.
     */
    setValueSync(value: T) {
        this._value = value

        this.callbacks.forEach((callback) => callback(value))
    }

    /**
     * This registers a listener for when the the `value` property is set
     */
    onUpdate(cb: (value: T) => void) {
        this.callbacks.push(cb)
    }

    /**
     * This removes a listener.
     */
    removeListener(cb: (value: T) => void) {
        this.callbacks.filter((value) => value !== cb)
    }
}
