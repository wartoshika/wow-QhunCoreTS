import { Events } from "../core/event/Events";
import { Repository } from "./repository/Repository";

export interface DatabaseEvents extends Events {

    REPOSITORY_WRITE: {
        repository: Repository,
        prefix: string | null,
        changedPath: string | null,
        newData: object
    }
}