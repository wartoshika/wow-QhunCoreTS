import { QhunAddon, TocValue } from "./core";
import { FrameManager } from "./ui/FrameManager";
import { Zone } from "./ui/zone/Zone";
import { bootstrapAddon } from "./bootstrap";

@QhunAddon({
    embed: true,
    addonName: "QhunCoreTS"
})
class Addon {

    @TocValue("Title")
    private name: string;

    constructor(
        private frameManager: FrameManager
    ) {

        const frame = this.frameManager.create("Frame", "hello");
        const button = this.frameManager.create("Button");
        this.frameManager.create("Button", "test", button);
        const z = new Zone([frame, button]);
    }
}

bootstrapAddon(Addon);