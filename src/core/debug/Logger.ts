import { Singleton } from "../decorators/Singleton";
import { Debugger } from "./Debugger";
import { AddonOption } from "../decorators/AddonOption";

/**
 * the main logger class
 */
@Singleton()
export class Logger implements Debugger {

    @AddonOption("debuggerInstance")
    private debugger: Debugger;

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