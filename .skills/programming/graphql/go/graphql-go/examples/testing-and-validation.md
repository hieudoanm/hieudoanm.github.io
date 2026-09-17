# Graphql Go: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Graphql Go. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Define objects, fields, args (with NewNonNull for required), enums, interfaces in Go.
- [ ] Wire root Query (and Mutation/Subscription) into NewSchema.
- [ ] Implement resolvers reading Args + p.Context; add DataLoader batching.
- [ ] Execute via `graphql.Do`; handle result.Errors.
- [ ] Serve over HTTP (`graphql-go-handler` or chi) with GET/POST support.
- [ ] Add request context (auth, tracing) via Params.Context.
- [ ] Add query depth/complexity middleware before production.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
