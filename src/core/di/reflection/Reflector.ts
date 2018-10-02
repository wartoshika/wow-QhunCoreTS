import { TranspiledReflectableClass } from "./TranspiledReflectableClass";

/**
 * the reflector can resolve static transpiled method signatures.
 */
export class Reflector {

    /**
     * resolves the method signature on the given object
     * @param ctor the class object (no instance)
     * @param methodName the method name to get the signature of
     */
    public getMethodSignature<T extends TranspiledReflectableClass>(ctor: T, methodName: (keyof T) | "constructor" = "constructor"): any[] {

        return ctor.__staticReflection[methodName as string];
    }

    /**
     * check if the given class is a reflectable class
     * @param ctor the class to check
     */
    public isReflectableClass(ctor: TranspiledReflectableClass): ctor is TranspiledReflectableClass {

        return (typeof ctor as string) === "table" && ctor.__staticReflection !== undefined;
    }

}