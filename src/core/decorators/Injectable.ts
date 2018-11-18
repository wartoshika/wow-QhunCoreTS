import { InjectableClass } from "../di/InjectableClass";
import { Singleton } from "./Singleton";

/**
 * Marks this class as beeing injectable by the dependency injection system.
 * All injectable classes are singleton class and the @Singleton() decorator will automaticly be applied!
 */
export function Injectable(): ClassDecorator {

    // tslint:disable-next-line ban-types
    return <ClassDecorator>(<Target extends Function>(target: InjectableClass<Target>) => {

        // place a flag on the target that it is injectable
        target.__injectable = true;

        // apply singleton and return the origin constructor
        return Singleton()(target);
    });
}
