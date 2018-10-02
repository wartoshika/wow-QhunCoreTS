import { UIObject } from "../UIObject";
import { UIEditBox } from "../UIEditBox";

/**
 * a class that wrapps frames to allow parsing lexal contexts in a protected zone. this will also
 * trigger a change detection cycle when bound values have been changed.
 */
export class Zone {

    /**
     * a flat stack of every observable frame
     */
    private flatObservableFrameStack: UIObject[] = [];

    /**
     * @param frameStack the frames to observe in the protected zone
     */
    constructor(
        frameStack: UIObject[]
    ) {

        // start analyze and flat the current frame stack
        this.analyzeStack(frameStack);

        print(`found ${this.flatObservableFrameStack.length} frames`);
    }

    /**
     * analyzes the given stack and flats all child elements to an observable
     * frame stack.
     */
    private analyzeStack(stack: UIObject[]) {

        const addToObservableStack = (frame: UIObject) => {
            if (this.isObservableFrame(frame)) {
                this.flatObservableFrameStack.push(frame);
            }
        };

        stack.forEach(frame => {

            // check add to observables
            addToObservableStack(frame);

            // get all children of the frame
            const [...children] = frame.GetChildren();

            // check for deeper analyzis
            if (children.length > 0) {

                this.analyzeStack(children as UIObject[]);
            }
        });
    }

    /**
     * check if the given frame is observable by the zone
     * @param frame the frame to check
     */
    private isObservableFrame(frame: UIObject): boolean {

        return (
            typeof (frame as UIEditBox).GetText === "function"
        );
    }
}
