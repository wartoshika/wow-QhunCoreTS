export class RandomUtil {

    /**
     * generates a random uuid like string
     */
    public static uuid(): string {

        // replace by template
        const uuidResult = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, match => {
            const hex = match === "x" ? RandomUtil.randomBetween(0, 0xf) : RandomUtil.randomBetween(0, 0xb);
            return hex.toString(16);
        });

        return uuidResult;
    }

    /**
     * returns a random number between the two given numbers (including)
     * @param first the first number
     * @param second the second number
     */
    public static randomBetween(first: number, second: number): number {
        return Math.floor(Math.random() * (second - first + 1)) + first;
    }
}
