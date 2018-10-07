import { Injectable } from "../core/decorators/Injectable";
import { FrameWithAdvancesProperties } from "./types";

/**
 * A class that handles frame creation and uses an object pool to reduce resource costs
 * when creating a lot of frames.
 */
@Injectable()
export class FrameManager {

    /**
     * the current frame pool that can be used to
     * create new frames
     */
    private framePool: WowFrame[] = [];

    /**
     * creates a new frame object or use a recycled one from the frame pool
     * @param name Name of the newly created frame. If nil, no frame name is assigned. The function will also set a global variable of this name to point to the newly created frame
     * @param parent the parent frame to append the frame to
     * @param inheritsFrame a comma-delimited list of names of virtual frames to inherit from (the same as in XML). If nil, no frames will be inherited. These frames cannot be frames that were created using this function, they must be created using XML with virtual="true" in the tag.
     * @param id ID to assign to the frame. See API Frame SetID
     */
    public create(name?: string, parent?: WowUiObject, inheritsFrame?: string, id?: number): WowFrame {

        let frame: WowFrame;
        if (this.framePool.length > 0) {

            // use the frame pool
            const recycled = this.framePool.slice(0, 1);
            frame = recycled[0];
        } else {

            // pool empty, create a new frame
            frame = CreateFrame("Frame", name, parent, inheritsFrame, id);
        }

        return frame;
    }

    /**
     * recycles the given frame and remove all unnessesary properties
     * @param frame the frame to recycle
     */
    public recycle(frame: FrameWithAdvancesProperties): void {

        // remove children
        const [...children] = frame.GetChildren();
        children.forEach(child => {

            // recycle child when it is a frame
            if (this.objectIsWowFrame(child)) {

                this.recycle(child);
            }
        });

        // remove point and other metadata
        frame.ClearAllPoints();
        frame.EnableKeyboard(false);
        frame.EnableMouse(false);
        frame.EnableMouseWheel(false);
        frame.UnregisterAllEvents();
        frame.SetFrameStrata("MEDIUM")
        frame.SetFrameLevel(0);
        frame.Hide();

        // remove known properties
        if (frame.__background) { delete frame.__background; }
        if (frame.__text) { delete frame.__text; }

        // push the object into the recycled frame pool
        this.framePool.push(frame);
    }

    /**
     * check if the given object is a WowFrame
     * @param obj the object to check
     */
    private objectIsWowFrame(obj: WowUiObject): obj is WowFrame {

        return typeof (obj as WowFrame).SetFrameLevel === "function";
    }
}