import { Singleton } from "../../core/decorators/Singleton";
import { ClassConstructor } from "../../core/types";
import { Transition } from "./transition/Transition";
import { Injector } from "../../core/di/Injector";
import { Inject } from "../../core/decorators/Inject";
import { Timer } from "../../core/async/Timer";

/**
 * a manager that handles animations over a given amount of time
 */
@Singleton()
export class AnimationManager {

    /**
     * the animation manager instance
     */
    private static instance: AnimationManager;

    /**
     * the timer instance
     */
    @Inject(Timer)
    private timer: Timer;

    /**
     * the injector instance
     */
    private injector: Injector;

    /**
     * get the animation manager instance
     */
    public static getInstance(): AnimationManager {

        if (!AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
        return AnimationManager.instance;
    }

    constructor() {

        // get the injector
        this.injector = Injector.getInstance();
    }

    /**
     * from 0 => 1: animates the frame and calls the callback with the calculated property value.  
     * @param callback the function that should be called when a new animation state reached
     * @param transition use this transition function
     * @param overTime animates over this amount of time
     * @param onFinished a possible callback when the animation has been finished
     */
    public animate0to1(callback: (value: number) => any, transition: ClassConstructor<Transition>, overTime: number, onFinished?: () => void): void {

        // create transition class
        const transitionClass = this.injector.instantiateClass(transition);

        // request a timer frame
        this.timer.every((currentTime: number) => {

            // calculate new value
            const value = transitionClass.calculate(currentTime / overTime);

            // set value
            callback(value);

            // call finish callback when the timeout is reached
            if (currentTime === overTime && typeof onFinished === "function") {
                onFinished();
            }
        }, 1, overTime);
    }

    /**
     * from 1 => 0: animates the frame and calls the callback with the calculated property value.
     * @param callback the function that should be called when a new animation state reached
     * @param transition use this transition function
     * @param overTime animates over this amount of time
     * @param onFinished a possible callback when the animation has been finished
     */
    public animate1to0(callback: (value: number) => any, transition: ClassConstructor<Transition>, overTime: number, onFinished?: () => void): void {

        return this.animate0to1((val: number) => {
            callback(1 - val);
        }, transition, overTime, onFinished);
    }
}