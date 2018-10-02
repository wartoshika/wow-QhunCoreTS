import { Entity } from "./Entity";
import { EntityClass } from "./EntityClass";
import { EntityRace } from "./EntityRace";
import { EntityGender } from "./EntityGender";
import { EntityName } from "./EntityName";

export class Unit extends Entity {

    /**
     * the class of the entity
     */
    private class: EntityClass;

    /**
     * the localized name of the class
     */
    private classLocalizedName: string;

    /**
     * the race of the entity
     */
    private race: EntityRace;

    /**
     * the localized name of the race
     */
    private raceLocalizedName: string;

    /**
     * the gender of the entity
     */
    private gender: EntityGender;

    /**
     * the name and realm of the player
     */
    private name: EntityName;

    /**
     * @param unitId the unit id to look up the unit
     */
    constructor(
        unitId: WowUnitId
    ) {
        super(UnitGUID(unitId));

        // get data about this player
        let [className, classId, raceName, raceId, gender, name, realm] = GetPlayerInfoByGUID(this.guid);

        // check if the name could be get
        if (!name) {
            name = GetUnitName(unitId, true);
        }

        // set all data
        this.class = classId;
        this.classLocalizedName = className;
        this.race = raceId;
        this.raceLocalizedName = raceName;
        this.gender = gender;
        this.name = new EntityName(name, realm);
    }

    /**
     * tests if the given unit exists
     * @param unitId the unit id to test
     */
    public static exists(unitId: WowUnitId): boolean {

        return !!GetUnitName(unitId, false);
    }

    /**
     * get the class of the entity
     */
    public getClass(): EntityClass {
        return this.class;
    }

    /**
     * get the localized class name of the entity
     */
    public getClassLocalized(): string {
        return this.classLocalizedName;
    }

    /**
     * get the race of the entity
     */
    public getRace(): EntityRace {
        return this.race;
    }

    /**
     * get the localized race name of the entity
     */
    public getRaceLocalized(): string {
        return this.raceLocalizedName;
    }

    /**
     * get the gender of the entity
     */
    public getGender(): EntityGender {
        return this.gender;
    }

    /**
     * get the name of the entity
     */
    public getName(): EntityName {
        return this.name;
    }
}