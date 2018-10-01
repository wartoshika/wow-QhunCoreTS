import { QhunAddon } from "./decorators";
import { CrudRepository, SavedVariablesDatabase } from "./database";
import { bootstrapAddon } from "./bootstrap";
import { Output } from "./util/Output";
import { Injector } from "./di";

@QhunAddon({
    embed: true
})
class Addon {

    constructor(
        private repo: CrudRepository,
        private db: SavedVariablesDatabase,
        private injector: Injector
    ) {
        Output.dump(repo);
        print("repo fktn", this.repo.find);
        print(this.db.read);
        print(this.injector.resolve);
    }
}

bootstrapAddon(Addon);