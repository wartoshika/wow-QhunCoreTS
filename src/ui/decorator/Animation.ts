import { HasNativeFrame } from "../objects/HasNativeFrame";
import { ClassConstructor } from "../../core/types";
import { HasAnimation } from "../types";
import { AnimationOption } from "../animation/AnimationOption";
import { AnimationManager } from "../animation/AnimationManager";

/**
 * all possible animationm options
 */
export interface AnimationOptions {

    /**
     * the antimation that will pre present when showing the window
     * @default null
     */
    showAnimation?: AnimationOption | null;

    /**
     * the animation that will pre present when hiding the window
     * @default null
     */
    hideAnimation?: AnimationOption | null;
}

interface AnimationClass<T extends Object> extends ClassConstructor<T>, HasAnimation { }

/**
 * override the show function
 * @param nativeFrame the native frame
 */
const overrideShowFunction = (nativeFrame: WowFrame, animationManager: AnimationManager, options: AnimationOptions): void => {

    const originalNativeShow = nativeFrame.Show.bind(nativeFrame);
    nativeFrame.Show = () => {

        // show the frame
        originalNativeShow();

        // animate
        animationManager.animate0to1(
            (opacity: number) => {
                print("SET TO", opacity);
                nativeFrame.SetAlpha(opacity);
            },
            options.showAnimation.transition,
            options.showAnimation.time
        );
    };
};

/**
 * override the hide function
 * @param nativeFrame the native frame
 */
const overrideHideFunction = (nativeFrame: WowFrame, animationManager: AnimationManager, options: AnimationOptions): void => {

    const originalNativeHide = nativeFrame.Hide.bind(nativeFrame);
    nativeFrame.Hide = () => {

        // animate
        animationManager.animate1to0(
            (opacity: number) => {
                print("SET TO", opacity);
                nativeFrame.SetAlpha(opacity);
            },
            options.showAnimation.transition,
            options.showAnimation.time,
            () => {
                // hide the frame
                originalNativeHide();
            }
        );
    };
};

/**
 * A class decorator that adds animations or transition states the the class
 * @param options the animation options
 */
export function Animation(options: AnimationOptions) {

    return <ClassDecorator>(<Target extends HasNativeFrame>(target: AnimationClass<Target>) => {

        // save original constructor
        const originalConstructor = target.__init;

        // override the existing constructor and add the animation data to
        // the instance
        return (thisArg: HasNativeFrame, ...args: any[]) => {

            // construct the class
            originalConstructor(thisArg, ...args);

            // get the animation manager
            const animationManager = AnimationManager.getInstance();

            // add the animation property
            target.__animation = options;

            // override native frame show method
            const nativeFrame = thisArg.getNativeFrame();

            if (options.showAnimation) {
                overrideShowFunction(nativeFrame, animationManager, options);
            }
            if (options.hideAnimation) {
                overrideHideFunction(nativeFrame, animationManager, options);
            }
        };
    });
}