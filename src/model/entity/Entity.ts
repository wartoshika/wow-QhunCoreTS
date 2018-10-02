export abstract class Entity {

    /**
     * @param guid the unique unit id of the entity
     */
    constructor(
        protected readonly guid: WowGuid
    ) { }
}