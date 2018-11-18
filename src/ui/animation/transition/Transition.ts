export interface Transition {

    /**
     * calculates y over x where x is the current time over the overall amount of time
     * @param x the current time value
     * @return the y value based on x where y is between 0 and 1 inclusive
     */
    calculate(x: number): number;
}
