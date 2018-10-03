import { Unit } from "./Unit";

/**
 * an abstraction layer for npc.
 */
export class NPC extends Unit {

    /**
     * casts an entity to a player instance
     * @param entity the entity to get the information from
     */
    public static fromUnit(entity: Unit): NPC {

        // check if this is castable
        if (!entity.isPlayer()) {
            throw `Given Entity[${entity.getPrimaryKey()}] could not be casted to a NPC instance. Entity is not a NPC!`;
        }

        return new NPC()
            .setPrimaryKey(entity.getPrimaryKey())
            .setClass(entity.getClass())
            .setClassLocalized(entity.getClassLocalized())
            .setRace(entity.getRace())
            .setRaceLocalized(entity.getRaceLocalized())
            .setGender(entity.getGender())
            .setName(entity.getName());
    }
}