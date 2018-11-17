import { Debugger } from "../../src/core/debug/Debugger";

export class MockedLogger implements Debugger {
    public debug(...args: any[]): void {
        //return console.debug(...args);
    }
    public info(...args: any[]): void {
        //return console.info(...args);
    }
    public warning(...args: any[]): void {
        //return console.warn(...args);
    }
    public error(...args: any[]): void {
        //return console.error(...args);
    }
}