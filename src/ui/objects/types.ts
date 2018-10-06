interface HasBackground {

    /**
     * the background texture of the frame
     */
    __background?: WowTexture;
}

interface HasText {

    /**
     * the text instance of the frame
     */
    __text?: WowFontString;
}

/**
 * a wow frame with advances properties used by the framework
 */
export interface FrameWithAdvancesProperties extends
    AdvancedWowFrame<WowFrame, FrameWithAdvancesProperties>,
    HasBackground, HasText { }