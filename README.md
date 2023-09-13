# 3D-Object-Control

## What's it about?
It's a project that uses Tensorflow.js to detect hands gestures, and the project 
lso have a native logic to detect hands movements, with both features, we can control
the 3D model with the help of Three.js, used on the project.

## How to use it?
You have two buttons, one to start and another to stop the detection, after you start, the movements that will be detected are:
- The left hand moving to the left or right, this movement is responsable to the rotation of the 3D model;
- The right hand completely closed, will distance the model. The right hand completely open, will approach it.

## How to start the project?
npx serve .

