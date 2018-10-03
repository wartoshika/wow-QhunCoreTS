import { TranspiledReflectableClass } from "./reflection/TranspiledReflectableClass";
import { Reflector } from "./reflection/Reflector";

/**
 * the injector resolves dependencies of classes or functions to allow recursivly inject all
 * nessesary dependencies into that function.
 */
export class Injector {

    private static __instance: Injector;

    /**
     * get the injector singleton instance
     */
    public static getInstance(): Injector {

        if (!Injector.__instance) {
            new Injector();
        }

        return Injector.__instance;
    }

    /**
     * the reflector instance to resolve method signatures
     */
    private reflector: Reflector = new Reflector();

    /**
     * the storage of allready instantiated objects
     */
    private instanceStorage: {
        ctor: Function,
        instance: Object
    }[] = [];

    constructor() {

        Injector.__instance = this;

        // when resolving the injector via di, there is no need to 
        // create another instance
        this.instanceStorage.push({
            ctor: Injector,
            instance: this
        });
    }

    /**
     * instantiates a new class by its constructor and resolves all dependencies
     * @param ctor the class to instantiate
     * @param defaultArguments the default arguments that will take place if one dependency could not resolved
     */
    public instantiateClass<T extends Object>(ctor: TranspiledReflectableClass<T>, defaultArguments: any[] = []): T {
        
        const existing = this.findExistingInstance(ctor);
        if (existing) {
            return existing as T;
        }

        // resolve dependencies
        const dependencies = this.reflector.getMethodSignature(ctor, "constructor");

        // create dependencies
        const resolvedDependencies = dependencies.map((dep: TranspiledReflectableClass, index) => {

            // if the dependency has an object signature, try to resolve this dependency
            if (this.reflector.isReflectableClass(dep)) {

                const existing = this.findExistingInstance(dep);
                if (existing) {
                    return existing;
                }

                // no candidate found, construct a new instance
                return this.instantiateClass(dep);
            }

            // no object like signature found, resolve with the original value
            return defaultArguments[index] || dep;
        }) || [];

        // construct the class
        const instance = new ctor(...resolvedDependencies);
        this.instanceStorage.push({
            ctor: ctor,
            instance: instance
        });
        return instance as T;
    }

    /**
     * resolves all declared dependencies for the given class
     * @param ctor the target class
     */
    public resolve(ctor: TranspiledReflectableClass): Object[] {
        
        return this.reflector
            .getMethodSignature(ctor, "constructor")
            .map(dependency => {
                if (this.reflector.isReflectableClass(dependency)) {
                    
                    return this.instantiateClass(dependency);
                }
                return dependency;
            });
    }

    /**
     * tries to find an existing instance of the given class
     * @param ctor the constructor to search for
     */
    private findExistingInstance<T = any>(ctor: TranspiledReflectableClass<T>): T | null {

        // try to find an existing instance
        const candiates = this.instanceStorage.filter(dep => dep.ctor === ctor);
        if (candiates.length === 1) {
            return candiates[0].instance as T;
        }
        return null;
    }
}