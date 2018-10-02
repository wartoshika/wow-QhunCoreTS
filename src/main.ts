import { QhunAddon, TocValue, fromEvent } from "./core";
import { FrameManager } from "./ui/FrameManager";
import { Zone } from "./ui/zone/Zone";
import { bootstrapAddon } from "./bootstrap";
import { Player } from "./model/entity/Player";

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

        fromEvent("PLAYER_TARGET_CHANGED").subscribe(() => {

            if (Player.exists("target")) {
                const data = new Player("target");
                print(data.getName().getFullName());
            }
        });
    }
}

bootstrapAddon(Addon);