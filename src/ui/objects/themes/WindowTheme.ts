export declare type RGBTuple = [number, number, number];
export declare type RGBATuple = [number, number, number, number];

export interface WindowTheme {

    /**
     * the main background color of the window
     */
    backgroundColor: RGBATuple;

    /**
     * the normal state text color
     */
    textColor: RGBTuple;

    /**
     * all title bar related themeing
     */
    titleBar: {

        /**
         * background color of the title bar
         */
        backgroundColor: RGBATuple,

        /**
         * the title bar text color
         */
        titleTextColor: RGBTuple,

        /**
         * the background color when the mouse cursor is over an action button
         */
        actionButtonTheme: ActionButtonTheme,

        /**
         * a seperate color for the close button hover state
         */
        closeActionButtonTheme: ActionButtonTheme
    };

    /**
     * all normal created action buttons
     */
    actionButton: ActionButtonTheme;
}

/**
 * all action button related themeing
 */
export interface ActionButtonTheme {

    /**
     * the text color of clickable action buttons
     */
    textColor: RGBTuple;

    /**
     * the normal state background color of the action button
     */
    backgroundColor: RGBATuple;

    /**
     * the background color of the button when hovering
     */
    hoverBackgroundColor: RGBATuple;
}
