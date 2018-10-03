export interface Database<TargetType> {

    /**
     * read all entries from the database
     */
    read(): TargetType;

    /**
     * write the given data set into the database
     * @param data the data to save
     */
    write(data: TargetType): void;
}