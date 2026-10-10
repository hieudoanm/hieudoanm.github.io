# garph: Basic Usage

Garph — type-safe schema-first GraphQL server for TypeScript, with full TypeScript inference and no code-gen step.

## Scenario

Use this example as a starting point when applying **garph** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { buildSchema, g } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// `g` is the shared type registry; buildSchema turns types + resolvers into one executable schema
const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })

createServer(yoga).listen(4000)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
