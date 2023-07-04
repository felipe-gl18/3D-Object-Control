import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core/dist/tf-core.min.js";
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl/dist/tf-backend-webgl.min.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.min.js";
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection/dist/hand-pose-detection.min.js";

import Camera from "../lib/camera.js"

let detector

const image = document.querySelector("img")
const estimationConfig = { flipHorizontal: false };
const camera = Camera.init()

async function initializeDetector() {
    const model = window.handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
        modelType: 'lite',
        maxHands: 2
    }

    detector = await window.handPoseDetection.createDetector(model, detectorConfig);
}

async function estimateHands(video) {
    const result = detector.estimateHands(video, {
        flipHorizontal: true
    })

    console.log(result);
}

async function Secondloop() {
    await initializeDetector()
    await estimateHands(camera.video)
    requestAnimationFrame(Secondloop)
}
