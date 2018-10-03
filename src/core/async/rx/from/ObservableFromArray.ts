import { Observable } from "../Observable";
import { Subscription } from "../Subscription";

/**
 * creates an observable from an array
 * @param arrayData the array data to observe
 */
export function observableFromArray<T extends any>(arrayData: T[]): Observable<T> {
    return new Observable<T>(subscriber => {

        arrayData.forEach(data => subscriber.next(data));
        subscriber.complete();
        return new Subscription();
    });
};