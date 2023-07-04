export default class HandGestureController {
    #view;
    #service;
    #camera;

    constructor({ view, service, camera }) {
        this.#view = view;
        this.#service = service;
        this.#camera = camera;
        this.#view.onBtnClick(this.onBtnStart.bind(this))
        this.#view.onBtnClickStop(this.onBtnStop.bind(this))
    }

    #scrollingUp(direction) {
        this.#view.detectingEvent(direction)
    }

    async #estimateHands() {
        try {
            const hands = await this.#service.estimateHands(this.#camera.video);
            this.#view.clearCanvas()
            if (hands?.length) this.#view.drawResults(hands)
            for await (const { event, x, y, movement, handedness } of this.#service.detectGestures(hands)) {
                this.#scrollingUp({ event, movement, handedness })
            }
        } catch (error) {
            console.log("handGestureController-#estimateHands: ", error);
        }
    }

    async #loop() {
        await this.#service.initializeDetector();
        await this.#estimateHands();
        this.#view.loop(this.#loop.bind(this))
    }

    static async initialize(deps) {
        new HandGestureController(deps)
    }

    async onBtnStart() {
        await this.#loop()
    }

    async onBtnStop() {
        await this.#view.stopLoop()
    }
}