# 2. Setup

Focused reference for **garph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Setup

- Deps: `garph`, `graphql`, and a server adapter (pairs with `graphql-yoga` or an HTTP server via `graphql`).
- Build a `g.schema(...)` and a resolver map, then `g.resolve()` to get executable schema.

```ts
import { buildSchema, g } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// `g` is the shared type registry; buildSchema turns types + resolvers into one executable schema
const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })

createServer(yoga).listen(4000)
```
