import { Unit } from "./Unit";

/**
 * an abstraction layer for player characters.
 */
export class Player extends Unit {

    /**
     * casts an entity to a player instance
     * @param entity the entity to get the information from
     */
    public static fromUnit(entity: Unit): Player {

        // check if this is castable
        if (!entity.isPlayer()) {
            throw new Error(`Given Entity[${entity.getPrimaryKey()}] could not be casted to a Player instance. Entity is not a player!`);
        }

        return new Player()
            .setPrimaryKey(entity.getPrimaryKey())
            .setClass(entity.getClass())
            .setClassLocalized(entity.getClassLocalized())
            .setRace(entity.getRace())
            .setRaceLocalized(entity.getRaceLocalized())
            .setGender(entity.getGender())
            .setName(entity.getName());
    }
}
