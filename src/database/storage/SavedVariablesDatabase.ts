import { Database } from "./Database";
import { Injectable } from "../../core/decorators/Injectable";
import { DatabaseModuleConfig } from "../decorators/DatabaseModuleConfig";
import { Serialized } from "../../core/data/Serialized";

/**
 * a database that uses the saved variables of an addon as datasource
 */
@Injectable()
export class SavedVariablesDatabase<TargetType extends object = object> implements Database<TargetType> {

    constructor(
        @DatabaseModuleConfig("savedVariableName", true) private variableName: string
    ) { }

    public read(): Serialized<TargetType> {

        return _G[this.variableName] || {};
    }

    public write(data: TargetType): void {

        _G[this.variableName] = data;
    }
}
