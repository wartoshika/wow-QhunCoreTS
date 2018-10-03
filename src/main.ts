import { QhunAddon, TocValue, fromEvent } from "./core";
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
    addonName: "QhunCoreTS"
})
class Addon {

    @TocValue("Title")
    private name: string;

    constructor(
        private registry: TranslationRegistry<MyTranslation>,
        private translator: Translator<MyTranslation>
    ) {

        this.registry.addLanguage("de", {
            firstKey: "erster _key_",
            secondKey: "asd"
        });
        this.registry.addLanguage("en", {
            firstKey: "first _key_",
            secondKey: "second"
        }, true);

        print(translator.translate("firstKey", {
            key: "test"
        }));
    }
}

bootstrapAddon(Addon);