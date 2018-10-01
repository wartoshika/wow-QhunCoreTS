/**
 * a database that uses the saved variables of an addon as datasource
 */
export class SavedVariablesDatabase<TargetType = object> {

    constructor(
        private variableName: string
    ) { }

    /**
     * read the complete saved variable
     */
    public read(): TargetType {

        return _G[this.variableName];
    }

    /**
     * overrides the complete data with the given data
     * @param data the data to save
     */
    public write(data: TargetType): void {

        _G[this.variableName] = data;
    }
}