import { Injector } from "../../../src/core/di/Injector";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { ClassConstructor } from "../../../src/core/types";
import { InjectableClass } from "../../../src/core/di/InjectableClass";
import { Injectable } from "../../../src/core/decorators/Injectable";
import { PrepareClassDecorator } from "../../util/PrepareClassDecorator";

@Injectable()
class RequiredInjectableClass { }

// add reflection
(RequiredInjectableClass as InjectableClass).__staticReflection = {
    constructor: []
};

@suite class InjectorSpec {

    @test "Injector is injectable"() {

        expect((Injector as InjectableClass).__injectable).to.equal(true);
    }

    @test "Injector.getInstance() returns a valid injector instance"() {

        expect(Injector.getInstance()).to.be.an.instanceof(Injector);
    }

    @test "Injector can resolve a non neasted dependency"() {

        const injector = Injector.getInstance();

        class TestClass { }

        // add transpiler static reflection
        (TestClass as InjectableClass).__staticReflection = {
            constructor: [RequiredInjectableClass, "test"]
        };


        const resolved = injector.resolve(TestClass);
        expect(resolved[0]).to.be.an.instanceof(RequiredInjectableClass);
        expect(resolved[1]).to.equal("test");
    }

    @test "Injector must throw when resolving a class that is not @Injectable()"() {

        class NotInjectableClass { }
        (NotInjectableClass as InjectableClass).__staticReflection = {
            constructor: []
        };

        @Injectable()
        class TestClass { }
        (TestClass as InjectableClass).__staticReflection = {
            constructor: [NotInjectableClass]
        };

        // get injector
        const injector = Injector.getInstance();

        // resolve must throw
        expect(() => {

            injector.resolve(TestClass);
        }).to.throw();
    }

    @test "Injector can instantiate an injectable class"() {

        const injector = Injector.getInstance();

        @Injectable()
        class TestClass2 {
            constructor(
                private ric: RequiredInjectableClass
            ) { }

            public getRic(): RequiredInjectableClass {
                return this.ric;
            }
        }

        // add transpiler static reflection
        (TestClass2 as InjectableClass).__staticReflection = {
            constructor: [RequiredInjectableClass]
        };

        const instance = injector.instantiateClass(TestClass2);
        expect(instance).to.be.an.instanceof(TestClass2);
        expect(instance.getRic()).to.be.an.instanceof(RequiredInjectableClass);
    }

    @test "Injector must cache instances"() {

        let constructorCallCount: number = 0;

        @Injectable()
        class Dependency {

            constructor() {
                constructorCallCount++;
            }
        }
        (Dependency as InjectableClass).__staticReflection = { constructor: [] };

        @Injectable()
        class First {
            constructor(public dep: Dependency) { }
        }
        (First as InjectableClass).__staticReflection = {
            constructor: [Dependency]
        };

        @Injectable()
        class Second {
            constructor(public dep: Dependency) { }
        }
        (Second as InjectableClass).__staticReflection = {
            constructor: [Dependency]
        };

        // get injector
        const injector = Injector.getInstance();

        // create instances that both need the dependency class
        const instanceFirst = injector.instantiateClass(First);
        const instanceSecond = injector.instantiateClass(Second);

        // dependency must be created
        expect(instanceFirst.dep).to.be.an.instanceof(Dependency);
        expect(instanceSecond.dep).to.be.an.instanceof(Dependency);

        // reinstantiate first class
        const reinstantiatedFirstClass = injector.instantiateClass(First);

        // pointer must match!
        expect(reinstantiatedFirstClass).to.equal(instanceFirst);

        // constructor count must be 1
        expect(constructorCallCount).to.equal(1);
    }

    @test "Injector refuses to instantiate classes that does not have @Injectable() decorator"() {

        class NotInjectable { }
        (NotInjectable as InjectableClass).__staticReflection = {
            constructor: [RequiredInjectableClass]
        };

        // get injector
        const injector = Injector.getInstance();

        expect(() => {
            injector.instantiateClass(NotInjectable);
        }).to.throw();
    }

    @test "Injector can not resolve dependencies that are not @Injectable()"() {

        class NonInjectableDependency { }
        (NonInjectableDependency as InjectableClass).__staticReflection = {
            constructor: []
        };

        @Injectable()
        class TestClass {
            constructor(public nid: NonInjectableDependency) { }
        }
        (TestClass as InjectableClass).__staticReflection = {
            constructor: [NonInjectableDependency]
        };

        // get injector
        const injector = Injector.getInstance();

        // instantiate should fail because NonInjectableDependency is not @Injectable()
        expect(() => {

            console.log(injector.instantiateClass(TestClass));
        }).to.throw();

    }

    @test "Injector should not throw when a dependency is not injectable and not a class"() {

        @Injectable()
        class TestClass {
        }
        (TestClass as InjectableClass).__staticReflection = {
            constructor: [null, "test"]
        };

        // get injector
        const injector = Injector.getInstance();

        expect(injector.instantiateClass(TestClass)).to.be.an.instanceof(TestClass);
    }

    @test "Injector can clear manually addon instances"() {

        @PrepareClassDecorator(target => {
            // injectable but no singleton
            (target as InjectableClass).__injectable = true;
            target.__staticReflection = {
                constructor: []
            };
        })
        class TestInjectable { }

        // get injector
        const injector = Injector.getInstance();

        const testInstanceFirst = new TestInjectable();
        injector.addInstance(TestInjectable, testInstanceFirst);

        // get instance
        expect(injector.instantiateClass(TestInjectable)).to.equal(testInstanceFirst);

        // clear manually added instance
        injector.clearManual();

        // injector must instantiate a new instance
        const testInstanceSecond = injector.instantiateClass(TestInjectable);
        expect(testInstanceSecond).to.not.equal(testInstanceFirst);
        expect(testInstanceSecond).to.be.an.instanceof(TestInjectable);

    }
}