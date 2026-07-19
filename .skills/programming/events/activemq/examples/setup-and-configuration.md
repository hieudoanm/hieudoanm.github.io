# ActiveMQ Best Practices: 2. Messaging Models & Destination Design

## Scenario

A project is working on **2. messaging models & destination design** for ActiveMQ Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Queues** — point-to-point workflows with **competing consumers**
- **Topics** — publish–subscribe fan-out; **durable subscriptions when required**
- Keep **destination names stable and meaningful**
- **Avoid overusing selectors** — prefer destination-level routing
- **Separate retry destinations from primary ones**
- **Version message payloads deliberately**; **treat message schema as a contract**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Messaging Models & Destination Design** section of [SKILL.md](../SKILL.md).
