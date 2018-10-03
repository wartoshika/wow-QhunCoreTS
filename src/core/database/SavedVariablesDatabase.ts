import { Database } from "./Database";

/**
 * a database that uses the saved variables of an addon as datasource
 */
export class SavedVariablesDatabase<TargetType = object> implements Database<TargetType> {

    constructor(
        private variableName: string
    ) { }

    public read(): TargetType {

        return _G[this.variableName];
    }

    public write(data: TargetType): void {

        _G[this.variableName] = data;
    }
}