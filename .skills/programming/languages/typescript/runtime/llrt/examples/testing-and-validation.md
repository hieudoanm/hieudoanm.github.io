# LLRT Best Practices: 6. CI & Testing

## Scenario

A project is working on **6. ci & testing** for LLRT Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Local dev parity (`llrt` CLI download + handler harness) — the runtime differs from Node; test it:**
- **Golden output per event type; latency CI gate (cold start budget in the pipeline).**
- **Version-pin the runtime + dependencies; refresh on dot-releases deliberately.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **6. CI & Testing** section of [SKILL.md](../SKILL.md).
