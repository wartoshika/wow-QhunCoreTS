import { MockedWowFrame } from "./index";
import { Injector } from "../../src/core/di/Injector";
import { Logger } from "../../src/core/debug/Logger";
import { MockedLogger } from "./MockedLogger";

// mock the logger
Injector.getInstance().addInstance(Logger, new MockedLogger());

// enable CreateFrame mock
(global as any).CreateFrame = (type: string, name: string, parent: WowFrame, inherits: string, id: number) => {
    return new MockedWowFrame(type, name, parent, inherits, id);
};

// enable __FILE_META mock
(global as any).__FILE_META = {
    [0]: undefined,
    [1]: "addon"
};
