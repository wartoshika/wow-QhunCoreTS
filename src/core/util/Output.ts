import { TableUtil } from "./TableUtil";

/**
 * This util class handles formatted output
 */
export class Output {

    /**
     * dumps all kinds of types (even tables) onto the default console using runtime
     * type reflection of lua.
     * @param args the arguments to dump
     */
    public static dump(...args: any[]): void {

        args.forEach(arg => {
            print(Output.convertToFormattedString(arg));
        });
    }

    /**
     * Converts the given argument to a human readable string
     * @param arg the arg to convert
     */
    private static convertToFormattedString(arg: any): string {

        if (TableUtil.isTable(arg)) {

            const output: string[] = ["{"];
            output.push(...Object.keys(arg).map(key => {

                if (typeof key === "number") {
                    key = `${key}`;
                }
                if (typeof key !== "string") {
                    key = Output.convertToFormattedString(key);
                }

                return `[${key}] = ${Output.convertToFormattedString(arg[key])},`;
            }));

            output.push("}");
            return output.join("\n");
        } else {
            return `[${typeof arg}]: ${tostring(arg)}`;
        }
    };
}
