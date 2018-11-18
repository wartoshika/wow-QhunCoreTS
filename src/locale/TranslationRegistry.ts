import { Locale, LocaleDictionaryContent } from "./Locale";
import { Injectable } from "../core/decorators/Injectable";

/**
 * The registry class to add different locales to your addon
 */
@Injectable()
export class TranslationRegistry<T extends Locale> {

    /**
     * the storage of translations
     */
    private storage: {
        [shortLocale: string]: LocaleDictionaryContent<T>
    } = {};

    /**
     * the current fallback language (if any)
     */
    private fallback: string;

    /**
     * add the given language to the dictionary
     * @param language the language name to add. should be two chars long!
     * @param data the data to add
     * @param isFallback a flag if this language is the fallback language
     */
    public addLanguage(language: string, data: LocaleDictionaryContent<T>, isFallback: boolean = false): void {

        this.storage[language] = data;

        // set fallback language if it was set
        if (isFallback) {
            this.fallback = language;
        }
    }

    /**
     * removes the given language from the dictionary
     * @param language the language name to remove. should be two chars long!
     */
    public removeLanguage(language: string): void {

        delete this.storage[language];
    }

    /**
     * set the given language as fallback
     * @param language the language name to set as fallback. should be two chars long!
     * @return true whenever the language exists and set be as fallback.
     */
    public setLanguageAsFallback(language: string): boolean {

        if (this.storage[language]) {
            this.fallback = language;
            return true;
        }

        return false;
    }

    /**
     * get the existing or fallback language as dictionary
     * @param language the language name to get. should be two chars long!
     */
    public getDictionary(language: string): LocaleDictionaryContent<T> | null {

        if (this.storage[language]) {
            return this.storage[language];
        } else if (this.fallback && this.storage[this.fallback]) {
            return this.storage[this.fallback];
        }

        // no dictionary found!
        return {} as LocaleDictionaryContent<T>;
    }
}
