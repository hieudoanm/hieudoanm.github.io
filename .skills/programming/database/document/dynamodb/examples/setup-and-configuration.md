# DynamoDB Best Practices: 2. Data Modeling & Access Patterns

## Scenario

A project is working on **2. data modeling & access patterns** for DynamoDB Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Start with access patterns first**; encode entity type and relationships in keys
- Use **composite keys deliberately** (PK + SK)
- Prefer **sparse GSIs** (only items having the attribute) over wide indexes
- **Limit item size and attribute sprawl**
- Use **prefix-based sort keys** for range queries
- **Design pagination into access patterns** (exclusiveStartKey)
- Model **one-to-many and many-to-many explicitly**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Data Modeling & Access Patterns** section of [SKILL.md](../SKILL.md).
