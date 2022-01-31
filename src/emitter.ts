export class Emitter<T> {
    callbacks: ((value: T) => void)[] = []

    emit(value: T) {
        this.callbacks.forEach(async (callback) => {
            callback(value)
        })
    }

    onEmit(cb: (value: T) => void) {
        this.callbacks.push(cb)
    }
}