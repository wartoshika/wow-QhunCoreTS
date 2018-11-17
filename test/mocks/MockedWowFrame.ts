export class MockedWowFrame implements Partial<WowFrame> {

    private onUpdateTimer: NodeJS.Timer;

    constructor(
        private type: string,
        private name: string,
        private parent: WowFrame,
        private inherits: string,
        private id: number
    ) { }

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
        }
    }
}