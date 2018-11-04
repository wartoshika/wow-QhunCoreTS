import { Observable } from "../../core/async/rx/Observable";
import { Subscription } from "../../core/async/rx/Subscription";
import { ConfigRepository } from "../repository/impl/ConfigRepository";
import { AnyStringSignatureObject, Injector } from "../../core";
import { EventEmitter } from "../../core/event/EventEmitter";
import { DatabaseEvents } from "../DatabaseEvents";

/**
 * creates an observable from a config repository that emits an event whenever a value has been changed
 * @param repository the repository instance to observe
 */
export function observableFromConfigRepository<T extends ConfigRepository<AnyStringSignatureObject>>(repository: T): Observable<DatabaseEvents["REPOSITORY_WRITE"]> {

    return new Observable<DatabaseEvents["REPOSITORY_WRITE"]>(subscriber => {

        // get the event emitter instance
        const eventEmitter: EventEmitter<DatabaseEvents> = Injector.getInstance().instantiateClass(EventEmitter);

        // define a handler for the event
        const eventHandler = (payload: DatabaseEvents["REPOSITORY_WRITE"]) => {

            // check if the repository matches
            if (payload.repository === repository) {

                // emit next data
                subscriber.next(payload);
            }
        };

        // listen to db write event
        eventEmitter.on("REPOSITORY_WRITE", eventHandler);

        return new Subscription(() => {

            // remove event listening
            eventEmitter.off("REPOSITORY_WRITE", eventHandler);
        });
    });
}