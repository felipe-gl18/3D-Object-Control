import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core/dist/tf-core.min.js";
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl/dist/tf-backend-webgl.min.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.min.js";
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection/dist/hand-pose-detection.min.js";
import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";


import HandGestureController from "../controllers/handGestureController.js";
import HandGestureService from "../services/handGestureService.js";
import HandGestureView from "../views/handGestureView.js";
import threeSphere from "../three.js";

import { fingerLookupIndexes } from "../util/util.js";

import Camera from '../../../../lib/camera.js'
const camera = await Camera.init();

const factory = {
    async initialize() {
        return HandGestureController.initialize({
            camera,
            view: new HandGestureView({
                fingerLookupIndexes,
                threeSphere
            }),
            service: new HandGestureService({
                fingerpose: window.fp,
                handPoseDetection: window.handPoseDetection,
                handVersion: window.VERSION
            }),
        })
    }
}

export default factory;