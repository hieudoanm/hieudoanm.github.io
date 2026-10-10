---
name: "lightgbm-best-practices"
description: "Best practices for using LightGBM for gradient boosting. Use when implementing, structuring, or reviewing LightGBM models — covers data preparation, hyperparameter tuning, model training, and deployment."
tags:
  - "programming"
  - "language"
  - "python"
  - "data"
  - "data-science"
  - "lightgbm"
when_to_use: "Use when implementing, structuring, or reviewing LightGBM models."
prerequisites:
  - "Basic familiarity with Python and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../xgboost/SKILL.md"
  - "../tensorflow/SKILL.md"
  - "../hugging-face/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# LightGBM Best Practices

LightGBM is a gradient boosting framework that uses tree-based learning algorithms. Best practice is to prepare data properly, tune hyperparameters effectively, use cross-validation, handle categorical features appropriately, and follow ML best practices for model performance and interpretability.

## When to use

Use when implementing, structuring, or reviewing LightGBM models.

## Prerequisites

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Data preparation** — clean and format data properly
- **Categorical features** — use native categorical support
- **Cross-validation** — use cross-validation for robust evaluation
- **Early stopping** — use early stopping to prevent overfitting
- **Feature importance** — analyze feature importance for insights
- **Hyperparameter tuning** — tune hyperparameters for better performance
- **Model persistence** — save and load models properly
- **GPU acceleration** — use GPU for large datasets

## Focus areas

- 1. Core Concepts
- 2. Installation
- 3. Data Preparation
- 4. Model Training
- 5. Hyperparameter Tuning
- 6. Feature Importance
- 7. Cross-Validation
- 8. Model Evaluation
- 9. Model Persistence
- 10. Advanced Features
- 11. GPU Training

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
