import { TranspiledReflectableClass } from "../di/reflection/TranspiledReflectableClass";

interface SingletonClass<T> extends TranspiledReflectableClass<T> {

    /**
     * a property to check if the singleton has allready been created
     */
    __singletonHasBeenCreated?: boolean;
}

/**
 * make sure that this class is only instantiated one time by checking the singleton design pattern
 * at runtime
 */
export function Singleton(): any {
    return <Target extends Function>(target: SingletonClass<Target>) => {

        // check if the singleton runtime check property has allready been placed
        // on this target
        if (target.__singletonHasBeenCreated) {
            throw `The singleton class cannot be instantiated twice! Class name was ${target.__name}.`;
        }

        // do not override the current constructor
        return target.__init;
    };
}