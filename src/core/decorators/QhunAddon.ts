import { QhunAddonOptions, ClassConstructor } from "../types";
import { AddonOptions } from "../AddonOptions";
import { Injector } from "../di/Injector";
import { Singleton } from "./Singleton";

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

    return <ClassDecorator>(<Target extends object>(target: ClassConstructor<Target>) => {

        // get injector to resolve dependencies
        const injector = Injector.getInstance();
        const resolvedDependencies = injector.resolve(target);

        // add a child class that implements the singleton pattern
        return class QhunAddonEntrypoint extends (Singleton()(target) as ClassConstructor) {

            // override existing constructor function
            constructor(thisArg: object) {

                // build new constructor params
                if (thisArg) {
                    resolvedDependencies.unshift(thisArg);
                }
                super(...resolvedDependencies);
            }
        };
    });
}
