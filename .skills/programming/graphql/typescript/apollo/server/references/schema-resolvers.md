# 2. Schema & Resolvers

Focused reference for **apollo-server**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Schema & Resolvers

- **typeDefs**: SDL via `gql` template literal (Tagged template with the `graphql` package) or a schema string.
- **resolvers**: object mapping field to functions; type-wise, return promises for async work.
- Groups by type: `Query`, `Mutation`, plus per-type resolvers for nested fields (avoid N+1).
- **Arguments/inputs**: validate via SDL types; non-null (`!`) where required.

```graphql
type User {
  id: ID!
  name: String!
  posts(first: Int = 10, after: String): [Post!]!
}
type Post {
  id: ID!
  title: String!
  author: User!
}
input CreateUserInput {
  name: String!
  email: String!
}
type Query {
  user(id: ID!): User
}
type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

- **Context**: per-request object (auth user, DB client, DataLoaders) from `context: async ({ req }) => ({ user, loaders })`.

```ts
import DataLoader from 'dataloader'
import { GraphQLError } from 'graphql'

type Context = {
  user: SessionUser
  userService: UserService
  loaders: { userById: DataLoader<string, User> }
}

const resolvers = {
  Query: {
    user: async (_parent: unknown, { id }: { id: string }, context: Context) => {
      if (id === '') {
        throw new GraphQLError('id must not be empty', { extensions: { code: 'BAD_USER_INPUT' } })
      }
      return context.loaders.userById.load(id)
    },
  },
  Mutation: {
    createUser: (_parent, { input }: { input: CreateUserInput }, context: Context) =>
      context.userService.create(input),
  },
}

// Fresh loader per request: batches and dedupes every userById lookup in the operation
const createContext = (user: SessionUser, userService: UserService): Context => ({
  user,
  userService,
  loaders: { userById: new DataLoader<string, User>((ids) => userService.findByIds([...ids])) },
})
```
