import { Injectable } from "../decorators/Injectable";
import { Events } from "./Events";
import { TableUtil } from "../util/TableUtil";

/**
 * an event emitter that can broadcast events to subscribers.
 */
@Injectable()
export class EventEmitter<E extends Events> {

    /**
     * all current listeners
     */
    private listeners: {
        [P in keyof E]?: ((payload: E[P]) => void)[]
    } = {};

    /**
     * listen to a given event
     * @param event the event to listen on
     * @param callback the function that should be executed when the event happens
     */
    public on<T extends keyof E>(event: T, callback: (payload: E[T]) => void): void {

        // null listener check
        if ((typeof this.listeners[event]) as string !== "table") {
            this.listeners[event] = [];
        }

        // add the callback function
        this.listeners[event].push(callback);
    }

    /**
     * removes the given callback function from the execution list
     * @param event the event name to remove
     * @param callback the callback function used in the register process
     */
    public off<T extends keyof E>(event: T, callback: (payload: E[T]) => void): void {

        // null check
        if (TableUtil.isTable(this.listeners[event])) {

            // search for that callback and remove it
            this.listeners[event] = this.listeners[event].filter(listener => {

                return listener !== callback;
            });
        }
    }

    /**
     * emits the given event
     * @param event the event name to emit
     * @param payload the payload to give to all listeners
     */
    public emit<T extends keyof E>(event: T, payload: E[T]): void {

        // check if there are listeners on this event
        if (TableUtil.isTable(this.listeners[event])) {

            // call all listeners
            this.listeners[event].forEach(listener => {
                listener(payload);
            });
        }
    }

}
