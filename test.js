import IdleProvider, {
    IdleConfig
} from "./idle";

describe("test IdleConfig", () => {
    let idleConfigInstance;
    beforeEach(() => {
        idleConfigInstance = new IdleConfig();
    })

    it("should contain IdleConfig", () => {
        expect(IdleConfig).toBeDefined();
    });

    it("should return options with default param", () => {
        const options = idleConfigInstance.options;

        expect(options.idle).toBe(1800000);

        expect(options.autoResume).toBe(false);

        expect(options.title).toBe("Session has expired");

        expect(options.container).toBe("body");
    })

    it("should update idle timer value", () => {
        idleConfigInstance.idle(10);

        const options = idleConfigInstance.options;
        expect(options.idle).toBe(10);
    })

    it("should update idle timer value", () => {
        idleConfigInstance.idle(10);

        const options = idleConfigInstance.options;
        expect(options.idle).toBe(10);
    })

    it("should through error when idle timer value is less than 0", () => {
        const err = () => {
            idleConfigInstance.idle(-10);
        };

        expect(err).toThrow(Error);
    })
});

describe("test IdleProvider", () => {
    it("should contain IdleProvider", () => {
        expect(IdleProvider).toBeDefined();
    });
});