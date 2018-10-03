import { ClassConstructor } from "./core/types";

/**
 * bootstraps the addon
 * @param mainClass the main class of your addon
 */
export function bootstrapAddon<T extends Object>(mainClass: ClassConstructor<T>): void {

    new mainClass();
}