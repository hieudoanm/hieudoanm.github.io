---
name: graphql-go
description: graphql-go — the reference GraphQL server implementation for Go (graphql-go/graphql library), building schemas and resolving field functions.
---

`graphql-go/graphql` is a **Go implementation of GraphQL Server (reference JS implementation semantics)**, letting you define a typed schema and resolvers natively in Go without codegen.

## 1. Core Concepts

- **Schema definition in Go**: you build `graphql.Schema` from `graphql.Object`s, field definitions, and resolver functions.
- **Resolvers are plain Go functions**: `Resolve func(p graphql.ResolveParams) (interface{}, error)` returning a value for each field.
- **Arguments** (input) are declared per field via `graphql.ArgumentConfig{ Type: graphql.NewNonNull(graphql.String) }`.
- Queries execute into a response matching requested fields; errors propagate per nullable fields.

## 2. Defining a Schema

- Define types: `graphql.NewObject(graphql.ObjectConfig{ Name: "User", Fields: graphql.Fields{ "name": &graphql.Field{ Type: graphql.String, Resolve: ... } }})`.
- Wire root query object into `graphql.NewSchema(graphql.SchemaConfig{ Query: query })`.
- Execute with `result := graphql.Do(graphql.Params{ Schema: schema, RequestString: query, VariableValues: vars })`; check `result.Errors`.

## 3. Types and Inputs

- Scalars: `graphql.String`, `graphql.Int`, `graphql.Float`, `graphql.Boolean`, `graphql.ID`.
- Enums: `graphql.NewEnum(...)` with `ValueMap`.
- Input objects: `graphql.NewInputObject(...)` for mutations' arguments.
- Interfaces/unions: `graphql.NewInterface(...)` + `IsTypeOf` or `ResolveType` on objects.
- Nullability: `graphql.NewNonNull(type)` (e.g., error fields), `graphql.NewList(type)` for arrays.

## 4. Resolvers

- Access params: `graphql.ResolveParams{ Args, Source, Context, Info }`.
- Read args through `p.Args["id"]` (assert type carefully: Go `interface{}`); validate with `graphql.NewInputObject` types.
- Use `p.Context` (e.g., a request-scoped `context.Context`) for auth, tracing, DataLoader.
- Fetch N+1: loaders via `graphql-go-tools`/DataLoader pattern — batch per request tick.

## 5. Performance and Middleware

- Add field-level middleware for logging/timing: wrap Resolve functions.
- Use `graphql.Extensions` for Apollo-style federation (via `graphql-go-tools` federation composition).
- Cache: schema is immutable after creation — construct once at startup.
- Cost/limit: analyze queries manually or with `graphql-go` middleware for depth/complexity.

## 6. Common Pitfalls

- Type assertions on `p.Args["x"]` crashing if type differs → validate via the declared arg types.
- N+1 resolves by synchronous load per parent.
- Ignoring `result.Errors` when executing — client receives 500s with minimal detail.
- Missing `graphql.NewNonNull` on required args → silently coerced to null.

## General Rules of Thumb

- Define schema types and args with explicit nullability (`graphql.NewNonNull`) for the contract.
- Keep resolvers pure and fast; push heavy logic into batch loaders.
- Construct the schema once; share it across requests.
- Check `result.Errors` and log them with request context.

## Quick-Start Checklist

- [ ] Define objects, fields, args (with NewNonNull for required), enums, interfaces in Go.
- [ ] Wire root Query (and Mutation/Subscription) into NewSchema.
- [ ] Implement resolvers reading Args + p.Context; add DataLoader batching.
- [ ] Execute via `graphql.Do`; handle result.Errors.
- [ ] Serve over HTTP (`graphql-go-handler` or chi) with GET/POST support.
- [ ] Add request context (auth, tracing) via Params.Context.
- [ ] Add query depth/complexity middleware before production.