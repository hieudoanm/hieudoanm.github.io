# Example: Neural Networks

## Concept

A neural network is a parameterized function that learns a mapping
from inputs to outputs.

### 🧒 Child

Imagine a machine made from lots of tiny decision helpers.

Each helper looks at information and passes a new piece of information
to the next helpers.

At the end, they work together to make a guess.

If the guess is wrong, the machine changes itself a little so it can
do better next time.

### 🎓 Student

A neural network is made of connected layers.

A simple neuron calculates:

$$
y = f(wx + b)
$$

The weights $w$ control how important the input is.

The bias $b$ shifts the result.

The activation function $f$ adds nonlinearity.

Many neurons and layers can be combined to learn complicated relationships.

### 👤 Layperson

A neural network is a mathematical model containing adjustable
parameters called weights and biases.

The network takes an input and repeatedly transforms it.

```text
image
 ↓
layer 1
 ↓
layer 2
 ↓
layer 3
 ↓
prediction
```

During training, the network changes its parameters so its predictions
become closer to the desired outputs.

The difference between prediction and target is measured by a loss function.

### 🔬 Expert

A multilayer perceptron can be represented as:

$$
h_1 = \sigma(W_1x + b_1)
$$

$$
h_2 = \sigma(W_2h_1 + b_2)
$$

$$
\hat{y} = g(W_3h_2 + b_3)
$$

The complete model is a parameterized nonlinear function:

$$
f_\theta : X \rightarrow Y
$$

Training typically solves:

$$
\min_\theta
\sum_i L(f_\theta(x_i), y_i)
$$

Backpropagation computes derivatives of the objective with respect
to parameters using the chain rule.

Architecture, inductive bias, optimization, regularization,
parameterization, and data distribution jointly affect the learned
function and its generalization behavior.
