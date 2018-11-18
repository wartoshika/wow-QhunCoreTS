import { AddonOptions } from "../AddonOptions";

declare type PossibleKnownTocFieldName = "Author" | "Title" | "Notes" | "Version" | "SavedVariables";

/**
 * get a value from the addon's toc file. This decorator can be used as PropertyDecorator or ParameterDecorator.
 * The field type will always be a string!
 * @param field the name of the field in the toc file to get the value from
 */
export function TocValue<additionalField extends string>(field: PossibleKnownTocFieldName | additionalField): PropertyDecorator & ParameterDecorator {

    // get addon options
    const addonOptions = AddonOptions.getInstance();

    return (target: { [property: string]: any }, propertyKey: string, parameterIndex?: number) => {

        // search for the value in the toc file
        const tocValue = GetAddOnMetadata(addonOptions.addonName, field);

        // return that value to set the new value of the parameter (for a parameter decorator)
        if (typeof parameterIndex === "number") {

            return tocValue;
        } else {

            // property decorator
            target[propertyKey] = tocValue;
        }

    };
}
