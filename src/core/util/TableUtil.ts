import { StrictSignatureObject } from "../types";

export class TableUtil {

    /**
     * takes the original input and fill empty spaces with the default value table
     * @param original the original data
     * @param defaultValues the defalt values
     * @return the original filled table
     */
    public static fillTableDefault<T extends object>(
        original: StrictSignatureObject<T>,
        defaultValues: Required<StrictSignatureObject<T>>
    ): Required<StrictSignatureObject<T>> {

        // if there is no existing data, return the default
        if (!original) {
            return defaultValues;
        }

        const defaultKeys = Object.keys(defaultValues) as (keyof T)[];
        defaultKeys.forEach(key => {

            if (original[key] === undefined) {
                original[key] = defaultValues[key];
            }
        });

        return original as Required<T>;
    }

    /**
     * test if the given object is a table
     * @param object the object to test
     */
    public static isTable(object: object): boolean {

        return object !== null && ((typeof object) as string === "table" || typeof object === "object");
    }
}
