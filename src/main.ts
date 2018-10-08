import { Locale } from "./locale/Locale";
import { QhunAddon } from "./core/decorators/QhunAddon";
import { DebugChatWindow } from "./core/debug/DebugChatWindow";
import { TocValue } from "./core/decorators/TocValue";
import { bootstrapAddon } from "./bootstrap";
import { Timer } from "./core/async/Timer";

interface MyTranslation extends Locale {
    firstKey: {
        key: string
    },
    secondKey: void
}

@QhunAddon({
    embed: true,
    addonName: "QhunCoreTS",
    debugger: {
        instance: DebugChatWindow,
        data: "AddonDebug"
    }
})
class Addon {

    @TocValue("Version")
    private version: string;

    constructor(
        private timer: Timer,
        @TocValue("Author") author: string
    ) {

        print(
            `This addon has been written by ${author}`,
            `The version is ${this.version}`
        );

        this.printAfterOneSecond();
    }

    private printAfterOneSecond(): void {

        this.timer.timeout(() => {
            print("One second passed!");
        }, 1000);
    }
}

bootstrapAddon(Addon);