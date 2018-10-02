import { QhunAddonOptions } from "../types";
import { AddonOptions } from "../AddonOptions";
import { TranspiledReflectableClass, Injector } from "../di";

/**
 * a class level decorator to bootstrap your world of warcraft addon.
 * @param options important options for your addon
 */
export function QhunAddon(
    options: QhunAddonOptions
): any {

    // save addon options
    const addonOptionsInstance = AddonOptions.getInstance();
    addonOptionsInstance.addonName = options.addonName;
    addonOptionsInstance.embed = options.embed;

    // go on with dependency injection
    const injector = Injector.getInstance();
    return <Target extends Function>(target: TranspiledReflectableClass<Target>) => {

        // save the original constructor function
        const originalConstructor = target.__init;

        // override existing constructor function
        return (thisArg: object, ...otherArguments: any[]) => {

            originalConstructor(thisArg, ...injector.resolve(target));
        };
    };
}