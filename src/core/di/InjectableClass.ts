import { ClassConstructor } from "../types";

/**
 * Defines a class that can be injected via dependency injection
 */
export interface InjectableClass<T extends Object = Object> extends ClassConstructor<T> {

    __injectable?: boolean;
}