# dgraph: Workflow Checklist

A practical run sheet for applying [dgraph](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: Data is stored as **triples**: subject → predicate → object, forming a native graph without a separate schema layer
- [ ] 1. Core Concepts: **GraphQL** is the recommended query/mutation interface; DQL is the lower-level native language
- [ ] 2. GraphQL Usage: Define types with fields and directives: @id for unique fields, @index(trigram, hash) for filterable fields
- [ ] 2. GraphQL Usage: Query shapes mirror GraphQL; Dgraph auto-generates resolvers for filter, order, first/offset
- [ ] 3. DQL (Native Query Language): DQL is JSON-like and closer to the data model: query { user(func: eq(name, "Alice")) { name friends { name } } }
- [ ] 3. DQL (Native Query Language): Supports filters, pagination, sorting, and deep traversals with @recurse(depth: N)
- [ ] 4. Schema and Indexing: Indexes: @index(hash), @index(exact), @index(trigram), @index(term), @index(fulltext)
- [ ] 4. Schema and Indexing: Choose the index by query pattern: hash for exact equality, trigram for substring/regex, term for word-based search, fulltext for search
- [ ] 5. Operations and Architecture: Deploy as a cluster: dgraph-ratel for the UI, dgraph zero for metadata, dgraph alpha for data
- [ ] 5. Operations and Architecture: Horizontal scale via --shards N and --replicas R; data is split across Alpha groups

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
