/**
 * a wrapper class for a unit name that contains a name and the realm of the unit
 */
export class UnitName {

    /**
     * @param name the name of the unit
     * @param realm the realm of the unit
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
     * get the name of the unit
     */
    public getName(): string {
        return this.name;
    }

    /**
     * get the realm name of the unit
     */
    public getRealm(): string {
        return this.realm;
    }

    /**
     * returns the name with realm of the unit
     * @param divideCharacter an optional divide character to seperate name and realm
     */
    public getFullName(divideCharacter = "-"): string {
        return `${this.getName()}${divideCharacter}${this.getRealm()}`;
    }
}
