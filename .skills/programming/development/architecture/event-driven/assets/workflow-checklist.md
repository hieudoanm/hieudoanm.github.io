# Event-Driven Architecture Best Practices: Workflow Checklist

A practical run sheet for applying [Event-Driven Architecture Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Loose coupling** — components communicate through events, not direct calls
- [ ] 1. Core Principles: **Asynchronous communication** — events are processed asynchronously
- [ ] 2. Event Design: **Event naming** — use past tense for events that have occurred:
- [ ] 2. Event Design: **Event schema** — define clear event schemas:
- [ ] 3. Messaging Patterns: **Publish/Subscribe** — implement pub/sub for event distribution:
- [ ] 3. Messaging Patterns: **Message queues** — use message queues for reliable delivery:
- [ ] 4. Event Processing: **Event handlers** — implement event handlers:
- [ ] 4. Event Processing: **Event routing** — implement event routing:
- [ ] 5. Event Ordering: **Timestamp ordering** — use timestamps for ordering:
- [ ] 5. Event Ordering: **Sequence numbers** — use sequence numbers for strict ordering:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
