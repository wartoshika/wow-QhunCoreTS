import { Injectable } from "../../decorators";
import { SavedVariablesDatabase } from "../SavedVariablesDatabase";
import { ReadAndWriteRepository } from "./ReadAndWriteRepository";
import { EntityHasPrimaryKey } from "./EntityHasPrimaryKey";

/**
 * a read and write repository of over an array of records of the save type.
 */
export abstract class CrudRepository<TargetClass extends EntityHasPrimaryKey = EntityHasPrimaryKey, Identifier = any> implements ReadAndWriteRepository<TargetClass, Identifier> {

    constructor(
        private database: SavedVariablesDatabase<TargetClass[]>
    ) { }

    public findAll(): TargetClass[] {
        return this.database.read();
    }

    public find(id: Identifier): TargetClass {
        return this.database.read()
            .filter(record => record.getPrimaryKey() === id)[0];
    }

    public save(data: TargetClass): boolean {
        this.database.write(this.database.read().map(record => {
            if (record.getPrimaryKey() === data.getPrimaryKey()) {
                return data;
            }
            return record;
        }));
        return true;
    }
}