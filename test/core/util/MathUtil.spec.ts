import { MathUtil } from "../../../src/core/util/MathUtil";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class MathUtilSpec {

    @test "MathUtil.round()"() {

        expect(MathUtil.round(1, 0)).to.equal(1);
        expect(MathUtil.round(1, 5)).to.equal(1);

        // round half down
        expect(MathUtil.round(1.123456, 2)).to.equal(1.12);

        // round half up
        expect(MathUtil.round(1.987654, 2)).to.equal(1.99);

        // default param test
        expect(MathUtil.round(12.324)).to.equal(12.32);
    }

    @test "MathUtil.logBase()"() {

        expect(MathUtil.logBase(5, 2)).to.equal(2.321928094887362);
        expect(MathUtil.logBase(15, 8)).to.equal(1.3022968652028397);
    }

    @test "MathUtil.shorten()"() {

        expect(MathUtil.shorten(15000, 0, false, ["", "k"])).to.equal("15k");
        expect(MathUtil.shorten(15000, 0, true, ["", "k"])).to.equal("15 k");

        expect(MathUtil.shorten(150, 0, false, ["", "k"])).to.equal("150");
        expect(MathUtil.shorten(150.12345, 2, false, ["", "k"])).to.equal("150.12");

        expect(MathUtil.shorten(15000000, 0, false, ["", "k", "m"])).to.equal("15m");
        expect(MathUtil.shorten(15000000, 0, true, ["", "k", "m"])).to.equal("15 m");
        expect(MathUtil.shorten(157898789.98765, 3, true, ["", "k", "m"])).to.equal("157.899 m");

        // default param test
        expect(MathUtil.shorten(12493.43)).to.equal("12.49 K");
    }
}