import { Debugger } from "./Debugger";
import { LogLevel } from "./LogLevel";
import { Singleton } from "../decorators/Singleton";
import { Color } from "../../util/Color";
import { MultiReturn } from "../../util/MultiReturn";

/**
 * displays debug information in a seperate chat window.
 */
@Singleton()
export class DebugChatWindow implements Debugger {

    /**
     * the chat window index used to write message on this window
     */
    private chatFrame: WowChatFrame;
    private chatFrameIndex: number;

    /**
     * @param chatWindowName the name of the window where to debug on
     */
    constructor(chatWindowName: string) {

        // create the chat window where to place logs on
        for (let i = 1; i <= NUM_CHAT_WINDOWS; i++) {

            // get the name of that window
            const [name] = GetChatWindowInfo(i);
            if (name === chatWindowName) {

                // get that frame
                this.chatFrame = _G["ChatFrame" + i];
                this.chatFrameIndex = i;
                break;
            }
        }

        // index found?
        if (this.chatFrame === undefined) {
            throw `The chat window with the name ${chatWindowName} chould not be found!`;
        }

        // remove all other channels from this window
        const [...channelDataStream] = GetChatWindowChannels(1);

        // extract data from the channels
        const channels = MultiReturn.extractObjects(channelDataStream, 2, ["name", "zone"]);
        channels.forEach(channel => {

            // remove this channel
            RemoveChatWindowChannel(this.chatFrameIndex, channel.name as string);
        });

        // remove all messages from this window
        const [...channelMessages] = GetChatWindowMessages(this.chatFrameIndex);
        channelMessages.forEach(messageType => {

            // remove this message
            RemoveChatWindowMessages(this.chatFrameIndex, messageType);
        });
    }

    public debug(...args: any[]): void {
        return this.log(LogLevel.DEBUG, ...args);
    }

    public info(...args: any[]): void {
        return this.log(LogLevel.INFO, ...args);
    }

    public warning(...args: any[]): void {
        return this.log(LogLevel.WARNING, ...args);
    }

    public error(...args: any[]): void {
        return this.log(LogLevel.ERROR, ...args);
    }

    /**
     * finally logs the data
     * @param level the log level to log on
     * @param args all arguments to log at this level
     */
    private log(level: LogLevel, ...args: any[]): void {

        // get level metadata
        let logLevel: string;
        let logColor: string;
        switch (level) {
            case LogLevel.DEBUG:
                logLevel = "DEBUG";
                logColor = Color.GREY;
                break;
            case LogLevel.INFO:
                logLevel = "INFO";
                logColor = Color.WHITE;
                break;
            case LogLevel.WARNING:
                logLevel = "WARNING";
                logColor = Color.ORANGE;
                break;
            case LogLevel.ERROR:
                logLevel = "ERROR";
                logColor = Color.RED;
                break;
        }

        // output the data
        args.forEach(arg => {
            this.chatFrame.AddMessage(
                `${logColor}[${logLevel}] ${arg}`
            );
        });
    }
}