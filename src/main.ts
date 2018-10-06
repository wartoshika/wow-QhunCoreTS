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
import { Promise } from "./core/async/Promise";
import { Timer } from "./core/async/Timer";

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
        private timer: Timer
    ) {

        observableFromEvent("PLAYER_TARGET_CHANGED").toPromise().done(data => {

            print("HERE", data);
        });
    }
}

bootstrapAddon(Addon);