import { Debugger } from "./Debugger";
import { Injectable } from "../decorators/Injectable";

/**
 * the main logger class
 */
@Injectable()
export class Logger implements Debugger {

    public debug(...args: any[]): void {
        print("[DEBUG] ", ...args);
    }

    public info(...args: any[]): void {
        print("[INFO] ", ...args);
    }

    public warning(...args: any[]): void {
        print("[WARNING] ", ...args);
    }

    public error(...args: any[]): void {
        print("[ERROR] ", ...args);
    }
}