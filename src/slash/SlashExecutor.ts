/**
 * an object that is capable of executing a slash command request
 */
export interface SlashExecutor {

    /**
     * executs or handles the given slash command
     * @param message the message that has been inputed
     * @param editbox the edit box where the command has been sent from
     */
    execute(message: string, editbox: WowEditBox): void;
}
