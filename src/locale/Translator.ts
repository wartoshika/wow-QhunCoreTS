import { TranslationRegistry } from "./TranslationRegistry";
import { Locale } from "./Locale";
import { KnownProperties, AnyStringSignatureObject } from "../core/types";

/**
 * a class that is capable of translating given identifier
 * to a locale string with optional lexal parsing
 */
export class Translator<T extends Locale> {

    /**
     * the current game client language
     */
    private gameClientLanguage: string;

    constructor(
        private registry: TranslationRegistry<T>
    ) {

        // one time call to the game client language
        this.gameClientLanguage = GetLocale().substr(0, 2);
    }

    /**
     * translates the given identifier
     * @param identifier the identifier to translate
     * @param data the variables that should be applied on the translated text
     */
    public translate<I extends keyof KnownProperties<T>>(identifier: I, data?: KnownProperties<T>[I]): string {

        // get the value from the dictionary
        let value: string = this.registry.getDictionary(this.gameClientLanguage)[identifier as keyof T];

        // check for null case
        if (value === null) {
            return `TRANSLATION_MISSING:${identifier}`;
        }

        // replace variables
        if (data) {
            Object.keys(data as object).forEach(key => {
                value = value.replace("_" + key + "_", tostring((data as AnyStringSignatureObject)[key]));
            });
        }

        return value;
    }
}