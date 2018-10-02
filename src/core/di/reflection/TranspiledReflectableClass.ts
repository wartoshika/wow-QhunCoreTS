export interface TranspiledReflectableClass<Target extends Object = Object> {

    /**
     * every class method with its dependencies in correct order
     */
    __staticReflection: {
        [methodName: string]: Function[]
    };

    /**
     * the reflected class name
     */
    __name: string;

    /**
     * class constructor function
     */
    new(...args: any[]): Target & {

        /**
         * every class method with its dependencies in correct order
         */
        __staticReflection: {
            [methodName: string]: Function[]
        };
    };

    /**
     * the transpiled constructor function
     * @param thisArg this arg
     * @param constructorArguments all other constructor params
     */
    __init(thisArg: object, ...constructorArguments: any[]): Target;
}