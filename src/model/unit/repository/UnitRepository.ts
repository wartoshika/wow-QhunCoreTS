import { Unit } from "../Unit";
import { UnitName } from "../UnitName";
import { ReadonlyRepository } from "../../../core/database/repository/ReadonlyRepository";

/**
 * a readonly repository to find entities by its unit id
 */
export class UnitRepository implements ReadonlyRepository<Unit, WowUnitId> {

    public find(identifier: WowUnitId): Unit | null {

        // does the entity exists?
        if (!UnitExists(identifier)) {
            return null;
        }

        // search by identifier
        let [className, classId, raceName, raceId, gender, name, realm] = GetPlayerInfoByGUID(UnitGUID(identifier));

        // npc name check
        if (name === undefined) {
            name = GetUnitName(identifier, false);
        }

        // build the entity
        const entity = new Unit();

        // fill the data
        return entity.setPrimaryKey(identifier)
            .setClass(classId)
            .setClassLocalized(className)
            .setRace(raceId)
            .setRaceLocalized(raceName)
            .setGender(gender)
            .setName(new UnitName(name, realm))
    }

    public findAll(): Unit[] {

        // look up all those entities
        return (["player", "party1", "party2", "party3", "party4", "target"] as WowUnitId[])
            .map(id => this.find(id));
    }
}