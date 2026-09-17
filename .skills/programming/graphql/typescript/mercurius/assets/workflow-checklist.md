# mercurius: Workflow Checklist

A practical run sheet for applying [mercurius](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup: Deps: fastify, mercurius, graphql
- [ ] 1. Setup: Register: fastify.register(mercurius, { schema, resolvers }) (or from files with schema: './schema.gql' + resolvers)
- [ ] 2. Schema & Resolvers: **Schema** can be SDL string, file, or buildSchema programmatically
- [ ] 2. Schema & Resolvers: **Resolvers** map: { Query: { users: async () => [...] } }
- [ ] 3. Loaders (Mercurius DataLoaders): Use **loaders** option: { User: { posts: async (queries, context) => batchLoad(...) } } per type-field
- [ ] 3. Loaders (Mercurius DataLoaders): Loaders **batch + dedupe** per request group (like DataLoader), killing N+1
- [ ] 4. Subscriptions: Enable { subscriptions: true }; use subscribe + onSubscribe for auth
- [ ] 4. Subscriptions: Define Subscription type with subscribe: ... returning AsyncIterator (e.g., pubSub)
- [ ] 5. Federation & Composition: **Mercurius Federation**: register mercurius, enable federationMetadata. Each service exposes @key fields; a gateway (Apollo Router or Mercurius gateway service) composes the supergraph
- [ ] 5. Federation & Composition: resolveReference(reference) required for entities (User referenced by id)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
