# Microservices Architecture Best Practices: Workflow Checklist

A practical run sheet for applying [Microservices Architecture Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Single responsibility** — each service handles one business capability
- [ ] 1. Core Principles: **Loose coupling** — services are independent and can evolve separately
- [ ] 2. Service Design: **Domain-driven design** — design services around business domains:
- [ ] 2. Service Design: **Bounded contexts** — clear boundaries between services
- [ ] 3. Service Communication: **Synchronous communication** — HTTP/REST for request/response:
- [ ] 3. Service Communication: **Asynchronous communication** — message queues for event-driven:
- [ ] 4. Data Management: **Database per service** — each service has its own database:
- [ ] 4. Data Management: **Data consistency** — eventual consistency across services
- [ ] 5. Service Discovery: **Service registry** — implement service discovery:
- [ ] 5. Service Discovery: **Load balancing** — implement load balancing strategies

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
