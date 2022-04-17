export class Emitter<T> {
    callbacks: ((value: T) => void)[] = []

    emit(value: T) {
        this.callbacks.forEach((callback) => new Promise<void>((resolve => {
            callback(value)
            resolve()
        })))
    }

    onEmit(cb: (value: T) => void) {
        this.callbacks.push(cb)
    }

    removeListener(cb: (value: T) => void) {
        this.callbacks.filter((value) => value !== cb)
    }
}
