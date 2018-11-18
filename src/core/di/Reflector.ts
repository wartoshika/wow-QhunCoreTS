import { ClassConstructor } from "../types";
import { InjectableClass } from "./InjectableClass";
import { TableUtil } from "../util/TableUtil";

/**
 * the reflector can resolve static transpiled method signatures.
 */
export class Reflector {

    /**
     * resolves the method signature on the given object
     * @param ctor the class object (no instance)
     * @param methodName the method name to get the signature of
     */
    public getMethodSignature<T extends ClassConstructor>(ctor: T, methodName: (keyof T) | "constructor" = "constructor"): any[] {

        if (ctor && ctor.__staticReflection) {
            return ctor.__staticReflection[methodName as string] || [];
        }
        return [];
    }

    /**
     * check if the given class is a reflectable class
     * @param ctor the class to check
     */
    public isInjectableClass(ctor: InjectableClass): ctor is InjectableClass {

        return (TableUtil.isTable(ctor) || typeof ctor === "function") && ctor.__staticReflection !== undefined && ctor.__injectable === true;
    }

    /**
     * check if the given object is a class constructor but is not allowed to be injected
     * @param ctor the class to check
     */
    public isClassButNotInjectable(ctor: InjectableClass): ctor is ClassConstructor {

        return (TableUtil.isTable(ctor) || typeof ctor === "function") && ctor.__staticReflection !== undefined && !ctor.__injectable;
    }
}
