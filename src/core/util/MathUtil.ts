/**
 * a class containing math utillity functions such as rounding numbers with exact precision
 */
export class MathUtil {

    /**
     * rounds the number to the given precision
     * @param value the value to round
     * @param decimals the max decimals
     */
    public static round(value: number, decimals: number = 2): number {

        const multi: number = 10 ** decimals;
        return Math.floor(value * multi + .5) / multi;
    }

    /**
     * calculates the Logarithm of the given value with the given base
     * @param value the value to calculate the Logarithm of
     * @param base the base to use for the calculation
     */
    public static logBase(value: number, base: number): number {

        return Math.log(value) / Math.log(base);
    }

    /**
     * shortens the given number to convert 1000 to 1k and 1000000 to 1m
     * @param value the number to shorten
     * @param decimals the amount of decimals that are present in the shortened value
     * @param spaceBetweenNumberAndSuffix should there be a space char between number and suffix?
     * @param suffixStack the translation for kilo to tera ...
     */
    public static shorten(
        value: number,
        decimals: number = 2,
        spaceBetweenNumberAndSuffix: boolean = true,
        suffixStack: string[] = ["", "K", "M", "B", "T"]
    ): string {

        // get the index of the suffix stack
        const nominalIndex = Math.floor(MathUtil.logBase(Math.abs(value), 10) / 3);
        const realIndex = Math.max(0, Math.min(nominalIndex, suffixStack.length - 1));

        // get suffix
        const suffix = suffixStack[realIndex];

        // calculate the new number value
        const scaledNumber = value / (10 ** (realIndex * 3));

        // round and put together
        return `${MathUtil.round(scaledNumber, decimals)}${spaceBetweenNumberAndSuffix ? " " : ""}${suffix}`;
    }
}