import { ConfigRepository } from "./ConfigRepository";
import { AnyStringSignatureObject, Logger, Injectable } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a config like repository that is shared between characters of the same class
 */
@Injectable()
export class ConfigPerClassRepository<ConfigStructure extends AnyStringSignatureObject> extends ConfigRepository<ConfigStructure> {

    constructor(
        database: SavedVariablesDatabase<ConfigStructure>,
        logger: Logger
    ) {

        super(database, logger, () => {
            return this.getDatabasePrefix();
        });
    }

    /**
     * get the class id based prefix
     */
    private getDatabasePrefix(): string {

        const [, , classId] = UnitClass("player");
        return `classId-${classId}`;
    }
}
