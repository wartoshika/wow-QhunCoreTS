import { UnitClass } from "./UnitClass";
import { UnitRace } from "./UnitRace";
import { UnitGender } from "./UnitGender";
import { UnitName } from "./UnitName";
import { EntityHasPrimaryKey } from "../../database/repository/EntityHasPrimaryKey";

/**
 * a base entity that has nessesary information about an entity wrapped in an object
 */
export class Unit implements EntityHasPrimaryKey {

    /**
     * the primery key as unit id
     */
    private unitId: WowUnitId;

    /**
     * the class of the entity
     */
    private class: UnitClass;

    /**
     * the localized name of the class
     */
    private classLocalizedName: string;

    /**
     * the race of the entity
     */
    private race: UnitRace;

    /**
     * the localized name of the race
     */
    private raceLocalizedName: string;

    /**
     * the gender of the entity
     */
    private gender: UnitGender;

    /**
     * the name and realm of the player
     */
    private name: UnitName;

    /**
     * get the unit id
     */
    public getPrimaryKey(): WowUnitId {
        return this.unitId;
    }

    /**
     * get ghe class of the entity
     */
    public getClass(): UnitClass {
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
    public getRace(): UnitRace {
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
    public getGender(): UnitGender {
        return this.gender;
    }

    /**
     * get the name of the entity
     */
    public getName(): UnitName {
        return this.name;
    }

    /**
     * get the unit id
     */
    public setPrimaryKey(key: WowUnitId): this {
        this.unitId = key;
        return this;
    }

    /**
     * get ghe class of the entity
     */
    public setClass(entityClass: UnitClass): this {
        this.class = entityClass;
        return this;
    }

    /**
     * get the localized class name of the entity
     */
    public setClassLocalized(className: string): this {
        this.classLocalizedName = className;
        return this;
    }

    /**
     * get the race of the entity
     */
    public setRace(race: UnitRace): this {
        this.race = race;
        return this;
    }

    /**
     * get the localized race name of the entity
     */
    public setRaceLocalized(raceName: string): this {
        this.raceLocalizedName = raceName;
        return this;
    }

    /**
     * get the gender of the entity
     */
    public setGender(gender: UnitGender): this {
        this.gender = gender;
        return this;
    }

    /**
     * get the name of the entity
     */
    public setName(name: UnitName): this {
        this.name = name;
        return this;
    }

    // ######################
    // additional functions
    // ######################

    /**
     * check if the entity is a player character
     */
    public isPlayer(): boolean {
        return UnitIsPlayer(this.unitId);
    }

    /**
     * check if the entity is a NPC
     */
    public isNPC(): boolean {
        return !this.isPlayer();
    }

    /**
     * Returns the unit's effective (scaled) level
     */
    public getLevel(): number {
        return UnitLevel(this.unitId);
    }

}