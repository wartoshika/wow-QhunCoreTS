import { RandomUtil } from "../../../src/core/util/RandomUtil";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class RandomUtilSpec {

    @test "RandomUtil.randomBetween()"() {

        // some retries to make sure random is in the correct zone
        const generateNumbers = 10;
        const randomNumberStack: number[] = [];
        for (let i = 0; i < generateNumbers; i++) {
            randomNumberStack.push(RandomUtil.randomBetween(5, 10));
        }
        randomNumberStack.forEach(val => {
            expect(val).to.be.greaterThan(4).and.to.be.lessThan(11);
        });
        expect(randomNumberStack.length).to.equal(generateNumbers);
    }

    @test "RandomUtil.uuid()"() {

        // some retries to make sure random generates some uuid
        const generateUUids = 10;
        const randomUUIDStack: string[] = [];
        for (let i = 0; i < generateUUids; i++) {
            randomUUIDStack.push(RandomUtil.uuid());
        }
        randomUUIDStack.forEach(uuid => {

            expect(uuid.length).to.equal(36);
            expect(uuid).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
        });
        expect(randomUUIDStack.length).to.equal(generateUUids);
    }
}