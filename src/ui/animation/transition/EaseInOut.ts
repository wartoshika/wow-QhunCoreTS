import { Transition } from "./Transition";
import { Injectable } from "../../../core/decorators/Injectable";

/**
 * implements a transition ease in out calculation
 */
@Injectable()
export class EaseInOut implements Transition {

    public calculate(x: number): number {

        // based on f(x) = x^2 / (x^2 + (1 - x)^2)
        return x ** 2 / (x ** 2 + (1 - x) ** 2);
    }
}
