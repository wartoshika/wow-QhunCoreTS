import { Promise } from "../../../src/core/async/Promise";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";

@suite class PromiseSpec {

    @test "Promise can be constructed"() {

        const p = new Promise((resolve, reject) => {
            resolve(true);
        });

        expect(p).to.be.an.instanceof(Promise);
    }

    @test(timeout(1000)) "Promise can resolve"(done: Function) {

        new Promise((resolve, reject) => {

            resolve(1);
        }).done(() => {

            done();
        });
    }

    @test(timeout(1000)) "Promise can reject"(done: Function) {

        new Promise((resolve, reject) => {
            reject(1);
        }).done(() => {
            console.log("HERE");
        }, () => {
            done();
        });
    }

    @test(timeout(1000)) "Promise is asynchronous"(done: Function) {

        new Promise(resolve => {
            setTimeout(resolve, 10);
        }).done(() => done());
    }

    @test(timeout(1000)) "Promises can be chained"(done: Function) {

        new Promise(resolve => {

            resolve(1);
        }).done(val => {

            return new Promise<string>(resolve => {
                resolve(val.toString());
            });
        }).done(stringVal => {

            expect(stringVal).to.equal("1");
            done();
        });
    }

    @test(timeout(1000)) "Promises should reject when an exception has been thrown (1)"(done: Function) {

        new Promise(() => {
            throw "error";
        }).done(() => { }, error => {
            expect(error).to.equal("error");
            done();
        });
    }

    @test(timeout(1000)) "Promises should reject when an exception has been thrown (2)"(done: Function) {

        new Promise(() => {
            throw "error text";
        }).done(() => { }, error => {
            return new Promise(resolve => {
                resolve(error);
            });
        }).done(message => {
            expect(message).to.equal("error text");
            done();
        });
    }

    @test(timeout(1000)) "Promises should reject when an exception has been thrown (3)"(done: Function) {

        new Promise((resolve, reject) => {
            resolve("text");
        }).done(val => {
            throw "error " + val;
        }).done(() => { }, err => {
            expect(err).to.equal("error text");
            done();
        });
    }
}