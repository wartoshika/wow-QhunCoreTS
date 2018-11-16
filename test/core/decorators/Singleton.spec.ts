import { Singleton, SingletonClass } from "../../../src/core/decorators/Singleton";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite("@SingletonSpec") class SingletonSpec {

    @test "Can only be instantiated once"() {

        @Singleton()
        class TestClass { }

        const firstInstance = new TestClass();
        expect(firstInstance).to.be.an.instanceof(TestClass);

        // singleton marker should be set
        expect((TestClass as SingletonClass<any>).__singletonHasBeenCreated).to.equal(true);

        // second instance should throw
        expect(() => {

            new TestClass();
        }).to.throw();
    }

    @test "Can be used as constructing function"() {

        class TestClass { }
        const singletonConstructor = Singleton()(TestClass) as SingletonClass<any>;

        expect(new singletonConstructor()).to.be.an.instanceof(TestClass);

        // singleton marker should be set
        expect(singletonConstructor.__singletonHasBeenCreated).to.equal(true);

        // second constructing should fail
        expect(() => {
            new singletonConstructor()
        }).to.throw();
    }
}