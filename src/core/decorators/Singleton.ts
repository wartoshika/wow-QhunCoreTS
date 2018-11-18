import { ClassConstructor } from "../types";

export interface SingletonClass<T extends ClassConstructor> extends ClassConstructor<T> {

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

    return <ClassDecorator>(<Target extends SingletonClass<any>>(target: Target) => {

        // create new class
        return class Singleton extends target {

            constructor(...args: any[]) {
                if (target.__singletonHasBeenCreated) {

                    throw new Error(`The singleton class cannot be instantiated twice! Class name was ${target.__name}.`);
                }

                // set singleton property
                target.__singletonHasBeenCreated = true;

                // construct target
                super(...args);
            }
        };
    });
}
