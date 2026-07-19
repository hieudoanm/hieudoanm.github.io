# apollo-server: Workflow Checklist

A practical run sheet for applying [apollo-server](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup a Server: Package: @apollo/server, graphql, and an HTTP integration (@apollo/server/express4 or built-in standalone)
- [ ] 1. Setup a Server: Create const server = new ApolloServer({ typeDefs, resolvers }), await server.start(), server.applyMiddleware({ app, path: '/graphql' })
- [ ] 2. Schema & Resolvers: **typeDefs**: SDL via gql template literal (Tagged template with the graphql package) or a schema string
- [ ] 2. Schema & Resolvers: **resolvers**: object mapping field to functions; type-wise, return promises for async work
- [ ] 3. Advanced: Directives, Cost, and Errors: Custom directives: define GraphQLDirective (implement visitSchema/transform) for e.g., @auth, @cache
- [ ] 3. Advanced: Directives, Cost, and Errors: **Error shaping**: formatError hook to map internal errors to client-safe messages (don't leak stack traces)
- [ ] 4. Data Fetching / Resolver Patterns: **DataLoader** in context: instantiate per request to batch resolve calls
- [ ] 4. Data Fetching / Resolver Patterns: Model resolvers on **services** (DB adapters) rather than raw SQL in resolvers
- [ ] 5. Apollo Federation: **Subgraph** / **Supergraph**: each microservice owns a partial schema; **Apollo Router** composes the supergraph
- [ ] 5. Apollo Federation: Need @apollo/server, @apollo/subgraph, and inheritance patterns (@key, @external, @requires, @provides, @extends)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
