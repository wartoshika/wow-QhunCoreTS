/**
 * an object that is capable of executing a slash command request
 */
export interface SlashExecutor {

    /**
     * executs or handles the given slash command
     * @param slashName the command name
     * @param message the message that has been inputed
     */
    execute(slashName: string, message: string): void;
}