import { QhunAddonOptions, ClassConstructor } from "../types";
import { AddonOptions } from "../AddonOptions";
import { bootstrapDebugger } from "../debug/bootstrapDebugger";
import { Injector } from "../di/Injector";

/**
 * a class level decorator to bootstrap your world of warcraft addon.
 * @param options important options for your addon
 */
export function QhunAddon(
    options: QhunAddonOptions = {}
): ClassDecorator {

    // save addon options
    const addonOptionsInstance = AddonOptions.getInstance();
    addonOptionsInstance.addonName = __FILE_META[1];
    addonOptionsInstance.moduleConfig = options.modules || {};

    // go on with dependency injection
    const injector = Injector.getInstance();
    return <ClassDecorator>(<Target extends Function>(target: ClassConstructor<Target>) => {

        // save the original constructor function
        const originalConstructor = target.__init;

        // override existing constructor function
        return (thisArg: object, ...otherArguments: any[]) => {

            originalConstructor(thisArg, ...injector.resolve(target));
        };
    });
}