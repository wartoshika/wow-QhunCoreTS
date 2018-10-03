/**
 * an object that is capable of taking and displaying debugging informations
 */
export interface Debugger {

    /**
     * logs information at debug log level
     * @param arguments all arguments to log
     */
    debug(...args: any[]): void;

    /**
     * logs information at info log level
     * @param arguments all arguments to log
     */
    info(...args: any[]): void;

    /**
     * logs information at warning log level
     * @param arguments all arguments to log
     */
    warning(...args: any[]): void;

    /**
     * logs information at error log level
     * @param arguments all arguments to log
     */
    error(...args: any[]): void;
}