# QhunCoreTS

> Level up your addon quallity by using a modern language with modern design patterns!

**QhunCoreTS** is a **World of Warcraft framework** written in **TypeScript that transpiles into pure LUA** with **full WoW Battle for Azeroth compatiblity!**

[TL; DR: Example addon](#Example-addon)

---

**A feature list of the framework:**

- Dependency injection, Singleton and Repository design patterns
- The complete documented WoW LUA API with autocompletion
- Event streams with Observables (reactive programming)
- Promises as a one-time async callback with error support
- Util classes for arrays, objects and other types
- Translation service for easy multi locale handling
- Repository based access for database calls (saved variables)
- Debug possabilities without flooding your default console
- Easy to understand classes for ingame objects like: Items, Units, Maps, Inventory ...
- Predefined and extentable GUI objects with the possabiltiy to add a custom theme on them
- Frame pooling to reduce memory footprint
- Enumerations for specific values of the WoW API
- Services for sending data via the addon channel with unlimited payload size
- Framework can be embeded within your addon

**And the feature list of the TypeScript language:**

- Classes, Abstract classes, Interfaces, Class heritage
- Generics
- Decorators on class, property, method and parameter level
- A full support for autocompletion
- Type save variables at compiler time
- Multireturn support (via the included transpiler)

TypeScript is a superset of JavaScript and it's syntax is (in my opinion) easy to read and write. There is a realy large comunity for JavaScript and TypeScript related problems. I have written a transpiler ([qhun-transpiler](https://github.com/wartoshika/qhun-transpiler)) that targets LUA 5.1 and World of Warcraft per design.

## **Example addon**

The following example prints a message onto the console when the addon has been loaded.

```typescript
@QhunAddon({
    addonName: "MyCoolAddon"
})
class MyCoolAddon {

    @TocValue("Version")
    private version: string;

    constructor(
        private timer: Timer,
        @TocValue("Author") author: string
    ) {

        print(
            `This addon has been written by ${author}`,
            `The version is ${this.version}`
        );

        this.printAfterOneSecond();
    }

    private printAfterOneSecond(): void {

        this.timer.timeout(() => {
            print("One second passed!");
        }, 1000);
    }
}

bootstrapAddon(MyCoolAddon);
```

**Step by step explanation:**
 - `@QhunAddon` is the entrypoint of your Addon.
 - The class declaration defined the what to do when your addon bootstraps
 - Declaring a private string based variable that should automaticly get the addon version number from the .toc file.
 - The constructor function uses dependency injection and automaticly get a `Timer` serivce and another .toc file value.
 - Using the builtin print function and the template string literal to print a text onto the console with two variables.
 - Call the other declared private function `printAfterOneSecond`.
 - The previously injected `Timer` instance will be used to call the given callback function after 1000ms.
 - After one second the callback function will print another text.
 - Finally the function call to `bootstrapAddon` outside of your class context will bootstrap your declared addon class by handleing over your class name.