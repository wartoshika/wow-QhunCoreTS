import { ModuleConfig } from "../../core/data/ModuleConfig";
import { AddonOptions } from "../../core/AddonOptions";

/**
 * get a database config value
 * @param key the name of the config entry
 * @param throwIfNotExists throw an exception if the required value is null
 */
export function DatabaseModuleConfig(key: keyof ModuleConfig["database"], throwIfNotExists: boolean = false): PropertyDecorator & ParameterDecorator {

    // get addon options
    const addonOptions = AddonOptions.getInstance();

    return (target: { [property: string]: any }, propertyKey: string, parameterIndex?: number) => {

        // search for the value in the toc file
        let value: string;
        let lookupSucceeded: boolean = true;
        try {
            value = addonOptions.moduleConfig.database[key];
        } catch (e) {

            // lookup failure
            lookupSucceeded = false;
        }

        // check for value requirements
        if (!lookupSucceeded || (throwIfNotExists === true && value === null)) {

            throw `Required database module config value does not exists. Required value's key was ${key}`;
        }

        // return that value to set the new value of the parameter (for a parameter decorator)
        if (typeof parameterIndex === "number") {

            return value;
        } else {

            // property decorator
            target[propertyKey] = value;
        }

    };
}
