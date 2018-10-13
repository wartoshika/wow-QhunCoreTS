import { Singleton } from "./decorators/Singleton";
import { Debugger } from "./debug/Debugger";

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

    public addonName: string;
    public debuggerInstance: Debugger;
}