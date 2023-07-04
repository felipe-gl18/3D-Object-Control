const movementsLeftHandKeypoints = [];

export const movements = async (data, callback) => {
    if (data.hand.length != 0) {
        for (const finger of data.fingers) {
            const points = data.fingerLookupIndexes[finger].map(index => data.hand.keypoints[index])

            const wristKeypoints = points.shift()

            if (data.hand.handedness == "Left") {
                if (movementsLeftHandKeypoints.length == 0) {
                    movementsLeftHandKeypoints.push(wristKeypoints)
                } else {
                    if (Math.round(movementsLeftHandKeypoints[movementsLeftHandKeypoints.length - 1].x - wristKeypoints.x) < -18) {
                        movementsLeftHandKeypoints.push(wristKeypoints)
                        return `${data.hand.handedness}-hand-moving-to-right`
                    }
                    if (Math.round(movementsLeftHandKeypoints[movementsLeftHandKeypoints.length - 1].x - wristKeypoints.x) > 18) {
                        movementsLeftHandKeypoints.push(wristKeypoints)
                        return `${data.hand.handedness}-hand-moving-to-left`
                    }
                }
            }
        }
    } else {
        movementsLeftHandKeypoints = []
    }
}
