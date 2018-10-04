import { Locale } from "./locale/Locale";
import { QhunAddon } from "./core/decorators/QhunAddon";
import { DebugChatWindow } from "./core/debug/DebugChatWindow";
import { TocValue } from "./core/decorators/TocValue";
import { TranslationRegistry } from "./locale/TranslationRegistry";
import { Translator } from "./locale/Translator";
import { Logger } from "./core/debug/Logger";
import { bootstrapAddon } from "./bootstrap";
import { observableFromEvent } from "./core/async/rx/from/observableFromEvent";
import { MultiReturn } from "./util/MultiReturn";
import { Reflector } from "./core/di/Reflector";

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

    constructor(
        private registry: TranslationRegistry<MyTranslation>,
        private translator: Translator<MyTranslation>,
        private logger: Logger
    ) {

        observableFromEvent("PLAYER_EQUIPMENT_CHANGED")
            .map(data => {
                const a = MultiReturn.extractObjects(data, 2, ["inventoryId", "flag"])
                return a[0];
            })
            .filter(data => {
                return !data.flag;
            }).subscribe(data => {

                print(`equipped ${data.inventoryId}`);
            });
    }
}

bootstrapAddon(Addon);