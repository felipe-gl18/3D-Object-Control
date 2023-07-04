export default class HandGestureView {
    #canvasHands = document.querySelector('#hands')
    #canvasContext = this.#canvasHands.getContext('2d')
    #fingerLookupIndexes
    #btnInit = document.querySelector("#btnInit")
    #btnStop = document.querySelector("#btnStop")
    #animation
    constructor({ fingerLookupIndexes, threeSphere }) {
        this.sphere = new threeSphere()
        this.sphere.sphere()
        this.#canvasHands.width = globalThis.screen.availWidth
        this.#canvasHands.height = globalThis.screen.availHeight
        this.#fingerLookupIndexes = fingerLookupIndexes
    }

    onBtnClick(fn) {
        this.#btnInit.addEventListener('click', fn)
    }

    onBtnClickStop(fn) {
        this.#btnStop.addEventListener("click", fn)
    }

    clearCanvas() {
        this.#canvasContext.clearRect(0, 0, this.#canvasHands.width, this.#canvasHands.height)
    }

    drawResults(hands) {
        for (const { keypoints, handedness } of hands) {
            if (!keypoints) continue
            this.#canvasContext.fillStyle = handedness === "Left" ? "red" : "green"
            this.#canvasContext.strokeStyle = "lightblue"
            this.#canvasContext.lineWidth = 4
            this.#canvasContext.lineJoin = "round"

            this.#drawJoients(keypoints)
            this.#drawFingersAndHoverElements(keypoints)

        }
    }

    #drawJoients(keypoints) {
        for (const { x, y } of keypoints) {
            this.#canvasContext.beginPath()
            const newX = x - 2
            const newY = y - 2
            const radius = 3
            const startAngle = 0
            const endAngle = 2 * Math.PI

            this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
            this.#canvasContext.fill()
        }
    }

    #drawFingersAndHoverElements(keypoints) {
        const fingers = Object.keys(this.#fingerLookupIndexes)
        for (const finger of fingers) {
            const points = this.#fingerLookupIndexes[finger].map(
                index => keypoints[index]
            )

            const region = new Path2D()
            // [0] é a palma da mao (wrist)
            const [{ x, y }] = points
            region.moveTo(x, y)
            for (const point of points) {
                region.lineTo(point.x, point.y)
            }
            this.#canvasContext.stroke(region)
        }
    }

    loop(fn) {
        this.#animation = requestAnimationFrame(fn)
    }

    stopLoop() {
        window.cancelAnimationFrame(this.#animation)
        this.clearCanvas()
    }

    detectingEvent(event) {
        //console.log(event.movement, event.event);
        this.sphere.animateSphere(event)
    }
}