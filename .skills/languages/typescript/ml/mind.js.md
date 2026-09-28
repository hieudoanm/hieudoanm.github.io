---
name: mind-js-best-practices
description: Best practices for using Mind.js for neural networks in JavaScript/TypeScript. Use when implementing, structuring, or reviewing Mind.js models — covers network architecture, training, and deployment.
---

# Mind.js Best Practices

Mind.js is a neural network library for JavaScript that provides a simple API for building and training neural networks. Best practice is to design appropriate network architectures, prepare data properly, train with appropriate parameters, handle overfitting, and follow ML best practices for model performance and generalization.

---

## 1. Core Concepts

- **Neural networks** — layers of neurons with weighted connections
- **Architecture** — input, hidden, and output layers
- **Training** — backpropagation with gradient descent
- **Activation functions** — sigmoid, tanh, relu
- **Loss functions** — mean squared error, cross-entropy

---

## 2. Installation

- **Install Mind.js:**

```bash
npm install mind
```

- **For TypeScript:**

```bash
npm install mind @types/mind
```

---

## 3. Basic Network Creation

- **Create a simple network:**

```typescript
import Mind from 'mind';

// Create a simple perceptron
const net = new Mind();

// Create a network with hidden layers
const net = new Mind({
  hiddenLayers: [4],
  activation: 'sigmoid'
});
```

- **Specify network architecture:**

```typescript
const net = new Mind({
  inputSize: 2,
  hiddenLayers: [4, 3],
  outputSize: 1
});
```

---

## 4. Training

- **Train with basic examples:**

```typescript
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

net.train(trainingData, {
  iterations: 20000,
  errorThresh: 0.005,
  log: (stats) => console.log(stats),
  logPeriod: 100,
  learningRate: 0.3
});
```

- **Train with custom options:**

```typescript
const options = {
  iterations: 10000,
  errorThresh: 0.01,
  log: (stats) => console.log(stats),
  logPeriod: 10,
  learningRate: 0.1,
  momentum: 0.1
};

net.train(trainingData, options);
```

---

## 5. Network Architectures

- **LSTM network:**

```typescript
const net = new Mind.LSTM();
net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
]);
```

- **RNN network:**

```typescript
const net = new Mind.RNN();
```

---

## 6. Activation Functions

- **Use appropriate activation functions:**

```typescript
const net = new Mind({
  hiddenLayers: [4],
  activation: 'relu', // Options: sigmoid, relu, tanh
  outputActivation: 'sigmoid'
});
```

---

## 7. Data Preparation

- **Normalize data:**

```typescript
function normalize(data: number[]): number[] {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data.map(x => (x - min) / (max - min));
}

const normalizedInput = normalize([1, 2, 3, 4, 5]);
```

---

## 8. Model Evaluation

- **Evaluate model performance:**

```typescript
function evaluate(net: Mind, testData: any[]) {
  let correct = 0;
  let total = testData.length;

  for (const item of testData) {
    const output = net.run(item.input);
    const predicted = output[0] > 0.5 ? 1 : 0;
    if (predicted === item.output[0]) {
      correct++;
    }
  }

  return correct / total;
}

const accuracy = evaluate(net, testData);
console.log(`Accuracy: ${accuracy}`);
```

---

## 9. Model Persistence

- **Save and load network:**

```typescript
// Save network
const json = net.toJSON();
fs.writeFileSync('network.json', JSON.stringify(json));

// Load network
const loadedNet = new Mind();
loadedNet.fromJSON(JSON.parse(json));
```

---

## 10. Prediction

- **Make predictions:**

```typescript
const input = [0.5, 0.3];
const output = net.run(input);
console.log(`Prediction: ${output}`);
```

---

## 11. General Rules of Thumb

- **Data preparation** — normalize and clean data properly
- **Architecture** — choose appropriate network architecture
- **Training parameters** — tune learning rate and iterations
- **Overfitting** — use validation data to prevent overfitting
- **Activation functions** — use appropriate activation functions
- **Evaluation** — evaluate model performance properly
- **Persistence** — save and load models correctly

---

## Quick-Start Checklist

- [ ] Mind.js installed with TypeScript types
- [ ] Data normalized and prepared
- [ ] Appropriate network architecture chosen
- [ ] Training parameters configured
- [ ] Training with proper validation
- [ ] Model evaluation metrics calculated
- [ ] Model saved for deployment
- [ ] Prediction API implemented
- [ ] Performance optimized
- [ ] Documentation complete
