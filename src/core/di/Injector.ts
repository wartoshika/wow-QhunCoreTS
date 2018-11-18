import { Reflector } from "./Reflector";
import { ClassConstructor } from "../types";
import { Injectable } from "../decorators/Injectable";

/**
 * the injector resolves dependencies of classes or functions to allow recursivly inject all
 * nessesary dependencies into that function.
 */
@Injectable()
export class Injector {

    /**
     * get the injector singleton instance
     */
    public static getInstance(): Injector {

        if (!Injector.__instance) {
            Injector.__instance = new Injector();
        }
        return Injector.__instance;
    }

    // tslint:disable-next-line variable-name
    private static __instance: Injector;

    /**
     * the reflector instance to resolve method signatures
     */
    private reflector: Reflector = new Reflector();

    /**
     * the storage of allready instantiated objects
     */
    private instanceStorage: {
        ctor: ClassConstructor,
        instance: object,
        manual: boolean
    }[] = [];

    constructor() {

        // when resolving the injector via di, there is no need to
        // create another instance
        this.instanceStorage.push({
            ctor: Injector,
            instance: this,
            manual: false
        });
    }

    /**
     * adds the given instance to the internal stack
     * @param ctor the constructor of the instance
     * @param instance the instance itself
     */
    public addInstance<T extends object>(ctor: ClassConstructor<T>, instance: Partial<T>): void {

        if (!this.findExistingInstance(ctor)) {
            this.instanceStorage.push({
                ctor: ctor,
                instance: instance as Required<T>,
                manual: true
            });
        }
    }

    /**
     * removes all manually added instances from the internal stack
     */
    public clearManual(): void {

        this.instanceStorage = this.instanceStorage.filter(dependency => {
            return dependency.manual === false;
        });
    }

    /**
     * instantiates a new class by its constructor and resolves all dependencies
     * @param ctor the class to instantiate
     */
    public instantiateClass<T extends object>(ctor: ClassConstructor<T>): T {

        // test if the given ctor is injectable
        if (this.reflector.isClassButNotInjectable(ctor)) {
            throw new Error(`Given class ${ctor.name} is not injectable and can not be instantiated! Do you forget to add @Injectable()?`);
        }

        const existing = this.findExistingInstance(ctor);
        if (existing) {
            return existing as T;
        }

        // resolve dependencies
        const dependencies = this.reflector.getMethodSignature(ctor, "constructor");

        // create dependencies
        const resolvedDependencies = dependencies.map((dep: ClassConstructor) => {

            // if the dependency has an object signature, try to resolve this dependency
            if (this.reflector.isInjectableClass(dep)) {

                const existingInst = this.findExistingInstance(dep);
                if (existingInst) {
                    return existingInst;
                }

                // no candidate found, construct a new instance
                return this.instantiateClass(dep);
            }

            // throw an error if the dependency is a not injectable class
            if (this.reflector.isClassButNotInjectable(dep)) {
                const err = `Diven dependency ${dep.__name} of ${(ctor as ClassConstructor).__name} is not injectable. Do you forget to add @Injectable()?`;
                throw err;
            }

            // default return for false reflection
            return dep;
        });

        // construct the class
        const instance = new (ctor as ClassConstructor)(...resolvedDependencies);
        this.instanceStorage.push({
            ctor: ctor,
            instance: instance,
            manual: false
        });
        return instance as T;
    }

    /**
     * resolves all declared dependencies for the given class
     * @param ctor the target class
     */
    public resolve(ctor: ClassConstructor): object[] {

        return this.reflector
            .getMethodSignature(ctor, "constructor")
            .map(dependency => {
                if (this.reflector.isInjectableClass(dependency)) {

                    return this.instantiateClass(dependency);
                } else if (this.reflector.isClassButNotInjectable(dependency)) {

                    // throw as it is an error
                    // tslint:disable-next-line max-line-length
                    const err = `InjectionError: ${ctor.__name} needs a dependency ${dependency.__name} that cannot be injected. Do you forget to add the @Injectable() decorator?`;
                    throw err;
                }
                return dependency;
            });
    }

    /**
     * tries to find an existing instance of the given class
     * @param ctor the constructor to search for
     */
    private findExistingInstance<T extends object>(ctor: ClassConstructor<T>): T | null {

        // try to find an existing instance
        const candiates = this.instanceStorage.filter(dep => dep.ctor === ctor);
        if (candiates.length === 1) {
            return candiates[0].instance as T;
        }
        return null;
    }
}
