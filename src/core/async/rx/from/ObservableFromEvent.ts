import { Observable } from "../Observable";
import { Subscription } from "../Subscription";

/**
 * creates an observable from a wow event
 * @param event the wow event to listen on
 */
export function observableFromEvent<T extends keyof WowTypedEvents>(event: T): Observable<WowTypedEvents[T]> {
    return new Observable<WowTypedEvents[T]>(subscriber => {

        let eventFrame = CreateFrame("Frame");
        eventFrame.RegisterEvent(event);
        eventFrame.SetScript("OnEvent", (frame, notUsedEvent, ...data) => {
            subscriber.next(data as WowTypedEvents[T]);
        });
        return new Subscription(() => {
            eventFrame.UnregisterAllEvents();
            eventFrame = undefined;
        });
    });
}
