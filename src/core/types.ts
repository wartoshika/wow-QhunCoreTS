import { Debugger } from "./debug/Debugger";
import { ModuleConfig } from "./data/ModuleConfig";

/**
 * the addon options required to bootstrap the addon
 */
export interface QhunAddonOptions {

    /**
     * creates a debug environment for developing purpose. when empty, no debugging is enabled.
     */
    debugger?: {

        /**
         * the class that shoule be used to debug
         */
        instance: ClassConstructor<Debugger>;

        /**
         * additional data for the debugger
         */
        data: any
    },

    /**
     * contains optional module specific configuration
     */
    modules?: ModuleConfig
};

/**
 * a generic object constructor interface
 */
export interface ClassConstructor<T extends object = object> {

    /**
     * every class method with its dependencies in correct order
     */
    __staticReflection?: {
        [methodName: string]: any[]
    };

    /**
     * the reflected class name
     */
    __name?: string;

    /**
     * the reflected namespace including class filename of the class
     */
    __namespace?: string;

    /**
     * class constructor function
     */
    new(...args: any[]): T & {

        /**
         * every class method with its dependencies in correct order
         */
        __staticReflection?: {
            [methodName: string]: Function[]
        };
    };

    /**
     * the transpiled constructor function
     * @param thisArg this arg
     * @param constructorArguments all other constructor params
     */
    __init?(thisArg: object, ...constructorArguments: any[]): T;
}

/**
 * a generic type to remove index signatures when they were not nessesary
 */
export type KnownTypes<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

/**
 * a generic type to only expose properties that are added by user and does not inherit
 * string or object builtin functions
 */
export type KnownProperties<T extends any> = Pick<T, KnownTypes<T>>;

/**
 * a type that extends an object and has a string key with any content
 */
export type AnyStringSignatureObject = {
    [key: string]: any;
};

/**
 * a strict signature of an object
 */
export type StrictSignatureObject<T> = {
    [P in keyof T]: T[P]
};

/**
 * a type that changes a tuple type to an object with the given type
 */
export type TupleTypeChangeObject<Tuple extends string | number, Type> = {
    [P in Tuple]: Type
};

/**
 * omits the given properties K of T
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;