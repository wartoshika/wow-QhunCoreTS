import { ReadonlyRepository } from "./ReadonlyRepository";

/**
 * a repository that allows read and write data from a data source
 */
export interface ReadAndWriteRepository<TargetClass = object, Identifier = any> extends ReadonlyRepository<TargetClass, Identifier> {

    /**
     * saves the given entity into the database backend
     * @param data the data to save
     */
    save(data: TargetClass): boolean;
}
