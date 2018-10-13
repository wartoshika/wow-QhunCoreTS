/**
 * the phase when your addon will be constructed and bootstraped
 */
export enum BootstrapPhase {

    /**
     * your addon will be instantly bootstraped. (When the wow addon loader find the main class file)
     */
    INSTANT = 0,

    /**
     * your addon will be loaded when the ADDON_LOAD event from the wow addon library has been fired
     */
    ADDON_LOAD = 1,

    /**
     * your addon will be loaded when the PLAYER_ENTERING_WORLD event will be fired (of cause once!)
     */
    ENTER_WORLD = 2
}