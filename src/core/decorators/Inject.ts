import { Injector } from "../di/Injector";
import { ClassConstructor } from "../types";

/**
 * a class level decorator to declare this class as injectable via dependency injection
 * and to allow injecting dependencies into this class.
 * @description a class that has this decorator will become a singleton class and is instantiated by the framework.
 */
export function Inject(dependencyToInject: ClassConstructor): PropertyDecorator {
    return (target: { [anyKey: string]: any }, property: string | symbol): void => {

        // get the injector
        const injector = Injector.getInstance();

        // resolve the given dependency
        const resolved = injector.instantiateClass(dependencyToInject);

        // set the resolved dependency on the target
        target[property as string] = resolved;
    };
}
