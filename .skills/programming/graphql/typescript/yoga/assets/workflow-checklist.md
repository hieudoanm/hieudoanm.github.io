# yoga: Workflow Checklist

A practical run sheet for applying [yoga](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **createSchema** (from @graphql-tools/schema) + **createYoga** to build a server with SDL + resolvers
- [ ] 1. Core Concepts: Plugin architecture built on **Envelop** — hooks for every stage: onParse, onValidate, onExecute, onSubscribe, onError
- [ ] 2. Setup: Deps: graphql-yoga, graphql, @graphql-tools/schema (optional but recommended)
- [ ] 2. Setup: Standalone: const yoga = createYoga({ schema, graphiql: true }); Bun.serve({ fetch: yoga }) or Node createServer
- [ ] 3. Schema & Resolvers: Use createSchema({ typeDefs, resolvers }) for schema-first; or GraphQLSchema directly
- [ ] 3. Schema & Resolvers: Resolvers: plain JS/TS objects; async anywhere; args/context injected
- [ ] 4. Subscriptions: Add Subscription root type with subscribe returning an AsyncIterable (use PubSub from graphql-yoga or graphql-subscriptions)
- [ ] 4. Subscriptions: Yoga exposes WS and SSE during runtime; configure subscriptions: { path, ... }
- [ ] 5. File Uploads: Built-in multipart support for GraphQLUpload scalars
- [ ] 5. File Uploads: Declare the scalar: scalar Upload; resolver arg receives File objects wrapped in FileUp helpers

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
