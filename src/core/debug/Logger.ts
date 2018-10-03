import { Singleton } from "../decorators/Singleton";
import { Debugger } from "./Debugger";
import { AddonOptions } from "../AddonOptions";

/**
 * the main logger class
 */
@Singleton()
export class Logger implements Debugger {

    private debugger: Debugger = AddonOptions.getInstance().debuggerInstance;

    public debug(...args: any[]): void {
        this.debugger.debug(...args);
    }

    public info(...args: any[]): void {
        this.debugger.info(...args);
    }

    public warning(...args: any[]): void {
        this.debugger.warning(...args);
    }

    public error(...args: any[]): void {
        this.debugger.error(...args);
    }
}