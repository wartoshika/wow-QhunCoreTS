import { QhunAddonOptions } from "./types";

export class AddonOptions implements QhunAddonOptions {

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

    public embed: boolean;
    public addonName: string;
}