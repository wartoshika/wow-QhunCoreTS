import { AnyStringSignatureObject, StrictSignatureObject, TupleTypeChangeObject } from "../core";

/**
 * a util class to handle lua multi return a little bit easyer
 */
export class MultiReturn {

    /**
     * extracts objects that should be put together from an array
     * @param data the complete data set
     * @param splitCount the number of objects that should be bound together
     * @example name1, zone1, name2, zone2, ... = GetChatWindowChannels(frameId) - should have a splitCount of 2 because name and zone should be bound together.
     */
    public static extractObjects<D extends any, T extends string>(data: D[], splitCount: number, objectStructure: T[]): TupleTypeChangeObject<T, D>[] {

        // build the data set
        const returnData: AnyStringSignatureObject[] = [];

        // iterate over the data stream
        for (let i = 0; i < data.length; i += splitCount) {
            const obj: AnyStringSignatureObject = {};
            for (let a = 0; a < splitCount; a++) {
                obj[objectStructure[i % splitCount + a]] = data[i + a];
            }
            returnData.push(obj as StrictSignatureObject<T>);
        }

        return returnData as any;
    }
}