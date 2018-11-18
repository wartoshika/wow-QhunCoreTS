import { QhunAddon } from "../../../src/core/decorators/QhunAddon";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { Injectable } from "../../../src/core/decorators/Injectable";
import { PrepareClassDecorator } from "../../util/PrepareClassDecorator";
import { SingletonClass } from "../../../src/core/decorators/Singleton";

@suite("@QhunAddonSpec") class InjectSpec {

    @test "Can construct the main addon class"() {

        @Injectable()
        @PrepareClassDecorator(target => {
            target.__staticReflection = {
                constructor: []
            };
        })
        class Dependency { }

        @QhunAddon()
        @PrepareClassDecorator(target => {
            target.__staticReflection = {
                constructor: [Dependency]
            };
        })
        class TestClass {

            constructor(
                public dep?: Dependency
            ) { }
        }
        const inst = new TestClass();
        expect(inst.dep).to.be.an.instanceof(Dependency);
    }

    @test "Is always a @Singleton()"() {

        @QhunAddon()
        class TestClass { }

        new TestClass();
        expect((TestClass as SingletonClass<any>).__singletonHasBeenCreated).to.equal(true);
    }

    @test "Can accept a thisArg for ingame lua purpose"() {

        @Injectable()
        @PrepareClassDecorator(target => {
            target.__staticReflection = {
                constructor: []
            };
        })
        class Dependency { }

        @QhunAddon()
        @PrepareClassDecorator(target => {
            target.__staticReflection = {
                constructor: [Dependency]
            };
        })
        class TestClass {

            constructor(thisArg: object, public dep?: Dependency) { }
        }

        const inst = new TestClass({});
        expect(inst.dep).to.be.an.instanceof(Dependency);
    }
}