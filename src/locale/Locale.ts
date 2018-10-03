/**
 * the base locale structure
 */
export type Locale = {
    [key: string]: { [variableName: string]: string | number } | void
}

/**
 * the dictionary type of a locale storage
 */
export type LocaleDictionary<T extends Locale> = {
    [P in keyof T]: T[P]
}

/**
 * the dictionary content of a locale storage
 */
export type LocaleDictionaryContent<T extends Locale> = {
    [P in keyof T]: string
}