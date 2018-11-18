import { Injectable } from "../decorators/Injectable";
import { RandomUtil } from "../util/RandomUtil";

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
            callback: (timePased?: number, ...args: any[]) => void,
            counter: number,
            additionalData?: any
        }
    } = {};

    /**
     * a flag if the timer is running
     */
    private isRunning: boolean = false;

    constructor() {

        // create the timer frame
        this.eventFrame = CreateFrame("Frame");
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

        this.checkStartStopTimer();

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

        this.checkStartStopTimer();

        return uuid;
    }

    /**
     * calls the given callback every time the interval frame updates. after the total amount of time, the callback will not be called anymore
     * @param callback the callback function
     * @param resolution the minimal waiting time between callback calls (must be greater than 0)
     * @param totalTimeInMilliseconds the total run time
     * @return an identifier to cancel the function
     */
    public every(callback: (timePassedInMilliseconds: number) => void, resolution: number, totalTimeInMilliseconds: number): string {

        // generate an identifier
        const uuid = RandomUtil.uuid();

        // register the callback
        this.listeners[uuid] = {
            time: resolution,
            callback: (_, timePased: number) => {

                if (this.listeners[uuid]) {

                    // add current time passed to data stack
                    this.listeners[uuid].additionalData += timePased;

                    // call the callback
                    if (this.listeners[uuid].additionalData < totalTimeInMilliseconds) {
                        callback(this.listeners[uuid].additionalData);
                    }
                }
            },
            counter: 0,
            additionalData: 0
        };

        // remove this function after the total time
        this.timeout(() => {

            // remove the every listener
            this.remove.bind(this)(uuid);

            // last callback with will total time
            callback(totalTimeInMilliseconds);

        }, totalTimeInMilliseconds);

        this.checkStartStopTimer();

        return uuid;
    }

    /**
     * removes the timeout/interval request by its identifier
     * @param identifier the identifier to remove
     */
    public remove(identifier: string): void {

        delete this.listeners[identifier];
        this.checkStartStopTimer();
    }

    /**
     * updates the timer based on the event frame update
     * @param timePassed the time passed in milliseconds
     */
    private onUpdate(timePassed: number): void {

        // convert to ms
        timePassed *= 1000;

        // check for updates
        Object.values(this.listeners).forEach(listener => {

            // update listener counter
            listener.counter += timePassed;

            // check if the timer counter is reached
            if (listener.counter >= listener.time) {
                listener.callback(listener.counter);

                // reset counter
                listener.counter = 0;
            }
        });
    }

    /**
     * observes the listener stack and starts/stops the timer when
     * the stack is full/empty
     */
    private checkStartStopTimer(): void {

        const stackSize = Object.keys(this.listeners).length;
        if (stackSize === 0) {
            this.stopTimer();
        } else if (stackSize > 0 && !this.isRunning) {
            this.startTimer();
        }
    }

    /**
     * starts the timer
     */
    private startTimer(): void {

        // enable timer event
        this.eventFrame.SetScript("OnUpdate", (_, timePassed) => {
            this.onUpdate(timePassed);
        });

        // set run flag
        this.isRunning = true;
    }

    /**
     * stops the timer
     */
    private stopTimer(): void {

        // remove timer event
        this.eventFrame.SetScript("OnUpdate", null);

        // set run flag
        this.isRunning = false;
    }
}
