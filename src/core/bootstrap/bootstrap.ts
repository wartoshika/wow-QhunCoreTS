import { ClassConstructor } from "../types";
import { BootstrapPhase } from "./BootstrapPhase";

/**
 * an internal class that bootstraps the addon to the given time
 */
class AddonBootstrapper<T extends Object> {

    /**
     * the mapping table for internal bootstrap phase to wow event name
     */
    private readonly phaseEventMapper: { [P in BootstrapPhase]: { handler: (...args: any[]) => void, event: WowEvent | null } } = {
        [BootstrapPhase.ENTER_WORLD]: {
            handler: this.bootstrapEnteringWorld.bind(this),
            event: "PLAYER_ENTERING_WORLD"
        },
        [BootstrapPhase.ADDON_LOAD]: {
            handler: this.bootstrapAddonLoaded.bind(this),
            event: "ADDON_LOADED"
        },
        [BootstrapPhase.INSTANT]: {
            handler: this.bootstrapInstant.bind(this),
            event: null
        }
    };

    /**
     * the event frame used to get the events
     */
    private eventFrame: WowFrame;

    /**
     * @param addon the addon that shoule be bootstraped
     * @param phase the phase when to bootstrap
     */
    constructor(
        addon: ClassConstructor<T>,
        phase: BootstrapPhase.ADDON_LOAD,
        addonLoadName: string
    )
    constructor(
        private addon: ClassConstructor<T>,
        private phase: BootstrapPhase,
        private addonLoadName?: string
    ) {

        this.setup();
    }

    /**
     * setup events
     */
    private setup(): void {

        // get the current setup
        const currentSetup = this.phaseEventMapper[this.phase];

        // get the event name when to bootstrap
        const eventName = currentSetup.event;

        // instant check
        if (eventName === null) {

            return this.bootstrapInstant();
        }

        // construct event frame and setup handler function
        this.eventFrame = CreateFrame("Frame");
        this.eventFrame.RegisterEvent(eventName);
        this.eventFrame.SetScript("OnEvent", currentSetup.handler);
    }

    /**
     * bootstrap instantly
     */
    private bootstrapInstant(): void {

        // remove the event frame
        this.eventFrame.UnregisterAllEvents();
        delete this.eventFrame;

        new this.addon();
    }

    /**
     * bootstrap on addon loaded
     */
    private bootstrapAddonLoaded(eventName: WowEvent, selfReference: any, addonName: string): void {

        // wait for addon load
        if (addonName === this.addonLoadName) {

            this.bootstrapInstant();
        }
    }

    /**
     * bootstrap on entering world
     */
    private bootstrapEnteringWorld(): void {

        // entering world event fired, bootstrap now
        this.bootstrapInstant();
    }
}

/**
 * bootstraps the addon
 * @param mainClass the main class of your addon
 * @param phase the phase when your addon will be constructed and bootstraped
 */
export function bootstrapAddon<T extends Object>(mainClass: ClassConstructor<T>, phase: number = BootstrapPhase.ENTER_WORLD): void {

    new AddonBootstrapper(mainClass, phase, __FILE_META[1]);
}
