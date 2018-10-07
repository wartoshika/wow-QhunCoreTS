import { TitleBar, TitleBarOptions } from "./TitleBar";
import { TableUtil } from "../../util/TableUtil";
import { WindowTheme } from "./themes/WindowTheme";
import { QhunDarkTheme } from "./themes/QhunDarkTheme";
import { WindowUtils } from "./WindowUtils";
import { HasNativeFrame } from "./HasNativeFrame";
import { Omit } from "../../core/types";
import { FrameLevel } from "../FrameLevel";
import { FrameManager } from "../FrameManager";
import { Inject } from "../../core/decorators/Inject";
import { Animation } from "../decorator/Animation";
import { EaseInOut } from "../animation/transition/EaseInOut";

/**
 * wraps up all possible options of a created window element
 */
export interface WindowOptions {

    /**
     * the width of the window in pixel
     * @default: 250
     */
    width?: number;

    /**
     * the height of the window in pixel
     * @default: 100
     */
    height?: number;

    /**
     * the title of the window
     * @default: "New Window - QhunCoreTS"
     */
    title?: string | TitleBar | Omit<TitleBarOptions, "movingWindow">;

    /**
     * the footer text of the window
     * @default: null
     */
    footer?: string;

    /**
     * the theme that should be applied on the whole window object
     * @default: QhunDarkTheme
     */
    theme?: WindowTheme;

    /**
     * a flag that controls if mouse events will received by this window
     * @default: true
     */
    interactable?: boolean;

    /**
     * a flag that controls if the window is movable.
     * **interactable must be true** in order to use movable!
     * @default: true
     */
    movable?: boolean;
}

/**
 * a window like ui element to place other ui element on
 */
@Animation({
    showAnimation: {
        transition: EaseInOut,
        time: 200
    },
    hideAnimation: {
        transition: EaseInOut,
        time: 200
    }
})
export class Window implements HasNativeFrame {

    @Inject(FrameManager)
    private frameManager: FrameManager;

    /**
     * the current parent frame
     */
    private parentFrame: WowFrame;

    /**
     * the outer main frame of this window
     */
    private mainFrame: WowFrame;

    /**
     * all window options
     */
    private options: Required<WindowOptions & { title: TitleBar }>

    /**
     * @param options all initial options of this window
     */
    constructor(
        options?: WindowOptions
    ) {

        // build the frame
        this.mainFrame = this.frameManager.create();
        this.mainFrame.SetFrameStrata("HIGH");
        this.mainFrame.SetFrameLevel(FrameLevel.WINDOW);

        // "bootstrap" this created window
        this.bootstrapWindow(TableUtil.fillTableDefault(options, {
            width: 250,
            height: 100,
            title: "New Window - QhunCoreTS",
            footer: null,
            theme: QhunDarkTheme,
            interactable: true,
            movable: true
        }));
    }

    /**
     * appends this window to a given parent frame object
     * @param parentFrame the parent frame to append this window to
     */
    public append(parentFrame: Window | WowFrame): void {

        if (parentFrame instanceof Window) {

            this.mainFrame.SetPoint("CENTER", parentFrame.getParent(), "CENTER", 0, 0);
        } else {

            this.mainFrame.SetPoint("CENTER", parentFrame, "CENTER", 0, 0);
        }
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
     * get the parent frame
     */
    protected getParent(): WowFrame {

        return this.parentFrame;
    }

    /**
     * applies all positioning and theaming based properties
     */
    private bootstrapWindow(options: WindowOptions): void {

        // set base options
        this.mainFrame.SetWidth(options.width);
        this.mainFrame.SetHeight(options.height);
        WindowUtils.setBackgroundColor(this.mainFrame, options.theme.backgroundColor);
        this.mainFrame.EnableMouse(options.interactable);
        this.mainFrame.EnableMouseWheel(options.interactable);

        // set title
        let titleBar: TitleBar;
        if (this.isOptionTitleAnInstance(options.title)) {

            // append the frame to the window frame
            titleBar = options.title;
        } else if (this.isOptionTitleAnObject(options.title)) {

            // create a new title bar instance
            options.title.width = options.title.width || options.width;
            options.title.movingWindow = options.title.movingWindow || this;
            titleBar = new TitleBar(options.title);
        } else {

            // create a normal text based title
            titleBar = new TitleBar({
                titleText: options.title as string,
                theme: options.theme,
                width: options.width,
                movingWindow: this
            });
        }

        // set movable
        if (options.interactable && options.movable) {
            this.mainFrame.SetMovable(true);
        }

        // append the title bar frame to the window frame
        const titleBarFrame: WowFrame = titleBar.getNativeFrame();
        titleBarFrame.SetPoint("TOPLEFT", this.mainFrame, "TOPLEFT", 0, 0);
        WindowUtils.setFrameSize(titleBarFrame, this.mainFrame.GetWidth(), titleBarFrame.GetHeight());

        // set the title bar instance on the options
        options.title = titleBar;

        // apply options to the instance
        this.options = options as any;
    }

    /**
     * check if the given title is an instance of TitleBar
     * @param title the title var to check
     */
    private isOptionTitleAnInstance(title: string | TitleBar | Omit<TitleBarOptions, "movingWindow">): title is TitleBar {

        return ((typeof title) as string) === "table" && title instanceof TitleBar;
    }

    /**
     * check if the given title is an option object
     * @param title the title var to check
     */
    private isOptionTitleAnObject(title: string | TitleBar | Omit<TitleBarOptions, "movingWindow">): title is TitleBarOptions {

        return ((typeof title) as string) === "table" && typeof (title as TitleBarOptions).titleText === "string";
    }
}