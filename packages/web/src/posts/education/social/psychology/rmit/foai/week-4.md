---
title: 'FoAI - Week 4'
date: '2025-06-30'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction to Machine Learning and Deep Learning](#introduction-to-machine-learning-and-deep-learning)
  - [What is Machine Learning?](#what-is-machine-learning)
  - [Types of Machine Learning](#types-of-machine-learning)
  - [Review and Reflect](#review-and-reflect)

## Introduction to Machine Learning and Deep Learning

### What is Machine Learning?

- Tom Mitchell offered a more precise definition in 1998 that helps us break down exactly what happens in machine learning:
  - This definition gives us a framework with three essential components:
    - Task (T): What the model is trying to do
    - Experience (E): The data the model learns from
    - Performance measure (P): How we evaluate how well the model is doing
- Popular Performance Measures
  - The performance measure we choose dramatically affects what kind of system we end up with - even when using the same data and algorithms! Depending on the task, we can use different performance measures:
    - For Regression: These measures evaluate models that predict continuous values (like prices, temperatures, etc.)
    - For Classification: These measures evaluate models that predict categorical outcomes (like spam/not spam, positive/negative)
- Training data (also called training set) is the foundational dataset used to teach machine learning models to recognise patterns.
  - A training set is typically structured as a table or matrix:
    - Each row is a sample (also called a data point or an instance)
    - Each column is a feature (also called an attribute)
  - For binary classification problems, the label represents the target outcome: Label = 0 (no/negative) or 1 (yes/positive).
- Quiz
  - What does each row in a training dataset typically represent? A data point or instance
  - What is a feature in a training dataset? A column representing an attribute like age or BMI
  - Training data is used to teach the model to recognize patterns and relationships.
  - The column “Label” represents whether the patient has diabetes (1 = yes, 0 = no)
  - Which of the following is an example of a feature from the example dataset? DiabetesPedigree
  - Which of the following is an example of a sample from the example dataset? P004

### Types of Machine Learning

- Supervised learning is often considered the most powerful approach in machine learning, particularly for well-defined problems where we have labelled examples. The term "supervised" refers to the learning process being guided or "supervised" by known correct answers.
  - Classification: When we predict categories or classes e.g. diagnoses where Label: Diabetes Present (1) or Absent (0)
  - Regression: When we predict continuous numerical values e.g. House Price Prediction where Label = Sale price ($350,000, $175,000, etc.)
- Unsupervised learning finds structure in data without being told what to look for. Two most common tasks in unsupervised learning are clustering and anomaly detection. Have a look at the case studies below to understand them.
  - Clustering Case Study - Customer Grouping
    - Older customers who spend a lot
    - Middle-aged/older customers who spend a medium amount
    - Younger customers who spend very little
  - Anomaly Detection Case Study - Banking Security
    - The system learns what normal transaction patterns look like for each customer
    - Transactions that deviate significantly from these patterns trigger alerts
    - This helps identify potentially fraudulent activity without needing examples of fraud.
- Reinforcement Learning: Have you ever learned a new skill through practice and feedback? Maybe you learned to ride a bike by trying, falling, adjusting, and trying again. Reinforcement learning works similarly - it's learning through experience and feedback.
  - Observe: The agent perceives the current state of the environment
  - Select action: Based on a policy (strategy), the agent chooses an action
  - Take action: The agent performs the chosen action
  - Get reward or penalty: The environment provides feedback
  - Update policy (learning step): The agent adjusts its strategy based on feedback
  - Iterate: This cycle continues until an optimal policy is found.

### Review and Reflect

- RMSE (Root Mean Squared Error) and R-squared are standard metrics used to evaluate how well a regression model fits continuous numerical data.
- These three core types describe how AI models learn: with labels, without labels, or through feedback from interaction.
- Supervised learning relies on labeled input-output pairs to train models to make predictions or decisions.
- K-Means is an unsupervised clustering algorithm, not used in supervised learning tasks.
- Unsupervised learning is used to detect structure in data without labels, such as grouping or reducing features.
- Reinforcement learning uses trial and error, where agents learn through feedback based on actions taken in an environment.
