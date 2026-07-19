# Garph: Starter Template

A reusable starting point derived from the **2. Setup** section of [Garph](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { buildSchema, g } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// `g` is the shared type registry; buildSchema turns types + resolvers into one executable schema
const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })

createServer(yoga).listen(4000)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
