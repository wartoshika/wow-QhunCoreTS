import { RGBATuple, RGBTuple } from "./themes/WindowTheme";
import { FrameWithAdvancesProperties } from "./types";
import { TableUtil } from "../../util/TableUtil";

export class WindowUtils {

    /**
     * set the background color of the given frame to the given color
     * @param frame the frame
     * @param color the background color
     */
    public static setBackgroundColor(frame: FrameWithAdvancesProperties, color: RGBATuple): void {

        if (!frame.__background) {
            const colorTexture = frame.CreateTexture(null, "BACKGROUND");

            // set point on parent frame
            colorTexture.SetPoint("TOPLEFT", frame, "TOPLEFT");
            colorTexture.SetWidth(frame.GetWidth());
            colorTexture.SetHeight(frame.GetHeight());

            // save the color texture on the object
            frame.__background = colorTexture;
        }

        // set color
        frame.__background.SetColorTexture(...color);
    }

    /**
     * set the size for this and known sub frames
     * @param frame the frame to set the size for
     * @param width the target width
     * @param height the target height
     */
    public static setFrameSize(frame: FrameWithAdvancesProperties, width: number, height: number): void {

        // set the normal frame size
        frame.SetSize(width, height);

        // background?
        if (frame.__background) {
            frame.__background.SetSize(width, height);
        }

        // text?
        if (frame.__text) {
            frame.__text.SetSize(width, height);
        }
    }

    /**
     * set all font string related options with best default values
     * @param fontString the font string instance
     * @param options the options to use
     */
    public static setFontStringSettings(fontString: WowFontString, options: {
        color?: RGBTuple,
        size?: number,
        fontFamily?: string,
        fontFlags?: FontInstanceFlags[]
    }): void {

        // fill default
        options = TableUtil.fillTableDefault(options, {
            color: [1, 1, 1],
            size: 11,
            fontFamily: "Fonts\\\\FRIZQT__.TTF",
            fontFlags: []
        });

        // set data
        fontString.SetTextColor(...options.color);
        fontString.SetFont(options.fontFamily, options.size, options.fontFlags.join(", ") as FontInstanceFlags);
    }
}