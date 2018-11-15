import { Optional } from "../../../src/core/data/Optional";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class OptionalSpec {


    @test "Optional.of()"() {

        expect(Optional.of(1).getValue()).to.equal(1);
        expect(Optional.of("test").getValue()).to.equal("test");

        // object test
        const myObject = { key: "value", otherKey: { deep: true } };
        expect(Optional.of(myObject).getValue()).to.equal(myObject);

        // null check
        expect(Optional.of(null).getValue()).to.equal(null);
    }

    @test "Optional.empty()"() {

        expect(Optional.empty().getValue()).to.equal(null);
    }

    @test "Optional.getOrElse()"() {

        expect(Optional.of(1).getOrElse(2)).to.equal(1);
        expect(Optional.empty().getOrElse(2)).to.equal(2);

        // function provider test
        expect(Optional.of(1).getOrElse(() => 2)).to.equal(1);
        expect(Optional.empty().getOrElse(() => 2)).to.equal(2);
    }

    @test "Optional.isPresent()"() {

        expect(Optional.of(1).isPresent()).to.equal(true);
        expect(Optional.of(null).isPresent()).to.equal(false);
        expect(Optional.empty().isPresent()).to.equal(false);
    }

    @test "Optional.ifPresent()"() {

        let testValue: number;
        Optional.of(1).ifPresent(num => testValue = num);
        expect(testValue).to.equal(1);

        let testValue2: number;
        Optional.empty().ifPresent(num => testValue2 = num);
        expect(testValue2).to.equal(undefined);

        // return value of if present
        expect(Optional.of(1).ifPresent(num => num + 1)).to.equal(2);
    }

    @test "Optional.getOrThrow()"() {

        expect(() => {
            Optional.of(1).getOrThrow("error");
        }).to.not.throw();

        expect(() => {
            Optional.empty().getOrThrow("error");
        }).to.throw("error");
    }
}