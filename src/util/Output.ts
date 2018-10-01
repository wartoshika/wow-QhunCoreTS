export class Output {

    public static dump(...args: any[]): void {

        args.forEach(arg => {
            print(Output.dumpInternal(arg));
        });
    }

    private static dumpInternal(arg: any): string {

        if ((typeof arg) as string === "table") {

            const output: string[] = ["{"];
            output.push(...Object.keys(arg).map(key => {

                if (typeof key === "number") {
                    key = `${key}`;
                }
                if (typeof key !== "string") {
                    key = Output.dumpInternal(key);
                }

                return `[${key}] = ${Output.dumpInternal(arg[key])},`;
            }));

            output.push("}");
            return output.join("\n");
        } else {
            return tostring(arg);
        }
    };
}
