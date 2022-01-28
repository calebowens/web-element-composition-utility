import Component from "./component"

export class Observable<T> {
    callbacks: ((value: T) => void)[] = []

    constructor(private _value: T) {
    }

    set value(value: T) {
        this._value = value

        this.callbacks.forEach(async (callback) => {
            callback(value)
        })
    }

    get value() {
        return this._value
    }

    onUpdate(cb) {
        this.callbacks.push(cb)
    }
}

export function observable<T>() {
    return function (target: Component, memberName: string) {
        const observable = new Observable<T>(target[memberName])

        Object.defineProperty(target, memberName, { get: () => observable.value, set: (newValue: T) => observable.value = newValue })
        console.log(target)

        target.observables ||= {}
        Object.defineProperty(target.observables, memberName, { get: () => observable })
    }
}