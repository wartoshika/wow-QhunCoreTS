export class MockedWowFrame implements Partial<WowFrame> {

    public static instances: MockedWowFrame[] = [];

    public onUpdateTimer: NodeJS.Timer;
    public registeredEvents: WowEvent[] = [];
    public onEventCallback: (payload?: any) => void;

    constructor(
        private type: string,
        private name: string,
        private parent: WowFrame,
        private inherits: string,
        private id: number
    ) {
        MockedWowFrame.instances.push(this);
    }

    public SetScript(name: string, callback: Function | null): void {
        switch (name) {
            case "OnUpdate":
                if (callback) {
                    this.onUpdateTimer = setInterval(() => {
                        callback(5, 5);
                    }, 5);
                } else {
                    clearInterval(this.onUpdateTimer);
                }
                break;
            case "OnEvent":
                this.onEventCallback = callback as any;
                break;
        }
    }

    public RegisterEvent(eventName: WowEvent): void {

        this.registeredEvents.push(eventName);
    }

    public UnregisterAllEvents(): void {
        this.registeredEvents = [];
        delete this.onEventCallback;
    }

    public static emitWowEvent<E extends keyof WowTypedEvents>(name: E, payload?: WowTypedEvents[E]): void {

        MockedWowFrame.instances.forEach(instance => {
            if (instance.registeredEvents.indexOf(name) > -1 && typeof instance.onEventCallback === "function") {
                instance.onEventCallback(payload);
            }
        });
    }
}
