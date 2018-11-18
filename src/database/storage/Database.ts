import { Serialized } from "../../core/data/Serialized";

export interface Database<TargetType extends object> {

    /**
     * read all entries from the database
     */
    read(): Serialized<TargetType>;

    /**
     * write the given data set into the database
     * @param data the data to save
     */
    write(data: TargetType): void;
}
