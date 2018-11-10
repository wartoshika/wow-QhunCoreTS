import { Injectable } from "../core/decorators/Injectable";
import { Logger } from "../core/debug/Logger";
import { SlashExecutor } from "./SlashExecutor";

/**
 * a class that allows to register slash commands for your addon
 */
@Injectable()
export class SlashCommandRegistar {

    /**
     * holds the addon name for prefixing
     */
    private readonly addonName: string = __FILE_META[1];

    /**
     * holds the current registered slash command stack
     */
    private registeredCommandStack: {
        readonly prefix: string,
        currentCommands: {
            handler?: SlashExecutor | ((this: any, message: string, editbox: WowEditBox) => void),
            commands: string[]
        }[]
    } = {
            prefix: this.addonName.toUpperCase().replace(/%W+/g, ""),
            currentCommands: []
        };

    constructor(
        private logger: Logger
    ) { }

    /**
     * register a slash command.
     * @param slashName the names of the command
     * @param handler the handler function or class
     */
    public registerCommand(slashName: string[], handler: SlashExecutor | ((message: string, editbox: WowEditBox) => void)): void {

        // update registered
        this.registeredCommandStack.currentCommands.push({
            handler: handler,
            commands: slashName
        });

        // update list
        this.updateSlashCommandList();
    }

    /**
     * update the internal slash command list to allow wow fetch the correct 
     * handler
     */
    private updateSlashCommandList(): void {

        // iterate over all commands
        this.registeredCommandStack.currentCommands.forEach(command => {

            // build a command like prefix to add it after the addon name
            const commandPrefix = command.commands[0].toUpperCase().replace(/%W+/, "");
            const globalNamespace = this.generateGlobalNamespaceName(commandPrefix);

            // unset previous command and add new
            command.commands.forEach((slashName, index) => {

                const globalNameWithIndex = globalNamespace + index.toString();

                // delete if available
                delete _G[globalNameWithIndex];

                // add
                _G[globalNameWithIndex] = `/${slashName}`;

                // add debug message
                this.logger.info(`Registeted slash command /${slashName} on ${globalNameWithIndex}`);
            });

            // add to SlashCmdList table
            _G.SlashCmdList[`${this.registeredCommandStack.prefix}_${commandPrefix}`] = (message: string, editbox: WowEditBox) => {

                // execute as normal function
                if (typeof command.handler === "function") {

                    return command.handler(message, editbox);
                }

                // execute function on object if exists
                if (typeof (command.handler as SlashExecutor).execute === "function") {

                    return command.handler.execute(message, editbox);
                }
            };
        });
    }

    /**
     * generates a global namespace name for this command
     * @param commandPrefix the command prefix to use
     */
    private generateGlobalNamespaceName(commandPrefix: string): string {

        return `SLASH_${this.registeredCommandStack.prefix}_${commandPrefix}`;
    }
}