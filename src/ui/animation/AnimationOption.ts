import { Transition } from "./transition/Transition";
import { ClassConstructor } from "../../core/types";

/**
 * an object wrapper to bundle nessesary animation options
 */
export interface AnimationOption {

    /**
     * the transtion function to use
     */
    transition: ClassConstructor<Transition>;

    /**
     * the amount of time in milliseconds to run over the transition state.
     */
    time: number;
}