import { HasNativeFrame } from "./HasNativeFrame";
import { ActionButtonTheme } from "./themes/WindowTheme";
import { TableUtil } from "../../util/TableUtil";
import { QhunDarkTheme } from "./themes/QhunDarkTheme";
import { WindowUtils } from "./WindowUtils";
import { FrameWithAdvancesProperties } from "./types";

export interface ActionButtonOptions {

    /**
     * the theme that should be applied on action buttons
     * @default: QhunDarkTheme.actionButton
     */
    theme?: ActionButtonTheme,

    /**
     * the text that should be displayed on the button
     */
    text: string,

    /**
     * the width of the button. null means auto width
     * @default: "auto"
     */
    width?: number | "auto",

    /**
     * the height of the button
     * @default: 25
     */
    height?: number,

    /**
     * the function that will be executed if the button has been clicked
     */
    callback: (this: any, mouseButton?: WowMouseButton) => void
}

/**
 * a button like object with the possability to add a theme based object on it
 */
export class ActionButton implements HasNativeFrame {

    /**
     * the action button native frame
     */
    private mainFrame: FrameWithAdvancesProperties;

    /**
     * the button text native frame
     */
    private buttonText: WowFontString;

    /**
     * all options of the action button
     */
    private options: Required<ActionButtonOptions>;

    /**
     * @param options all initial options of the action button
     */
    constructor(
        options: ActionButtonOptions
    ) {

        // create the native frame
        this.mainFrame = CreateFrame("Frame");
        this.mainFrame.SetFrameStrata("HIGH");
        this.buttonText = this.mainFrame.CreateFontString(null, "ARTWORK");
        this.buttonText.SetAllPoints(this.mainFrame);

        // "bootstrap" the button
        this.bootstrapButton(TableUtil.fillTableDefault(options, {
            theme: QhunDarkTheme.actionButton,
            width: "auto",
            height: 25,
            text: options.text,
            callback: options.callback
        }));

        // set interactive
        this.setInteractive();
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
     * bootstraps this button with the given options
     * @param options the initial options to use
     */
    private bootstrapButton(options: ActionButtonOptions): void {

        // temp auto width var
        let hasAutoWidth: boolean = false;
        if (options.width === "auto") {
            hasAutoWidth = true;
            options.width = 50;
        }

        // set color
        WindowUtils.setBackgroundColor(this.mainFrame, options.theme.backgroundColor);
        WindowUtils.setFrameSize(this.mainFrame, options.width, options.height);

        // set font
        WindowUtils.setFontStringSettings(this.buttonText, {
            color: options.theme.textColor,
            size: 9
        });

        // set text to button
        this.buttonText.SetText(options.text);

        // apply auto width
        if (hasAutoWidth) {
            WindowUtils.setFrameSize(this.mainFrame, this.buttonText.GetStringWidth() + 10, options.height);
        }

        // save options
        this.options = options as Required<ActionButtonOptions>;
    }

    /**
     * set up all interactive things of the button
     */
    private setInteractive(): void {

        // hover style
        this.mainFrame.SetScript("OnEnter", button => {
            WindowUtils.setBackgroundColor(button, this.options.theme.hoverBackgroundColor);
        });
        this.mainFrame.SetScript("OnLeave", button => {
            WindowUtils.setBackgroundColor(button, this.options.theme.backgroundColor);
        });

        // click callback
        this.mainFrame.SetScript("OnMouseDown", (_, button) => {

            // execute the callback
            this.options.callback(button);
        });
    }
}