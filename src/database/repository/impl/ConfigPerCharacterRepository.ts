import { ConfigRepository } from "./ConfigRepository";
import { AnyStringSignatureObject, Logger, Injectable } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a config like repository that is unique for every character
 */
@Injectable()
export class ConfigPerCharacterRepository<ConfigStructure extends AnyStringSignatureObject> extends ConfigRepository<ConfigStructure> {

    constructor(
        database: SavedVariablesDatabase<ConfigStructure>,
        logger: Logger
    ) {

        super(database, logger, () => {
            return this.getDatabasePrefix();
        });
    }

    /**
     * get the char based prefix
     */
    private getDatabasePrefix(): string {

        return `${GetUnitName("player", false)}-${GetRealmName()}`;
    }
}
