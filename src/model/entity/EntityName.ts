/**
 * a wrapper class for a player name that contains a name and the realm of the entity
 */
export class EntityName {

    /**
     * @param name the complete player name with optional realm suffix
     * @param realm the realm of the entity
     */
    constructor(
        private name: string,
        private realm?: string
    ) {

        // check if realm could be fetched from the given name
        if (!this.realm || typeof this.realm === "string" && this.realm.length === 0) {
            this.realm = GetRealmName();
        }
    }

    /**
     * get the name of the player
     */
    public getName(): string {
        return this.name;
    }

    /**
     * get the realm name of the player
     */
    public getRealm(): string {
        return this.realm;
    }

    /**
     * returns the name with realm of the player
     * @param divideCharacter an optional divide character to seperate name and realm
     */
    public getFullName(divideCharacter = "-"): string {
        return `${this.getName()}${divideCharacter}${this.getRealm()}`;
    }
}