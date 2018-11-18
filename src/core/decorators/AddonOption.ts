import { AddonOptions } from "../AddonOptions";

/**
 * get a value from the AddonOption object using a PropertyDecorator or ParameterDecorator
 * @param field the field name
 */
export function AddonOption(field: keyof AddonOptions): PropertyDecorator & ParameterDecorator {

    // get addon options
    const addonOptions = AddonOptions.getInstance();

    return (target: { [property: string]: any }, propertyKey: string, parameterIndex?: number) => {

        // search for the value in the toc file
        const value = addonOptions[field];

        // return that value to set the new value of the parameter (for a parameter decorator)
        if (typeof parameterIndex === "number") {

            return value;
        } else {

            // property decorator
            target[propertyKey] = value;
        }

    };
}
