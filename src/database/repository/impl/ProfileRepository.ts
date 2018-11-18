import { CrudRepository } from "../CrudRepository";
import { DatabaseProfile } from "../../storage/DatabaseProfile";
import { Injectable, AnyStringSignatureObject } from "../../../core";
import { SavedVariablesDatabase } from "../../storage/SavedVariablesDatabase";

/**
 * a repository to query existing profiles or allow to create new ones
 */
@Injectable()
export class ProfileRepository<ConfigStructure extends AnyStringSignatureObject> extends CrudRepository<DatabaseProfile<ConfigStructure>, string> {

    constructor(
        database: SavedVariablesDatabase<AnyStringSignatureObject>,
    ) {
        super(database, "profile");
    }
}
