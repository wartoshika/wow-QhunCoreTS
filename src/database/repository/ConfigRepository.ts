import { Repository } from "./Repository";
import { Database } from "../storage/Database";
import { AnyStringSignatureObject } from "../../core/types";
import { Logger } from "../../core/debug/Logger";
import { Injectable } from "../../core/decorators/Injectable";

/**
 * a repository that acts link a config getter and setter. optimal when using it for addon options with boolish oder string vars.
 */
@Injectable()
export class ConfigRepository<ConfigStructure extends AnyStringSignatureObject> implements Repository {

    constructor(
        private database: Database<ConfigStructure>,
        private logger: Logger
    ) { }

    /**
     * saves the given entity into the database backend
     * @param data the data to save
     */
    public save<T extends keyof ConfigStructure>(path: T, data: ConfigStructure[T]): boolean {

        try {
            const currentStorage = this.database.read();
            currentStorage[path] = data;

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
        return currentStorage[path];
    }

    /**
     * get the complete config object
     */
    public getAll(): ConfigStructure {

        return this.database.read();
    }

    /**
     * override the complete config
     * @param newConfig the config object that replaces the current one
     */
    public override(newConfig: ConfigStructure): boolean {

        try {

            // write the storage
            this.database.write(newConfig);
        } catch (e) {

            this.logger.error(`Error while overriding the current configuration. Error was: ${e}`);
            return false;
        }

        return true;
    }
}