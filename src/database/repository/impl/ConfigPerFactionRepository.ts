import { ConfigRepository } from "./ConfigRepository";
import { AnyStringSignatureObject, Logger, Injectable } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a config like repository that is shared with every character of the same faction (cross realm)
 */
@Injectable()
export class ConfigPerFactionRepository<ConfigStructure extends AnyStringSignatureObject> extends ConfigRepository<ConfigStructure> {

    constructor(
        database: SavedVariablesDatabase<ConfigStructure>,
        logger: Logger
    ) {

        super(database, logger, () => {
            return this.getDatabasePrefix();
        });
    }

    /**
     * get the faction based prefix
     */
    private getDatabasePrefix(): string {

        const [faction] = UnitFactionGroup("player");
        return faction;
    }
}