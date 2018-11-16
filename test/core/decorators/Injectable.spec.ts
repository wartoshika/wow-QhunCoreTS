import { Injectable } from "../../../src/core/decorators/Injectable";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { SingletonClass } from "../../../src/core/decorators/Singleton";
import { InjectableClass } from "../../../src/core/di/InjectableClass";

@suite("@InjectableSpec") class InjectableSpec {

    @test "Injectable can be instantiated"() {

        @Injectable()
        class TestClass { }

        const injectableInstance = new TestClass();
        expect(injectableInstance).to.be.an.instanceof(TestClass);
    }

    @test "Injectable is always a singleton"() {

        @Injectable()
        class TestClass { }

        // construct, singleton flag should now be set
        new TestClass();
        expect((TestClass as SingletonClass<any>).__singletonHasBeenCreated).to.equal(true);
    }

    @test "Injectable flag has been set"() {

        @Injectable()
        class TestClass { }

        // construct, singleton flag should now be set
        new TestClass();
        expect((TestClass as InjectableClass<any>).__injectable).to.equal(true);
    }
}