import { UnitRepository } from "./UnitRepository";
import { Player } from "../Player";

/**
 * find player characters
 */
export class PlayerRepository extends UnitRepository {

    /**
     * finds all party members excluding the player
     */
    public findPartyMembers(): Player[] {

        // look up all those entities
        return (["party1", "party2", "party3", "party4"] as WowUnitId[])
            .map(id => this.find(id))
            .map(entity => Player.fromUnit(entity));
    }
}
