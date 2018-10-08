/**
 * the implementing object can be serialized as string and can also be restored
 */
export interface Serializable<T = any> {

    /**
     * serializes the current state of the implementing object
     */
    serialize(): string;

    /**
     * deserializes the given data and construct the origin object
     * @param data the data to deserialize
     */
    deserialize(data: string): T;
}