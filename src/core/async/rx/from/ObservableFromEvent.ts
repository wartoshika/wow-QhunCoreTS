import { Observable } from "../Observable";
import { Subscription } from "../Subscription";

/**
 * creates an observable from a wow event
 * @param event the wow event to listen on
 */
export function observableFromEvent<T extends WowEvent>(event: T): Observable<object> {
    return new Observable<object>(subscriber => {

        let eventFrame = CreateFrame("Frame");
        eventFrame.RegisterEvent(event);
        eventFrame.SetScript("OnEvent", (frame, event, ...data) => {
            subscriber.next(data);
        });
        return new Subscription(() => {
            eventFrame.UnregisterAllEvents();
            eventFrame = undefined;
        });
    });
}