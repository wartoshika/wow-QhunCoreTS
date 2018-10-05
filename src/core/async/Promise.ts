import { AddonOption } from "../decorators/AddonOption";
import { Logger } from "../debug/Logger";

interface PromiseLike<T> {

    done<R = T>(onFulfilled: (value: T) => void | R | PromiseLike<R>, onRejected?: (reason: any) => void): Promise<R>;
}

interface PromiseHandler<T> {

    onFulfilled: <R = T>(value: T) => void | R | PromiseLike<R>,
    onRejected: (reason: any) => void,

}

enum PromiseState {

    PENDING = 0,
    FULFILLED = 1,
    REJECTED = 2
}

/**
 * an async callback like class that creates a promise statement wich should be fulfilled or rejected if any problems occured.
 */
export class Promise<T> implements PromiseLike<T> {

    @AddonOption("debuggerInstance")
    private logger: Logger;

    /**
     * the final promise value
     */
    private value: T;

    /**
     * the current state of the promise
     */
    private state: PromiseState = PromiseState.PENDING;

    /**
     * all registered observers
     */
    private observers: PromiseHandler<T>[] = [];

    /**
     * @param resolver your callback function. when your promise is fulfilled, you will receive the requested data. you can catch the reject case in the second callback function.
     */
    constructor(
        resolver: (onFulfilled: (value: T | PromiseLike<T>) => void, onRejected: (reason: any) => void) => void | PromiseLike<T>
    ) {

        // resolve the promise internaly via the generic resolver
        this.internalResolve(resolver, this.resolve, this.reject);
    }

    /**
     * define what to do with the requested data. if the promise has been fulfilled, you can get the data in the onFulfilled callback.
     * @param onFulfilled the fulfilled callback function. you can even return a new value/type/promise to chain your results
     * @param onRejected the callback function that informs you about errors why your promise could not be fulfilled.
     */
    public done<R = T>(onFulfilled: (value: T) => void | R | PromiseLike<R>, onRejected?: (reason: any) => void): Promise<R> {

        return new Promise<R>((resolve, reject) => {

            return this.doneInternal((_, value?: T) => {
                if (typeof onFulfilled === "function") {
                    try {
                        return resolve(onFulfilled(value) as any);
                    } catch (e) {
                        return reject(e);
                    }
                } else {
                    this.fulfill(value);
                }
            }, (_, reason?: any) => {

                if (typeof onRejected === "function") {
                    try {
                        return resolve(onRejected(reason) as any);
                    } catch (e) {
                        return reject(e);
                    }
                } else {
                    reject(reason);
                }
            });
        });
    }

    /**
     * informs you that this promise is done. this function does not care about promise chains!
     * @param onFulfilled the fulfilled callback
     * @param onRejected the rejected callback
     */
    private doneInternal(onFulfilled: (value: T) => void, onRejected?: (reason: any) => void): void {

        this.handlePromise({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
    }

    /**
     * fulfills the created promise and inform all registered listeners that the promise is fulfilled
     * @param value the final promise value
     */
    private fulfill(value: T): void {

        // set state and value
        this.value = value;
        this.state = PromiseState.FULFILLED;

        // inform observers
        this.observers.forEach(this.handlePromise.bind(this));

        // remove observers
        this.observers = [];
    }

    /**
     * reject the created promise and inform all registered listeners that the promise is rejected
     * @param reason the reason why the promise has been rejected
     */
    private reject(reason: any): void {

        // log the promise reject
        this.logger.warning(`A promise has been rejected. The reason was: ${reason}`);

        // set state and value
        this.value = reason;
        this.state = PromiseState.REJECTED;

        // inform observers
        this.observers.forEach(this.handlePromise.bind(this));

        // remove observers
        this.observers = [];
    }

    /**
     * handles the promise in its different states
     * @param handler the handler promise like value
     */
    private handlePromise(handler: PromiseHandler<T>): void {

        // handle pending state
        if (this.state === PromiseState.PENDING) {

            this.observers.push(handler);
        } else if (this.state === PromiseState.FULFILLED && typeof handler.onFulfilled === "function") {

            // fulfulled state
            handler.onFulfilled(this.value);
        } else if (this.state === PromiseState.REJECTED && typeof handler.onRejected === "function") {

            // rejected state
            handler.onRejected(this.value);
        }
    }

    /**
     * resolves the given value to the created promise. if the value is a chained promise, resolve this promise to.
     * @param value the current promise value
     */
    private resolve(value: T & PromiseLike<T>): void {
        try {

            // find a promise like value type
            if ((typeof value as string) === "table" && typeof value.done === "function") {

                // resolve this chained promise like value
                return this.internalResolve(value.done.bind(value), this.resolve, this.reject);
            }

            // value is the final promise value, fulfill the promise
            this.fulfill(value);
        } catch (e) {

            // reject the promise with the given error message
            this.reject(e);
        }
    }

    /**
     * resolves the promise internaly by calling the internal resolver and pushing the data back into the given resolver
     * @param resolver the given resolver function
     * @param onFulfilled the fulfilled callback function
     * @param onRejected the rejected callback function
     */
    private internalResolve(
        resolver: (onFulfilled: (value: T | PromiseLike<T>) => void, onRejected: (reason: any) => void) => void | PromiseLike<T>,
        onFulfilled: (value: T) => void,
        onRejected: (reason: any) => void
    ): void {

        let done: boolean = false;

        // build a generic handler to save some lines of code
        const handleResolver = <D>(callback: (data: D) => void, data: D) => {

            // dont fulfill the promise again if it has allready been resolved
            if (done) { return; }
            done = true;

            // call the bound callback context function with the received data
            callback.bind(this)(data);
        };
        try {

            // try to resolve the promise
            resolver(value => handleResolver(onFulfilled, value), reason => handleResolver(onRejected, reason));
        } catch (e) {

            // handle error case
            handleResolver(onRejected, e);
        }
    }
}