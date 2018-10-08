import { Locale } from "./locale/Locale";
import { QhunAddon } from "./core/decorators/QhunAddon";
import { DebugChatWindow } from "./core/debug/DebugChatWindow";
import { TocValue } from "./core/decorators/TocValue";
import { bootstrapAddon } from "./bootstrap";

interface MyTranslation extends Locale {
    firstKey: {
        key: string
    },
    secondKey: void
}

@QhunAddon({
    embed: true,
    addonName: "QhunCoreTS",
    debugger: {
        instance: DebugChatWindow,
        data: "AddonDebug"
    }
})
class Addon {

    @TocValue("Title")
    private name: string;

    constructor() {

        C_ChatInfo.SendAddonMessage("prefix", "text", "PARTY");
    }
}

bootstrapAddon(Addon);