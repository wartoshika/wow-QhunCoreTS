import { EventUtil } from "../../../src/core/util/EventUtil";
import { suite, test, slow, timeout } from "mocha-typescript";
import { MockedWowFrame } from "../../mocks";

@suite class EventUtilSpec {

    @test "EventUtil.getPromise() can resolve"(done: Function) {

        EventUtil.getPromise("PLAYER_ALIVE").done(() => {
            done();
        });

        // emit player alive event
        setTimeout(() => {
            MockedWowFrame.emitWowEvent("PLAYER_ALIVE");
        }, 20);
    }

    @test "EventUtil.getPromise() should fail if the timeout is reached"(done: Function) {

        EventUtil.getPromise("PLAYER_ALIVE", 10).done(() => { }, () => {
            done();
        });

        // emit player alive event
        setTimeout(() => {
            MockedWowFrame.emitWowEvent("PLAYER_ALIVE");
        }, 50);
    }

}
