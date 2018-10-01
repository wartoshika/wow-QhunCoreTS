/**
 * bootstraps the addon
 * @param mainClass the main class of your addon
 */
export function bootstrapAddon<T extends Object>(mainClass: { new(...args: any[]): T }): void {

    new mainClass();
}