import { AnimationOptions } from "./decorator/Animation";

export interface HasBackground {

    /**
     * the background texture of the frame
     */
    __background?: WowTexture;
}

export interface HasText {

    /**
     * the text instance of the frame
     */
    __text?: WowFontString;
}

export interface HasAnimation {

    /**
     * animation data for this frame
     */
    __animation?: AnimationOptions
}

/**
 * a wow frame with advances properties used by the framework
 */
export interface FrameWithAdvancesProperties extends
    AdvancedWowFrame<WowFrame, FrameWithAdvancesProperties>,
    HasBackground, HasText, HasAnimation { }