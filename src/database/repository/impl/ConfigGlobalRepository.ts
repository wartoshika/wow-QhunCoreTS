import { ConfigRepository } from "./ConfigRepository";
import { AnyStringSignatureObject, Logger, Injectable } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a config like repository that is shared with every character on your addount
 */
@Injectable()
export class ConfigGlobalRepository<ConfigStructure extends AnyStringSignatureObject> extends ConfigRepository<ConfigStructure> {

    constructor(
        database: SavedVariablesDatabase<ConfigStructure>,
        logger: Logger
    ) {

        super(database, logger, () => {
            return this.getDatabasePrefix();
        });
    }

    /**
     * get the global based
     */
    private getDatabasePrefix(): string {

        return "global";
    }
}