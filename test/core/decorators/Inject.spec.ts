import { Inject } from "../../../src/core/decorators/Inject";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { Injectable } from "../../../src/core/decorators/Injectable";

@suite("@InjectSpec") class InjectSpec {

    @test "Can inject a dependency into a class property"() {

        @Injectable()
        class Dependency { }

        class TestClass {

            @Inject(Dependency)
            public dep: Dependency
        }

        const inst = new TestClass();
        expect(inst.dep).to.be.an.instanceof(Dependency);
    }
}