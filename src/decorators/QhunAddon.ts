import { Injector, TranspiledReflectableClass } from "../di";

declare type QhunAddonOptions = {

    /**
     * embed the framework into the transpiled source code. You dont need to download
     * this framework seperatly and it will be version save for your addon.
     * @default: true
     */
    embed?: boolean,
};

/**
 * a class level decorator to bootstrap your world of warcraft addon.
 * @param options important options for your addon
 */
export function QhunAddon(
    options: QhunAddonOptions = {
        embed: true
    }
): any {

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