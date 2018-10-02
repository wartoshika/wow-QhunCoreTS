/**
 * a repository that allows only read access to a data source
 */
export interface ReadonlyRepository<TargetClass = object, Identifier = any> {

    /**
     * finds an entity by its identifier
     * @param Identifier the identifier to search for
     */
    find(Identifier: Identifier): TargetClass | null;

    /**
     * finds all entities in this repository
     */
    findAll(): TargetClass[];
}