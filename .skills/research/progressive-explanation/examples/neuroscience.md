# Example: Neural Encoding

## Concept

Neural encoding describes how information about stimuli, actions, or
internal states is represented in patterns of neural activity.

### 🧒 Child

Imagine your brain has lots of tiny messengers called neurons.

When you see a bright red apple, some of your neurons become more active.

When you see something different, a different group of neurons might
become active.

Neural encoding is about understanding how the brain uses these
patterns of activity to represent information.

It is a little like figuring out what message is being sent by
watching which messengers are talking.

### 🎓 Student

Neural encoding asks:

> How does something in the world relate to activity in the brain?

For example, researchers might show people different sounds and record
activity from neurons.

They might find that some neurons respond more strongly to certain
sounds.

A simple example is:

```text
Stimulus
   ↓
Brain
   ↓
Neural activity
```

Researchers can then look for relationships between the stimulus and
the measured neural response.

For example, if a neuron fires more strongly when a particular sound
gets louder, its activity may encode information about sound intensity.

Encoding is usually about predicting **neural activity from an input**.

### 👤 Layperson

Neural encoding is the study of how information is represented in
patterns of brain activity.

Suppose researchers want to understand how the brain represents visual
information.

They could show participants images while measuring brain activity.

They can then ask whether properties of the images, such as:

- Brightness
- Orientation
- Colour
- Shape
- Semantic category

are systematically related to neural responses.

A simple encoding model might look like:

```text
Stimulus features
       ↓
Encoding model
       ↓
Predicted neural activity
```

The model is fitted using observed stimulus and brain-activity data.

Researchers can then compare the predicted activity with the actual
neural measurements.

For example, a model might predict that a particular brain region
responds more strongly to faces than to houses.

Neural encoding is useful because it provides a quantitative way to
test hypotheses about what information is represented in the brain.

Importantly, finding that a stimulus predicts neural activity does not
automatically prove that the brain uses that information causally or
that the measured region is exclusively responsible for processing it.

### 🔬 Expert

Neural encoding models specify a mapping from experimental variables or
stimulus features to neural responses.

Let the stimulus at time $t$ be represented by a feature vector
$x_t \in \mathbb{R}^p$, and let the neural response be
$y_t \in \mathbb{R}^q$.

A basic linear encoding model is:

$$
y_t = X_t\beta + \epsilon_t
$$

where:

- $X_t$ represents stimulus features or predictors.
- $\beta$ contains encoding parameters.
- $y_t$ is the observed neural response.
- $\epsilon_t$ represents unexplained variation or noise.

For a single neural response, the model can be written as:

$$
y = X\beta + \epsilon
$$

The parameters can be estimated using ordinary least squares:

$$
\hat{\beta}
=
(X^T X)^{-1}X^T y
$$

when the inverse exists.

More flexible encoding models can use generalized linear models,
regularization, nonlinear functions, convolution with temporal response
functions, or neural networks.

For time-resolved neural data, the relationship between stimulus and
response may involve temporal filtering:

$$
y(t)
=
\int X(\tau)h(t-\tau)\,d\tau
+
\epsilon(t)
$$

where $h$ represents a temporal response function.

In neuroscience, encoding models are commonly evaluated using
out-of-sample predictive performance rather than training fit alone.

For example:

$$
R^2
=
1 -
\frac{\sum_i (y_i-\hat{y}_i)^2}
{\sum_i (y_i-\bar{y})^2}
$$

or correlation between predicted and observed responses can be used
to quantify predictive accuracy.

At the population level, encoding models can investigate how information
is distributed across many neurons or measurement channels.

This connects encoding to concepts such as:

- Tuning curves
- Receptive fields
- Population coding
- Representational geometry
- Feature selectivity
- Regularized regression
- Generalized linear models
- Temporal response functions
- Encoding and decoding models

A key conceptual distinction is that **encoding predicts neural
responses from experimental variables**, whereas **decoding predicts
experimental variables or mental states from neural responses**.

Encoding is therefore closely related to statistical modelling and
machine learning, but its scientific purpose is often to test hypotheses
about how information is represented by neural systems.
