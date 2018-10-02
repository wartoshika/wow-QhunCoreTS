import { Unsubscribable } from "./Unsubscribable";

/**
 * this class holds a subscription that can be unsubscribed
 */
export class Subscription implements Unsubscribable {

    /**
     * @param unsubscribe the function that will be executed when the subscription is canceled
     */
    constructor(
        protected internalUnsubscribe: () => void = () => { }
    ) { }

    public unsubscribe() {

        if (this.internalUnsubscribe) {
            this.internalUnsubscribe();
        }
    }
}
