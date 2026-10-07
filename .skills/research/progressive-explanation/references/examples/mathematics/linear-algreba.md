# Example: Linear Algebra

## Concept

Linear algebra is the mathematics of vectors, matrices, and linear transformations.

### 🧒 Child

Imagine you have a box of LEGO pieces.

A **vector** is like a list telling you how many pieces you have
or where something is.

A **matrix** is like a machine that takes a list of numbers and
changes them into another list.

It can make something bigger, smaller, or change its direction.

So linear algebra is a way of using numbers to describe and change things.

### 🎓 Student

Linear algebra studies vectors and matrices and how they interact.

A vector can represent several numbers together:

$$
x =
\begin{bmatrix}
2 \\
3
\end{bmatrix}
$$

A matrix can transform that vector:

$$
A =
\begin{bmatrix}
1 & 0 \\
0 & 2
\end{bmatrix}
$$

Multiplying them gives:

$$
Ax =
\begin{bmatrix}
2 \\
6
\end{bmatrix}
$$

The matrix kept the first value the same but doubled the second.

### 👤 Layperson

Linear algebra provides a language for representing data and
transforming it mathematically.

A vector is an ordered collection of numbers. A matrix is a
rectangular arrangement of numbers that can represent a transformation.

Machine learning uses linear algebra everywhere.

A neural network commonly computes:

$$
y = Wx + b
$$

where:

- $x$ is the input vector.
- $W$ is a matrix of learned weights.
- $b$ is a bias vector.
- $y$ is the resulting representation.

Images, text embeddings, neural activity, and many other datasets
can be represented using vectors or matrices.

### 🔬 Expert

Linear algebra studies vector spaces, linear maps, and their representations.

A linear transformation $T$ satisfies:

$$
T(ax + by) = aT(x) + bT(y)
$$

for vectors $x$, $y$ and scalars $a$, $b$.

Important ML concepts include:

- Rank
- Null space
- Orthogonality
- Projections
- Eigenvalues and eigenvectors
- Singular value decomposition
- Positive-definite matrices
- Matrix norms

SVD decomposes a matrix as:

$$
A = U\Sigma V^T
$$

and underlies PCA, least-squares computation, low-rank approximation,
and dimensionality reduction.
