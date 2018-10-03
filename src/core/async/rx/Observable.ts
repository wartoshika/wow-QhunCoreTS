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

    /**
     * filters the data stream for objects that are allowed to pass.
     * @param predicate the filter function
     */
    public filter(predicate: (data: T) => boolean): Observable<T> {

        const inObservable = this;
        const outObservable = new Observable<T>(outObserver => {

            const inObserver: Observer<T> = {
                next: data => {
                    let passed: boolean = false;
                    try {
                        passed = predicate(data);
                    } catch (e) {
                        outObserver.error(e);
                        return;
                    }
                    if (passed) {
                        outObserver.next(data);
                    }
                },
                error: err => outObserver.error(err),
                complete: () => outObserver.complete()
            };
            return inObservable.subscribe(inObserver);
        });
        return outObservable;
    }

    /**
     * maps or transforms the data stream into a new output
     * @param transform the transform function
     */
    public map<D>(transform: (data: T) => D): Observable<D> {

        const inObservable = this;
        const outObservable = new Observable<D>(outObserver => {
            const inObserver: Observer<T> = {
                next: (x) => {
                    let transformValue: D;
                    try {
                        transformValue = transform(x);
                    } catch (e) {
                        outObserver.error(e);
                        return;
                    }
                    outObserver.next(transformValue);
                },
                error: (e) => {
                    outObserver.error(e);
                },
                complete: () => {
                    outObserver.complete();
                }
            };
            return inObservable.subscribe(inObserver);
        });
        return outObservable;

    }
}
