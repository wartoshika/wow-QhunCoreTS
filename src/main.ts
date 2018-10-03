import { QhunAddon, TocValue, DebugChatWindow, Logger } from "./core";
import { bootstrapAddon } from "./bootstrap";
import { Locale, TranslationRegistry, Translator } from "./locale";

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

        logger.info("HELLO INFO!");
    }
}

bootstrapAddon(Addon);