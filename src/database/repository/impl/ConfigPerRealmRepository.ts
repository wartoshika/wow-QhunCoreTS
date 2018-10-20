import { ConfigRepository } from "./ConfigRepository";
import { AnyStringSignatureObject, Logger, Injectable } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a config like repository that is shared with every character on the same realm
 */
@Injectable()
export class ConfigPerRealmRepository<ConfigStructure extends AnyStringSignatureObject> extends ConfigRepository<ConfigStructure> {

    constructor(
        database: SavedVariablesDatabase<ConfigStructure>,
        logger: Logger
    ) {

        super(database, logger, () => {
            return this.getDatabasePrefix();
        });
    }

    /**
     * get the realm based prefix
     */
    private getDatabasePrefix(): string {

        return GetRealmName();
    }
}