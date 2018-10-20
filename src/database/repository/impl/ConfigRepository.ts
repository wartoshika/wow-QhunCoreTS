import { Repository } from "../Repository";
import { AnyStringSignatureObject } from "../../../core/types";
import { Logger } from "../../../core/debug/Logger";
import { Database } from "../../storage/Database";
import { DatabaseProfile } from "../../storage/DatabaseProfile";

/**
 * a repository that acts link a config getter and setter. optimal when using it for addon options with boolish oder string vars.
 */
export abstract class ConfigRepository<ConfigStructure extends AnyStringSignatureObject> implements Repository {

    /**
     * the database prefix
     */
    private prefix: string;

    constructor(
        protected database: Database<ConfigStructure>,
        protected logger: Logger,
        prefix: string | (() => string)
    ) {

        // prefix function validation
        if (typeof prefix === "function") {
            this.prefix = prefix();
        } else {
            this.prefix = prefix;
        }

        // empty check
        if (!this.prefix || this.prefix.length === 0) {
            throw `The database prefix for ConfigRepository must be set.`;
        }

        // init prefix if not exists
        const current = this.database.read();
        current[this.prefix] = current[this.prefix] || {};
        this.database.write(current);
    }

    /**
     * saves the given entity into the database backend
     * @param data the data to save
     */
    public set<T extends keyof ConfigStructure>(path: T, data: ConfigStructure[T]): boolean {

        try {
            const currentStorage = this.database.read();

            // write back
            currentStorage[this.prefix][path] = data;

            // write the storage
            this.database.write(currentStorage);
        } catch (e) {

            this.logger.error(`Error while writing to database at path ${path}. Error was: ${e}`);
            return false;
        }

        return true;
    }

    /**
     * get a config entry
     * @param identifier the identifier to search for
     */
    public get<T extends keyof ConfigStructure>(path: T): ConfigStructure[T] | null {

        const currentStorage = this.database.read();
        return currentStorage[this.prefix][path];
    }

    /**
     * get the complete config object
     */
    public getAll(): ConfigStructure {

        const current = this.database.read();
        return current[this.prefix];
    }

    /**
     * override the complete config
     * @param newConfig the config object that replaces the current one
     */
    public override(newConfig: ConfigStructure): boolean {

        try {

            // read current
            const currentStorage = this.database.read();

            // write the storage
            currentStorage[this.prefix] = newConfig;
            this.database.write(currentStorage);
        } catch (e) {

            this.logger.error(`Error while overriding the current configuration. Error was: ${e}`);
            return false;
        }

        return true;
    }

    /**
     * copies the existing configuration into a new database profile
     * @param newProfileName the new profile name
     */
    public copyToNewProfile(newProfileName: string): DatabaseProfile<ConfigStructure> {

        const current = this.database.read();
        return new DatabaseProfile(newProfileName, current[this.prefix]);
    }

    /**
     * set a prefix for reading and writing data into the given database. the database cursor will use this prefix to
     * seperate between different groups of data
     * @param prefix the prefix to use
     */
    protected setCursorPrefix(prefix: string): void {

        this.prefix = prefix || "";
    }
}