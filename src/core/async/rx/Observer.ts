/**
 * An internal observer class that contains no operation callback contents when
 * no parameters are given.
 */
export class Observer<T> {

    /**
     * emits the next data to the event stream and all subscribers will receive it
     * @param this this observer
     * @param value the value to emit
     */
    public next(this: Observer<T>, value: T): void {
        // noop
    }

    /**
     * throws an error into the event stream and cancels the stream after emitting the error
     * @param this this observer
     * @param err the error to throw
     */
    public error(this: Observer<T>, err: string | Error): void {
        throw err;
    }

    /**
     * marks the event stream as beeing complete so all subscriptions will be canceled and
     * a complete event will be passed to the event stream
     * @param this this observer
     */
    public complete(this: Observer<T>): void {
        // noop
    }
}
