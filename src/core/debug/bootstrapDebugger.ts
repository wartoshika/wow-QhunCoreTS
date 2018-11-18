import { Debugger } from "./Debugger";
import { ClassConstructor } from "../types";

/**
 * bootstraps the debugger
 * @param debugClass the debugger class
 * @param constructorData the data to inject into the debugger
 */
export function bootstrapDebugger(debugClass: ClassConstructor<Debugger>, constructorData: any[]): Debugger {

    const debuggerInstance = new debugClass(...constructorData);
    debuggerInstance.debug(`bootstrapDebugger() successfully attached to ${debugClass.__name}`);

    return debuggerInstance;
}
