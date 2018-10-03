import { Locale } from "./locale/Locale";
import { QhunAddon } from "./core/decorators/QhunAddon";
import { DebugChatWindow } from "./core/debug/DebugChatWindow";
import { TocValue } from "./core/decorators/TocValue";
import { TranslationRegistry } from "./locale/TranslationRegistry";
import { Translator } from "./locale/Translator";
import { Logger } from "./core/debug/Logger";
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

    constructor(
        private registry: TranslationRegistry<MyTranslation>,
        private translator: Translator<MyTranslation>,
        private logger: Logger
    ) {

    }
}

bootstrapAddon(Addon);