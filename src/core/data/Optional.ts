/**
 * A class that wraps a value that is can resolve to the given type T or can be empty
 */
export class Optional<T> {

    /**
     * creates an optional instance and provide the given value
     * @param value the value to wrap
     */
    public static of<T>(value: T): Optional<T> {

        return new Optional<T>(value);
    }

    /**
     * creates an optional instance and provide no value
     */
    public static empty<T extends any = any>(): Optional<T> {

        return new Optional<T>();
    }

    /**
     * @param value the wrapped value or null
     */
    public constructor(
        private wrappedValue: T | null = null
    ) { }

    /**
     * check if a value is present
     */
    public isPresent(): boolean {

        return this.wrappedValue !== null;
    }

    /**
     * executes the given callback if the value is present. nothing will happen if no value is there
     * @param callback the callback that should be executed
     */
    public ifPresent<R extends any>(callback: (value: T) => R): R {

        if (this.isPresent()) {

            return callback(this.wrappedValue);
        }
    }

    /**
     * get the wrapped value or null
     */
    public getValue(): T {

        return this.wrappedValue;
    }

    /**
     * get the wrapped value or the given elseValue
     * @param elseValue the alternative value that will be retured when no value is present. can be a function that returns the default value
     */
    public getOrElse(elseValue: T | (() => T)): T {

        if (this.isPresent()) {

            return this.wrappedValue;
        }

        // function type check for getting the default value
        if (typeof elseValue === "function") {
            return (elseValue as (() => T))();
        }

        return elseValue;
    }

    /**
     * get the wrapped value or throw an exception if no value is present
     * @param errorMessage the error message that should be thrown when no wraped value is present
     */
    public getOrThrow(errorMessage: string): T {

        if (this.isPresent()) {

            return this.wrappedValue;
        }

        throw errorMessage;
    }
}
