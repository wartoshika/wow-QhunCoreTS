import { UIObject } from "./UIObject";
import { UIFrame } from "./UIFrame";
import { UISlider } from "./UISlider";
import { UIEditBox } from "./UIEditBox";
import { UIButton } from "./UIButton";
import { AddonOption } from "../core/decorators/AddonOption";

/**
 * The frame manager handles the construction and destruction of visible frames.
 * It uses a frame pool to optimize memery usage.
 */
export class FrameManager {

    @AddonOption("addonName")
    private framePrefix: string;

    /**
     * the currently active frame stack
     */
    private activeFrameStack: UIObject[] = [];

    /**
     * all inactive or destructed frames that can be used to create new frames
     */
    private inactiveFrameStack: UIObject[] = [];

    /**
     * creates a new ui element by the given constructor
     * @param frameType the type of ui element to create
     * @param name if a name is given it will automaticly be prefixed!
     * @param parent the parent object where to inject the created frame
     */
    public create(frameType: "Frame", name?: string, parent?: UIObject): UIFrame
    public create(frameType: "Slider", name?: string, parent?: UIObject): UISlider
    public create(frameType: "EditBox", name?: string, parent?: UIObject): UIEditBox
    public create(frameType: "Button", name?: string, parent?: UIObject): UIButton
    public create(frameType: WowFrameType, name?: string, parent?: UIObject): UIObject {

        // prefix frame if nessesary
        if (typeof name === "string" && name.length > 0) {
            name = `${this.framePrefix}-${name}`;
        }

        // create frame via wow api
        const frame = CreateFrame(frameType, name, parent);

        // store frame as active
        this.activeFrameStack.push(frame);

        // return that created frame
        return frame;
    }

}