const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription('Right-hand-zooming-out')
const ScrollUpGesture = new GestureDescription('Right-hand-zooming-in')
const ClickGesture = new GestureDescription('click')

ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

for (let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8)
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5)
ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
ClickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9)
ClickGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9)
ClickGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9)



const knownGestures = [ScrollDownGesture, ScrollUpGesture, ClickGesture];

const gestureStrings = {
    'Right-hand-zooming-in': "Right hand zooming in",
    'Right-hand-zooming-out': "Right hand zooming out",
    'Left-hand-moving-to-left': "Left-hand-moving-to-left",
    "Left-hand-moving-to-right": 'Left-hand-moving-to-right',
    click: 'clicked',
};

export { knownGestures, gestureStrings }