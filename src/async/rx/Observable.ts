import { Unsubscribable } from "./Unsubscribable";
import { Subscription } from "./Subscription";
import { Observer } from "./Observer";
import { Subscriber } from "./Subscriber";

/**
 * the observable is an event stream over a certain amount of time. An observed data stream
 * can emit a new data change to the subscribing members. Every observable can be canceled using
 * the unsubscribe function.
 */
export class Observable<T = any> {

    constructor(
        private internalSubscribe: (this: Observable<T>, subscriber: Subscriber<T>) => Unsubscribable
    ) { }

    /**
     * subscribes to the event stream and receive updates when the data source has newer results.
     * @param observer the observer class or the data to get from the event stream
     * @param error the error callback function
     * @param complete the complete callback function
     */
    public subscribe(
        observer: Observer<T> | ((this: Observable<T>, data: T) => void),
        error?: (error: string | Error) => void,
        complete?: () => void
    ): Subscription {

        const subscriber = new Subscriber(observer, error, complete);
        this.internalSubscribe(subscriber);
        return subscriber;
    }
}
