---
name: synaptic-js-best-practices
description: Best practices for using Synaptic.js for neural networks in JavaScript/TypeScript. Use when implementing, structuring, or reviewing Synaptic.js models — covers network architecture, training, and deployment.
---

# Synaptic.js Best Practices

Synaptic.js is a neural network library for JavaScript that runs in both browser and Node.js. Best practice is to design appropriate network architectures, prepare data properly, train with appropriate parameters, and follow ML best practices for model performance and generalization.

---

## 1. Core Concepts

- **Neural networks** — layers of neurons with weighted connections
- **Architecture** — input, hidden, and output layers
- **Training** — backpropagation with gradient descent
- **Activation functions** — sigmoid, tanh, relu, etc.
- **Loss functions** — mean squared error, cross-entropy

---

## 2. Installation

- **Install Synaptic.js:**

```bash
npm install synaptic
```

- **For TypeScript:**

```bash
npm install synaptic @types/synaptic
```

---

## 3. Basic Network Creation

- **Create a simple network:**

```typescript
import { Architect, Layer, Network } from 'synaptic';

// Create a simple perceptron
const perceptron = new Architect.Perceptron(2, 1);
const network = perceptron.network;

// Create a multi-layer network
const network = new Architect.Perceptron(2, 3, 1).network;
```

- **Create custom network:**

```typescript
const network = new Network({
  input: 2,
  hidden: [4, 3],
  output: 1
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

network.trainer.train(trainingData, {
  iterations: 20000,
  error: 0.005,
  rate: 0.3,
  shuffle: true
});
```

- **Train with custom options:**

```typescript
const options = {
  iterations: 10000,
  error: 0.01,
  rate: 0.1,
  rate_decay: 0.999,
  shuffle: true,
  log: (stats: any) => console.log(stats)
};

network.trainer.train(trainingData, options);
```

---

## 5. Network Architectures

- **LSTM network:**

```typescript
const lstm = new Architect.LSTM(1, 10, 1).network;

// Train LSTM
lstm.trainer.train(trainingData, {
  iterations: 1000,
  error: 0.01
});
```

- **GRU network:**

```typescript
const gru = new Architect.GRU(1, 8, 1).network;
```

- **Perceptron:**

```typescript
const perceptron = new Architect.Perceptron(3, 1).network;
```

---

## 6. Activation Functions

- **Use appropriate activation functions:**

```typescript
const network = new Network({
  input: 2,
  hidden: [4],
  output: 1,
  options: {
    hidden: { activation: 'relu' },
    output: { activation: 'sigmoid' }
  }
});
```

- **Available activations:** `sigmoid`, `tanh`, `relu`, `leaky-relu`, `linear`

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

- **Split data for training and testing:**

```typescript
function splitData(data: any[], testRatio: number = 0.2) {
  const splitIndex = Math.floor(data.length * (1 - testRatio));
  return {
    train: data.slice(0, splitIndex),
    test: data.slice(splitIndex)
  };
}
```

---

## 8. Model Evaluation

- **Evaluate model performance:**

```typescript
function evaluate(network: Network, testData: any[]) {
  let correct = 0;
  let total = testData.length;

  for (const item of testData) {
    const output = network.activate(item.input);
    const predicted = output[0] > 0.5 ? 1 : 0;
    if (predicted === item.output[0]) {
      correct++;
    }
  }

  return correct / total;
}

const accuracy = evaluate(network, testData);
console.log(`Accuracy: ${accuracy}`);
```

---

## 9. Model Persistence

- **Save and load network:**

```typescript
// Save network
const json = network.toJSON();
fs.writeFileSync('network.json', JSON.stringify(json));

// Load network
const loadedNetwork = Network.fromJSON(JSON.parse(json));
```

---

## 10. Prediction

- **Make predictions:**

```typescript
const input = [0.5, 0.3];
const output = network.activate(input);
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

- [ ] Synaptic.js installed with TypeScript types
- [ ] Data normalized and prepared
- [ ] Appropriate network architecture chosen
- [ ] Training parameters configured
- [ ] Training with proper validation
- [ ] Model evaluation metrics calculated
- [ ] Model saved for deployment
- [ ] Prediction API implemented
- [ ] Performance optimized
- [ ] Documentation complete
