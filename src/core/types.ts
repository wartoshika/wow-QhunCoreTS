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