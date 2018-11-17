import { Timer } from "../../../src/core/async/Timer";
import { suite, test, slow, timeout } from "mocha-typescript";
import { expect } from "chai";
import { Injector } from "../../../src/core/di/Injector";
import { setTimeout } from "timers";

@suite class TimerSpec {

    @test "Timer is @Injectable()"() {

        expect(Injector.getInstance().instantiateClass(Timer)).to.be.an.instanceof(Timer);
    }

    @test "Timer can set and remove intervals"(done: Function) {

        let intervalCount: number = 0;

        const timer = Injector.getInstance().instantiateClass(Timer);

        const timerRef = timer.interval(() => {
            if (++intervalCount == 3) {
                timer.remove(timerRef);

                // no further interval calls should made
                setTimeout(() => {
                    expect(intervalCount).to.equal(3);
                    done();
                }, 10);
            }
        }, 5);

    }

    @test "Timer can set timeouts"(done: Function) {

        const timer = Injector.getInstance().instantiateClass(Timer);
        let timeoutCalls: number = 0;

        // this timeout should be called once
        timer.timeout(() => {

            if (++timeoutCalls > 0) {

                setTimeout(() => {
                    expect(timeoutCalls).to.equal(1);
                    done();
                }, 10);
            }
        }, 5);
    }

    @test "Timer can remove timeouts before they have been called"(done: Function) {

        const timer = Injector.getInstance().instantiateClass(Timer);
        let timeoutCalls: number = 0;

        // this timeout should be called once
        const ref = timer.timeout(() => {

            timeoutCalls++;
        }, 5);

        // directly remove timeout
        timer.remove(ref);

        // wait and check
        setTimeout(() => {
            expect(timeoutCalls).to.equal(0);
            done();
        }, 10);
    }
}