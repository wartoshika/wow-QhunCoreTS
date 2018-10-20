import { ReadAndWriteRepository } from "./ReadAndWriteRepository";
import { EntityHasPrimaryKey } from "./EntityHasPrimaryKey";
import { AnyStringSignatureObject, ClassConstructor } from "../../core";
import { Database } from "../storage/Database";
import { Serialized } from "../../core/data/Serialized";

/**
 * a read and write repository of over an array of records of the save type.
 */
export abstract class CrudRepository<TargetClass extends EntityHasPrimaryKey = EntityHasPrimaryKey, Identifier = any> implements ReadAndWriteRepository<TargetClass, Identifier> {

    /**
     * the database prefix
     */
    private prefix: string;

    constructor(
        private database: Database<{ [index: string]: any[] }>,
        prefix: string | (() => string)
    ) {

        if (typeof prefix === "function") {
            this.prefix = prefix();
        } else {
            this.prefix = prefix;
        }

        // empty check
        if (!this.prefix || this.prefix.length === 0) {
            throw `The database prefix for CRUD repository must be set.`;
        }

        // init prefix if not exists
        const current = this.database.read();
        current[this.prefix] = current[this.prefix] || {} as any;
        this.database.write(current);
    }

    public findAll(): TargetClass[] {
        const current = this.database.read();
        return current[this.prefix].map(obj => this.instantiateExistingData(obj));
    }

    public find(id: Identifier): TargetClass {
        const current = this.database.read()
        return (current[this.prefix].map(obj => this.instantiateExistingData(obj)) as TargetClass[])
            .filter(record => record.getPrimaryKey() === id)[0];
    }

    public save(data: TargetClass): boolean {

        // lookup existing data
        const current = this.database.read();
        let foundExisting: boolean = false;

        // replace existing entity
        const mappedData = (current[this.prefix] as Serialized<TargetClass>[]).map(record => {

            // instantiate the existing data
            const recordInstance = this.instantiateExistingData(record);

            // search for the primary key
            if (recordInstance.getPrimaryKey && recordInstance.getPrimaryKey() === data.getPrimaryKey()) {
                
                // set found flag
                foundExisting = true;

                return this.serializeData(data);
            }
            return record;
        });

        // add the entity if none with that primary key has been found
        if (!foundExisting) {
            mappedData.push(this.serializeData(data));
        }

        // add with prefix
        current[this.prefix] = mappedData;

        // save the new data
        this.database.write(current);
        return true;
    }

    /**
     * instantiates a given raw datastream into its final class
     * @param data the data to instantiate
     */
    protected instantiateExistingData<T extends Serialized<TargetClass>>(data: T): TargetClass {

        // get the constructor of the serialized instance
        const constructor = QHUN_TRANSPILER_REQUIRE<ClassConstructor<TargetClass>>(data.__namespace, data.__className);

        // construct a new instance
        const instance = new constructor();

        // add all properties
        Object.keys(data).forEach(key => {

            (instance as AnyStringSignatureObject)[key] = data[key as keyof T];
        });

        return instance as TargetClass;
    }

    /**
     * serialize the given object
     * @param data the data to serialize
     */
    private serializeData(data: TargetClass): Serialized<TargetClass> {

        const serialized: Partial<Serialized<any>> = {
            __className: ((data as any).__index as ClassConstructor).__name as string,
            __namespace: ((data as any).__index as ClassConstructor).__namespace as string
        };

        // add properties
        Object.keys(data).forEach(key => {
            serialized[key] = data[key as keyof TargetClass];
        });

        return serialized as Serialized<TargetClass>;
    }
}