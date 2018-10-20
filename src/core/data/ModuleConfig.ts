/**
 * a data interface for accessing per module configuration
 */
export interface ModuleConfig {

    /**
     * contains database specific configuration
     */
    database?: {

        /**
         * the variable name for storage purpose
         */
        savedVariableName: string
    }
}