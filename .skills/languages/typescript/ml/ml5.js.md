---
name: ml5-js-best-practices
description: Best practices for using ml5.js for machine learning in JavaScript. Use when implementing, structuring, or reviewing ml5.js applications — covers neural networks, image classification, and creative coding.
---

# ml5.js Best Practices

ml5.js is a friendly machine learning library for the web that wraps TensorFlow.js. Best practice is to use ml5.js for creative coding and prototyping, understand its limitations compared to direct TensorFlow.js, handle model loading properly, and follow web ML best practices for performance and user experience.

---

## 1. Core Concepts

- **Wrapper library** — ml5.js wraps TensorFlow.js for easier ML in the browser
- **Pre-trained models** — access to models like MobileNet, DoodleNet, PoseNet
- **Neural networks** — simple neural network implementation
- **Image classification** — classify images using pre-trained models
- **Creative coding** — ML for creative and artistic applications

---

## 2. Installation

- **Install ml5.js:**

```bash
npm install ml5
```

- **Include via CDN:**

```html
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
```

---

## 3. Image Classification

- **Use pre-trained MobileNet:**

```javascript
let classifier;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  image(video, 0, 0);
}

function classifyImage() {
  classifier.classify(canvas, (err, results) => {
    console.log(results);
  });
}
```

- **Use custom image classification:**

```javascript
function customClassify() {
  classifier.classify(img, (err, results) => {
    console.log('Label:', results[0].label);
    console.log('Confidence:', results[0].confidence);
  });
}
```

---

## 4. Neural Networks

- **Create a simple neural network:**

```javascript
let nn;

function setup() {
  nn = new ml5.neuralNetwork({
    inputs: 2,
    outputs: 1,
    hidden: [4],
    task: 'regression'
  });
}

function trainNetwork() {
  const trainingData = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [0] }
  ];

  nn.train(trainingData, (epoch) => {
    console.log('Epoch:', epoch);
  });
}
```

- **Make predictions:**

```javascript
function predict(input) {
  const output = nn.predict(input);
  console.log('Prediction:', output);
}
```

---

## 5. Pose Detection

- **Use PoseNet for pose detection:**

```javascript
let poseNet;

function preload() {
  poseNet = ml5.poseNet();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0);

  poseNet.singlePose(video, (err, pose) => {
    drawKeypoints(pose);
  });
}
```

---

## 6. Style Transfer

- **Use style transfer:**

```javascript
let styleTransfer;

function preload() {
  styleTransfer = ml5.styleTransfer('models/wave');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  styleTransfer.transfer(video, (err, result) => {
    image(result, 0, 0);
  });
}
```

---

## 7. Face Detection

- **Use face detection:**

```javascript
let faceApi;

function preload() {
  faceApi = ml5.faceApi();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0);

  faceApi.detectSingleFace(video, (err, result) => {
    if (result) {
      drawFace(result);
    }
  });
}
```

---

## 8. Model Loading

- **Handle model loading asynchronously:**

```javascript
let model;

function preload() {
  model = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log('Model loaded!');
  classifyImage();
}
```

---

## 9. Performance Optimization

- **Use GPU acceleration:**

```javascript
function setup() {
  const options = {
    backend: 'webgl'
  };
  ml5.setBackend(options);
}
```

- **Optimize for mobile:**

```javascript
const options = {
  version: 1,
  alpha: 0.5
};
```

---

## 10. Error Handling

- **Handle errors gracefully:**

```javascript
function classifyImage() {
  classifier.classify(canvas, (err, results) => {
    if (err) {
      console.error('Classification error:', err);
      return;
    }
    console.log(results);
  });
}
```

---

## 11. General Rules of Thumb

- **Model loading** — handle async model loading properly
- **Performance** — optimize for browser performance
- **Error handling** — handle errors gracefully
- **Mobile support** — optimize for mobile devices
- **Creative coding** — use for creative and artistic applications
- **Prototyping** — use for quick ML prototyping

---

## Quick-Start Checklist

- [ ] ml5.js installed via npm or CDN
- [ ] Appropriate model selected for task
- [ ] Model loading handled asynchronously
- [ ] Error handling implemented
- [ ] Performance optimized for browser
- [ ] Mobile support considered
- [ ] User experience optimized
- [ ] Models tested across browsers
- [ ] Documentation complete
- [ ] Creative use case identified
