---
name: brain-js-best-practices
description: Best practices for using Brain.js for neural networks in JavaScript/TypeScript. Use when implementing, structuring, or reviewing Brain.js models — covers network architecture, training, and deployment.
---

# Brain.js Best Practices

Brain.js is a neural network library for JavaScript that runs in both browser and Node.js. Best practice is to design appropriate network architectures, prepare data properly, train with appropriate parameters, handle overfitting, and follow ML best practices for model performance and generalization.

---

## 1. Core Concepts

- **Neural networks** — layers of neurons with weighted connections
- **Architecture** — input, hidden, and output layers
- **Training** — backpropagation with gradient descent
- **Activation functions** — sigmoid, tanh, relu, leaky-relu
- **Loss functions** — mean squared error, cross-entropy

---

## 2. Installation

- **Install Brain.js:**

```bash
npm install brain.js
```

- **For TypeScript:**

```bash
npm install brain.js @types/brain.js
```

---

## 3. Basic Network Creation

- **Create a simple network:**

```typescript
import brain from 'brain.js';

// Create a simple perceptron
const net = new brain.NeuralNetwork();

// Create a network with hidden layers
const net = new brain.NeuralNetwork({
  hiddenLayers: [4],
  activation: 'sigmoid'
});
```

- **Specify input and output sizes:**

```typescript
const net = new brain.NeuralNetwork({
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
  log: (stats: any) => console.log(stats),
  logPeriod: 10,
  learningRate: 0.1,
  momentum: 0.1,
  callback: (epoch: any) => console.log('Epoch:', epoch)
};

net.train(trainingData, options);
```

---

## 5. Network Architectures

- **LSTM network:**

```typescript
const net = new brain.recurrent.LSTM();
net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
]);
```

- **GRU network:**

```typescript
const net = new brain.recurrent.GRU();
```

- **RNN network:**

```typescript
const net = new brain.recurrent.RNN();
```

---

## 6. Activation Functions

- **Use appropriate activation functions:**

```typescript
const net = new brain.NeuralNetwork({
  hiddenLayers: [4],
  activation: 'relu', // Options: sigmoid, relu, leaky-relu, tanh
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

- **One-hot encoding:**

```typescript
function oneHotEncode(value: number, classes: number): number[] {
  const encoded = new Array(classes).fill(0);
  encoded[value] = 1;
  return encoded;
}
```

---

## 8. Model Evaluation

- **Evaluate model performance:**

```typescript
function evaluate(net: brain.NeuralNetwork, testData: any[]) {
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
const loadedNet = new brain.NeuralNetwork();
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

- [ ] Brain.js installed with TypeScript types
- [ ] Data normalized and prepared
- [ ] Appropriate network architecture chosen
- [ ] Training parameters configured
- [ ] Training with proper validation
- [ ] Model evaluation metrics calculated
- [ ] Model saved for deployment
- [ ] Prediction API implemented
- [ ] Performance optimized
- [ ] Documentation complete
