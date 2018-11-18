/**
 * represents a serialized data set.
 */
export declare type Serialized<TargetClass extends object> = {

    /**
     * the class name of the serialized data
     */
    __className: string,

    /**
     * the namespace of the serialized class
     */
    __namespace: string
} & {

        /**
         * all other data sets
         */
        [P in keyof TargetClass]: TargetClass[P]
    };
