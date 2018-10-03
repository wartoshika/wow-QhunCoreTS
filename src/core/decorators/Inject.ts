import { TranspiledReflectableClass } from "../di/reflection/TranspiledReflectableClass";
import { Injector } from "../di/Injector";

/**
 * a class level decorator to declare this class as injectable via dependency injection
 * and to allow injecting dependencies into this class.
 * @description a class that has this decorator will become a singleton class and is instantiated by the framework.
 */
export function Inject(dependencyToInject: Function): PropertyDecorator {
    return (target: { [any: string]: any }, property: string | Symbol): void => {

        // get the injector
        const injector = Injector.getInstance();

        // resolve the given dependency
        const resolved = injector.instantiateClass(dependencyToInject as TranspiledReflectableClass);

        // set the resolved dependency on the target
        target[property as string] = resolved;
    }
};