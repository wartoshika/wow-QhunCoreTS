/**
 * the addon options required to bootstrap the addon
 */
export interface QhunAddonOptions {

    /**
     * embed the framework into the transpiled source code. You dont need to download
     * this framework seperatly and it will be version save for your addon.
     * @default: true
     */
    embed?: boolean,

    /**
     * the name of your addon. this is important because this value will be used as prefix
     * for created frames, for aquiring data from your toc file ...
     */
    addonName: string
};

/**
 * a generic object constructor interface
 */
export interface ClassConstructor<T extends object = object> {

    new(...args: any[]): T
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