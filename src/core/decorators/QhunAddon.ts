import { QhunAddonOptions, ClassConstructor } from "../types";
import { AddonOptions } from "../AddonOptions";
import { bootstrapDebugger } from "../debug/bootstrapDebugger";
import { Injector } from "../di/Injector";

/**
 * a class level decorator to bootstrap your world of warcraft addon.
 * @param options important options for your addon
 */
export function QhunAddon(
    options: QhunAddonOptions
): ClassDecorator {

    // save addon options
    const addonOptionsInstance = AddonOptions.getInstance();
    addonOptionsInstance.addonName = options.addonName;

    // bootstrap the debugger
    if (options.debugger && options.debugger.instance) {
        addonOptionsInstance.debuggerInstance = bootstrapDebugger(options.debugger.instance, [options.debugger.data]);
    }

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