# MariaDB Best Practices: 2. Data Modeling & Architecture

## Scenario

A project is working on **2. data modeling & architecture** for MariaDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Normalize unless denormalization is justified**
- Select engines per workload — **OLTP vs analytics** differ
- Use correct data types deliberately
- **Index based on real query paths**; validate after schema changes
- Use **foreign keys intentionally**; avoid ambiguous/polymorphic schemas
- Design schemas for **long-term evolution**; version and test migrations

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Data Modeling & Architecture** section of [SKILL.md](../SKILL.md).
