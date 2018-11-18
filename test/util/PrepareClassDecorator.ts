import { ClassConstructor } from "../../src/core/types";

export function PrepareClassDecorator(fktn: (target: ClassConstructor) => void): ClassDecorator {

    return <ClassDecorator>(<Target extends object>(target: ClassConstructor<Target>) => {

        fktn(target);
    });
}