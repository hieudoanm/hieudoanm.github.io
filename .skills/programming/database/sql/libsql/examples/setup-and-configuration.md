# libSQL Best Practices: 2. Data Modeling & Architecture

## Scenario

A project is working on **2. data modeling & architecture** for libSQL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Prefer **stable primary keys** (UUIDs where appropriate)
- **Avoid relying on write ordering across nodes**
- Design schemas to **minimize write conflicts**
- Normalize unless denormalization is deliberate; **keep schemas simple and evolvable**
- **Version schema migrations explicitly**; avoid schema churn in highly replicated setups
- Design for **merge-friendly data models** (last-writer-wins or explicit conflict resolution)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md).
