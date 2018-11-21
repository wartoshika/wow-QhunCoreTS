import { Color } from "../../../src/core/util/Color";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class ColorSpec {

    @test "Colors are accessable"() {

        expect(Object.keys(Color).length).to.be.greaterThan(50);
    }

    @test "Class colors are available"() {

        const classColors = [
            "DEATH_KNIGHT", "DAEMON_HUNTER", "DRUID", "HUNTER",
            "MAGE", "MONK", "PALADIN", "PRIEST", "ROGUE", "SHAMAN",
            "WARLOCK", "WARRIOR"
        ];

        expect(Object.keys(Color).filter(name => {
            return classColors.indexOf(name) > -1;
        }).length).to.equal(classColors.length);
    }

    @test "Reset color is available"() {

        expect(Color.RESET).to.equal("|r");
    }
}