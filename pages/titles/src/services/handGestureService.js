import { knownGestures, gestureStrings, fingerLookupIndexes, movements } from '../util/util.js'

export default class HandGestureService {
    #gestureEstimator;
    #handPoseDetection;
    #handVersion;
    #detector = null;
    #gestures = [];
    #movements = [];
    #fingerLookupIndexes

    constructor({ fingerpose, handPoseDetection, handVersion }) {
        this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures)
        this.#handPoseDetection = handPoseDetection;
        this.#handVersion = handVersion;
        this.#fingerLookupIndexes = fingerLookupIndexes
    }

    async estimate(keypoints3D) {
        const predictions = await this.#gestureEstimator.estimate(
            this.#getLandMarksFromKeypoints(keypoints3D),
            9
        );
        return predictions.gestures
    }

    async * detectGestures(predictions) {
        const fingers = Object.keys(this.#fingerLookupIndexes)

        for (const hand of predictions) {
            if (!hand.keypoints3D) continue;

            let seila = await movements({ fingerLookupIndexes: this.#fingerLookupIndexes, hand: hand, fingers: fingers })

            if (seila) {
                if ((this.#movements[this.#movements.length - 1]) != seila) {
                    this.#movements.push(gestureStrings[seila])
                }
            } else {
                this.#movements = []
            }

            const gestures = await this.estimate(hand.keypoints3D);
            if (!gestures.length) continue

            const result = gestures.reduce(
                (previous, current) => ((previous.score > current.score) ? previous : current)
            )

            if ((this.#gestures[this.#gestures.length - 1]) != result.name) {
                this.#gestures.push(result.name)
            }

            const { x, y } = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip')
            yield { event: result.name, x, y, movement: this.#movements[this.#movements.length - 1], handedness: hand.handedness }
        }
    }

    async estimateHands(video) {
        return this.#detector.estimateHands(video, {
            flipHorizontal: true
        })
    }

    #getLandMarksFromKeypoints(keypoints3D) {
        return keypoints3D.map((keypoint) => [keypoint.x, keypoint.y, keypoint.z])
    }

    async initializeDetector() {
        if (this.#detector) return this.#detector;
        const detectorConfig = {
            runtime: "mediapipe", // or 'tfjs',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handVersion
                }`,
            modelType: "lite",
            maxHands: 2,
        };
        this.#detector = await this.#handPoseDetection.createDetector(
            this.#handPoseDetection.SupportedModels.MediaPipeHands,
            detectorConfig
        )

        return this.#detector
    }
}