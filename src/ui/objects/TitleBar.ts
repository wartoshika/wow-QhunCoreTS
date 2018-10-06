import { TableUtil } from "../../util/TableUtil";
import { HasNativeFrame } from "./HasNativeFrame";
import { WindowTheme } from "./themes/WindowTheme";
import { QhunDarkTheme } from "./themes/QhunDarkTheme";
import { WindowUtils } from "./WindowUtils";
import { ActionButton, ActionButtonOptions } from "./ActionButton";

/**
 * wraps up all possible options of a title bar element
 */
export interface TitleBarOptions {

    /**
     * should the user be able to close this window with a close X button?
     * @default: true
     */
    hasCloseButton?: boolean;

    /**
     * possible action or menu buttons of the title bar
     * @default: []
     */
    actionButtons?: ActionButtonOptions[],

    /**
     * the visible title text of the titlebar (text is centered)
     * @default: "New Window - QhunCoreTS"
     */
    titleText: string;

    /**
     * the theme that the title bar should use
     * @default QhunDarkTheme
     */
    theme?: WindowTheme;

    /**
     * the height of the title bar frame in pixel
     * @default: 25
     */
    height?: number;

    /**
     * the width of the title bar frame in pixel
     */
    width?: number;
}

/**
 * A title object wich can be placed on a window
 */
export class TitleBar implements HasNativeFrame {

    /**
     * the main title bar frame
     */
    private mainFrame: WowFrame;

    /**
     * the close button frame if available
     */
    private closeButton: ActionButton;

    /**
     * all action button instances
     */
    private actionButtons: ActionButton[];

    /**
     * the title text font string instance
     */
    private titleText: WowFontString;

    /**
     * all title bar options
     */
    private options: Required<TitleBarOptions>;

    /**
     * @param options all initial options of the title bar
     */
    constructor(
        options?: TitleBarOptions
    ) {

        // create a new frame
        this.mainFrame = CreateFrame("Frame");
        this.mainFrame.SetFrameStrata("MEDIUM");

        // "bootstrap" the title bar
        this.bootstrapWindow(TableUtil.fillTableDefault(options, {
            hasCloseButton: true,
            actionButtons: [],
            titleText: "New Window - QhunCoreTS",
            theme: QhunDarkTheme,
            height: 25,
            width: 250
        }));
    }

    public getNativeFrame(): WowFrame {
        return this.mainFrame;
    }

    public getHeight(): number {
        return this.mainFrame.GetHeight()
    }

    public getWidth(): number {
        return this.mainFrame.GetWidth();
    }

    /**
     * bootstrap the title bar by applying all options
     * @param options the options to use as base
     */
    private bootstrapWindow(options: TitleBarOptions): void {

        // set size related options
        this.mainFrame.SetHeight(options.height);
        this.mainFrame.SetWidth(options.width);

        // set theme based options
        WindowUtils.setBackgroundColor(this.mainFrame, options.theme.titleBar.backgroundColor);

        // create action buttons
        this.createActionButtons(options);

        // add close button
        if (options.hasCloseButton) {

            this.createCloseButton(options);
        }

        // add title text
        this.createTitleText(options);

        this.options = options as Required<TitleBarOptions>;
    }

    /**
     * create all action buttons
     * @param options the current options
     */
    private createActionButtons(options: TitleBarOptions): void {

        // add action buttons
        let xOffset = 0;
        this.actionButtons = options.actionButtons.map(button => {

            // create a new action button
            return new ActionButton({
                theme: options.theme.titleBar.actionButtonTheme,
                text: button.text,
                height: options.height,
                callback: button.callback,
                width: "auto"
            });
        });
        this.actionButtons.forEach(button => {

            // set position for the button
            button.getNativeFrame().SetPoint("TOPLEFT", this.mainFrame, "TOPLEFT", xOffset, 0);

            // adjust xOffset
            xOffset += button.getWidth();
        });
    }

    /**
     * creates the close button
     * @param options the current options
     */
    private createCloseButton(options: TitleBarOptions): void {

        this.closeButton = new ActionButton({
            text: "X",
            callback: () => { },
            theme: options.theme.titleBar.closeActionButtonTheme
        });

        // add to window right
        this.closeButton.getNativeFrame().SetPoint("TOPRIGHT", this.mainFrame, "TOPRIGHT", 0, 0);
    }

    /**
     * create the title text
     * @param options the current options
     */
    private createTitleText(options: TitleBarOptions): void {

        // add title text
        this.titleText = this.mainFrame.CreateFontString(null, "ARTWORK");
        WindowUtils.setFontStringSettings(this.titleText, {
            size: 10,
            color: options.theme.titleBar.titleTextColor
        });
        this.titleText.SetText(options.titleText);

        // calculate the x offset
        let xOffset = 0;
        this.actionButtons.forEach(button => {
            xOffset += button.getWidth();
        });

        // set available text width
        const width = this.mainFrame.GetWidth() - xOffset - (this.closeButton ? this.closeButton.getWidth() : 0);
        print(width);
        this.titleText.SetWidth(width);
        this.titleText.SetHeight(this.mainFrame.GetHeight());

        // set position
        this.titleText.SetPoint("TOPLEFT", this.mainFrame, "TOPLEFT", xOffset, 0);
    }
}