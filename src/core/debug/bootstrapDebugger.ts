import { Debugger } from "./Debugger";
import { TranspiledReflectableClass } from "../di/reflection/TranspiledReflectableClass";

/**
 * bootstraps the debugger
 * @param debugClass the debugger class
 * @param constructorData the data to inject into the debugger
 */
export function bootstrapDebugger(debugClass: TranspiledReflectableClass<Debugger>, constructorData: any[]): Debugger {

    const debuggerInstance = new debugClass(...constructorData);
    debuggerInstance.debug(`bootstrapDebugger() successfully attached to ${debugClass.__name}`);

    return debuggerInstance;
}