# 3. Definitions

Focused reference for **garph**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Definitions

- Scalars: `g.string()`, `g.int()`, `g.float()`, `g.boolean()`, `g.id()`.

```ts
import { g } from 'garph'

const roleType = g.enumType('Role', ['ADMIN', 'EDITOR', 'VIEWER'] as const) // as const for inference

// Garph fields are non-null by default; `.optional()` opts into nullability
const userType = g.type('User', {
  id: g.id(),
  name: g.string(),
  role: g.ref(roleType),
  posts: g.ref(() => postType).list(), // thunk form breaks the cycle
})

const postType = g.type('Post', {
  id: g.id(),
  title: g.string(),
  author: g.ref(userType),
  publishedAt: g.string().optional(),
})

const createUserInput = g.inputType('CreateUserInput', {
  name: g.string(),
  role: g.ref(roleType).optional(),
})

const queryType = g.type('Query', { user: g.ref(userType).args({ id: g.id() }) })
const mutationType = g.type('Mutation', { createUser: g.ref(userType).args({ input: g.ref(createUserInput) }) })
```

- Types: `g.type('User', { name: g.string(), age: g.int().optional() })` (`Nullable`/`optional` modifiers).
- Inputs: `g.input('UserInput', { name: g.string() })` for mutations args.
- Enums: `g.enum('Role', [...], { 'ADMIN': 'admin', ... })` — last arg maps names to values.
- Extensions: `g.ref('User')` to reference types in fields; `g.list(...)` for arrays.
