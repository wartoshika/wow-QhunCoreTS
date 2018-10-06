import { Locale } from "./locale/Locale";
import { QhunAddon } from "./core/decorators/QhunAddon";
import { DebugChatWindow } from "./core/debug/DebugChatWindow";
import { TocValue } from "./core/decorators/TocValue";
import { bootstrapAddon } from "./bootstrap";
import { Window } from "./ui/objects/Window";

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

    @TocValue("Title")
    private name: string;

    constructor() {

        const window = new Window({
            width: 400,
            height: 300, 
            title: {
                actionButtons: [{
                    text: "Menu",
                    callback: (button) => { print("HEY MENU", button); }
                }, {
                    text: "Other Menu",
                    callback: (button) => { print("OTHER MENU", button) }
                }],
                titleText: "Hello Title"
            }
        });
        window.append(UIParent);
    }
}

bootstrapAddon(Addon);