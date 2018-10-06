import { Injectable } from "../decorators/Injectable";
import { RandomUtil } from "../../util/RandomUtil";

/**
 * a timer class that allowes to run callback functions after a given amount of time
 */
@Injectable()
export class Timer {

    /**
     * the timer resolution frame
     */
    private eventFrame: WowFrame;

    /**
     * all currently registered listeners
     */
    private listeners: {
        [uuid: string]: {
            time: number,
            callback: () => void,
            counter: number
        }
    } = {};

    constructor() {

        // create the timer frame
        this.eventFrame = CreateFrame("Frame");

        // enable timer event
        this.eventFrame.SetScript("OnUpdate", (_, timePassed) => {
            this.onUpdate(timePassed);
        });
    }

    /**
     * executes the given callback function whenever the given amount of time is reached
     * @param callback the function to execute
     * @param timeInMilliseconds the time to wait
     * @return an identifier to calcel the interval
     */
    public interval(callback: () => void, timeInMilliseconds: number): string {

        // generate an identifier
        const uuid = RandomUtil.uuid();

        // register the callback
        this.listeners[uuid] = {
            time: timeInMilliseconds,
            callback: callback,
            counter: 0
        };

        return uuid;
    }

    /**
     * executes the given callback function after the given amount of time
     * @param callback the function to execute
     * @param timeInMilliseconds the time to wait
     * @return an identifier to cancel the timeout
     */
    public timeout(callback: () => void, timeInMilliseconds: number): string {

        // generate an identifier
        const uuid = RandomUtil.uuid();

        // register the callback
        this.listeners[uuid] = {
            time: timeInMilliseconds,
            callback: () => {

                // remove the timeout request
                this.remove.bind(this)(uuid);

                // execute the callback
                callback();
            },
            counter: 0
        };

        return uuid;
    }

    /**
     * updates the timer based on the event frame update
     * @param timePassed the time passed in milliseconds
     */
    private onUpdate(timePassed: number): void {

        // check for updates
        Object.values(this.listeners).forEach(listener => {

            // update listener counter
            listener.counter += timePassed * 1000;

            // check if the timer counter is reached
            if (listener.counter >= listener.time) {
                listener.callback();

                // reset counter
                listener.counter = 0;
            }
        });
    }

    /**
     * removes the timeout/interval request by its identifier
     * @param identifier the identifier to remove
     */
    private remove(identifier: string): void {

        delete this.listeners[identifier];
    }
}