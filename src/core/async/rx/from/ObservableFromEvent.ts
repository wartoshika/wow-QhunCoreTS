import { Observable } from "../Observable";
import { Subscription } from "../Subscription";

/**
 * creates an observable from a wow event
 * @param event the wow event to listen on
 */
export function observableFromEvent<T extends keyof TypedWowEvents>(event: T): Observable<TypedWowEvents[T]> {
    return new Observable<TypedWowEvents[T]>(subscriber => {

        let eventFrame = CreateFrame("Frame");
        eventFrame.RegisterEvent(event);
        eventFrame.SetScript("OnEvent", (frame, event, ...data) => {
            subscriber.next(data as TypedWowEvents[T]);
        });
        return new Subscription(() => {
            eventFrame.UnregisterAllEvents();
            eventFrame = undefined;
        });
    });
}