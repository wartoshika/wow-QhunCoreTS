import { ClassConstructor } from "../types";

interface SingletonClass<T extends ClassConstructor> extends ClassConstructor<T> {

    /**
     * a property to check if the singleton has allready been created
     */
    __singletonHasBeenCreated?: boolean;
}

/**
 * make sure that this class is only instantiated one time by checking the singleton design pattern
 * at runtime
 */
export function Singleton(): ClassDecorator {
    return <ClassDecorator>(<Target extends ClassConstructor>(target: SingletonClass<Target>) => {

        // save the original constructor function
        const originalConstructor = target.__init;

        // override constructor to check if the class has been instantiated twice
        return (thisArg: object, ...otherArguments: any[]) => {

            // check if the singleton runtime check property has allready been placed
            // on this target
            if (target.__singletonHasBeenCreated) {
                throw `The singleton class cannot be instantiated twice! Class name was ${target.__name}.`;
            }

            // set singleton property
            target.__singletonHasBeenCreated = true;

            // construct target
            originalConstructor(thisArg, ...otherArguments);
        };
    });
}