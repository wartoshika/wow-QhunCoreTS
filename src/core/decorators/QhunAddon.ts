import { QhunAddonOptions } from "../types";
import { AddonOptions } from "../AddonOptions";
import { TranspiledReflectableClass, Injector } from "../di";
import { bootstrapDebugger, Debugger } from "../debug";

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

    // bootstrap the debugger
    if (options.debugger && options.debugger.instance) {
        addonOptionsInstance.debuggerInstance = bootstrapDebugger(options.debugger.instance as TranspiledReflectableClass<Debugger>, [options.debugger.data]);
    }

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