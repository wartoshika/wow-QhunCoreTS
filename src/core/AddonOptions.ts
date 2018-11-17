import { Singleton } from "./decorators/Singleton";
import { ModuleConfig } from "./data/ModuleConfig";

@Singleton()
export class AddonOptions {

    private static instance: AddonOptions;

    /**
     * get the addon options instance
     */
    public static getInstance(): AddonOptions {

        if (!AddonOptions.instance) {
            AddonOptions.instance = new AddonOptions();
        }

        return AddonOptions.instance;
    }

    /**
     * name name of the current addon
     */
    public addonName: string;

    /**
     * module specific configuration
     */
    public moduleConfig: Partial<ModuleConfig>;
}