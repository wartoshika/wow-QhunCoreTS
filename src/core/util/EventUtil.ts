import { Promise } from "../async/Promise";
import { Injector } from "../di/Injector";
import { Timer } from "../async/Timer";

/**
 * simplyfies wow events
 */
export class EventUtil {

    /**
     * listen to the given event and the promise will resolve when this event occurs.
     * @param event the event to listen on
     * @param timeout an optional timeout in milliseconds to wait before the promise will be rejected. defaults to -1 (no timeout)
     */
    public static getPromise<E extends keyof WowTypedEvents>(event: E, timeout: number = -1): Promise<WowTypedEvents[E]> {

        // create an event frame
        const eventFrame = CreateFrame("Frame");

        return new Promise<WowTypedEvents[E]>((resolve, reject) => {

            // register the given event
            eventFrame.RegisterEvent(event);

            // handle event
            eventFrame.SetScript("OnEvent", (frame, eventName, ...payload) => {

                // resolve the promise
                resolve(payload);
            });

            // when a timeout is given
            if (timeout > 0) {

                // get timer class via injector
                const timer = Injector.getInstance().instantiateClass(Timer);

                // reject when timeout reached
                timer.timeout(() => {

                    // remove the created event frame
                    eventFrame.UnregisterAllEvents();

                    // reject the promise
                    reject(`Timeout of ${timeout}ms exceeded`);
                }, timeout);
            }
        }).done(payload => {

            // remove the created event frame
            eventFrame.UnregisterAllEvents();

            return payload;
        });
    }
}
