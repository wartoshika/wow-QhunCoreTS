/**
 * a repository that allows only read access to a data source
 */
export interface ReadonlyRepository<TargetClass = object, Identifier = any> {

    find(Identifier: Identifier): TargetClass;

    findAll(): TargetClass[];
}