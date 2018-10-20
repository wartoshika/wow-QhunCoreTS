import { EntityHasPrimaryKey } from "../repository/EntityHasPrimaryKey";
import { AnyStringSignatureObject } from "../../core";

/**
 * a wrapper object for existing data that will be used to store as named profile
 */
export class DatabaseProfile<ConfigStructure extends AnyStringSignatureObject = AnyStringSignatureObject> implements EntityHasPrimaryKey {

    constructor(
        private profileName: string,
        private configData: ConfigStructure
    ) { }

    public getPrimaryKey(): string {
        return this.profileName;
    }

    /**
     * get the wrapped config object
     */
    public getConfig(): ConfigStructure {

        return this.configData;
    }
}