/**
 * An Emitter is based around the idea of an event listener allowing you to emit values to listeners.
 *
 * The WECU `Emitter` can be used without making use of WECU Components.
 */
export class Emitter<T> {
    callbacks: ((value: T) => void)[] = []

    /**
     * The emit method invokes the listners, passing them the value parameter as their argument.
     *
     * @arg value The value to be passed to the listeners.
     */
    emit(value: T) {
        this.callbacks.forEach((callback) => new Promise<void>((resolve => {
            callback(value)
            resolve()
        })))
    }

    /**
     * This method syncronously invokes all of the listeners.
     */
    emitSync(value: T) {
        this.callbacks.forEach((callback) => callback(value))
    }

    /**
     * This method is used to register listeners which will be invoked when the `emit` method is called.
     */
    onEmit(cb: (value: T) => void) {
        this.callbacks.push(cb)
    }

    /**
     * This method will remove a listener from the list of callbacks
     */
    removeListener(cb: (value: T) => void) {
        this.callbacks.filter((value) => value !== cb)
    }
}
