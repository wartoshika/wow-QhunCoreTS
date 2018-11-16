import { Reflector } from "../../../src/core/di/Reflector";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { ClassConstructor } from "../../../src/core/types";
import { InjectableClass } from "../../../src/core/di/InjectableClass";

class TestDependencyClass { }

@suite class ReflectorSpec {

    private reflector: Reflector = new Reflector();

    @test "Can detect method signature"() {

        // mock a transpiled class
        const transpiledClass = {
            __staticReflection: {
                constructor: [TestDependencyClass, "__type"]
            }
        } as unknown as ClassConstructor;

        expect(this.reflector.getMethodSignature(transpiledClass)).to.deep.equal([TestDependencyClass, "__type"]);
        expect(this.reflector.getMethodSignature(transpiledClass, "constructor")).to.deep.equal([TestDependencyClass, "__type"]);
    }

    @test "Can detect a reflectable injectable class"() {

        // mock a transpiled class
        const transpiledClass = {
            __staticReflection: {
                constructor: [TestDependencyClass, "__type"]
            }
        } as unknown as ClassConstructor;

        // without injectable flag it should fail
        expect(this.reflector.isReflectableClass(transpiledClass)).to.equal(false);

        // setting injectable flag
        (transpiledClass as InjectableClass).__injectable = true;

        // now the class should be injectable
        expect(this.reflector.isReflectableClass(transpiledClass)).to.equal(true);
    }

    @test "Can detect a non injectable class"() {

        // mock a transpiled class
        const transpiledClass = {
            __staticReflection: {
                constructor: [TestDependencyClass, "__type"]
            }
        } as unknown as ClassConstructor;

        // class is not injectable
        expect(this.reflector.isClassButNotInjectable(transpiledClass)).to.equal(true);

        // set flag
        (transpiledClass as InjectableClass).__injectable = true;

        // chech again
        expect(this.reflector.isClassButNotInjectable(transpiledClass)).to.equal(false);

        // check for a non class type
        expect(this.reflector.isClassButNotInjectable(null)).to.equal(false);
    }
}