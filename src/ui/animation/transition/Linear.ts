import { Transition } from "./Transition";
import { Injectable } from "../../../core/decorators/Injectable";

/**
 * implements a transition linear calculation
 */
@Injectable()
export class Linear implements Transition {

    public calculate(x: number): number {

        // bases on f(x) = x
        return x;
    }
}