---
name: "graphql-go"
description: "graphql-go — the reference GraphQL server implementation for Go (graphql-go/graphql library), building schemas and resolving field functions."
tags:
  - "programming"
  - "graphql"
  - "go"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting graphql-go in a project."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../../SKILL.md"
  - "../../typescript/apollo/server/SKILL.md"
  - "../../typescript/garph/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
`graphql-go/graphql` is a **Go implementation of GraphQL Server (reference JS implementation semantics)**, letting you define a typed schema and resolvers natively in Go without codegen.

## 1. Core Concepts

- **Schema definition in Go**: you build `graphql.Schema` from `graphql.Object`s, field definitions, and resolver functions.
- **Resolvers are plain Go functions**: `Resolve func(p graphql.ResolveParams) (interface{}, error)` returning a value for each field.
- **Arguments** (input) are declared per field via `graphql.ArgumentConfig{ Type: graphql.NewNonNull(graphql.String) }`.
- Queries execute into a response matching requested fields; errors propagate per nullable fields.

## 2. Defining a Schema

- Define types: `graphql.NewObject(graphql.ObjectConfig{ Name: "User", Fields: graphql.Fields{ "name": &graphql.Field{ Type: graphql.String, Resolve: ... } }})`.

```go
package users

import "github.com/graphql-go/graphql"

// newSchema builds the schema once at startup; the result is immutable and safe to share.
func newSchema() (graphql.Schema, error) {
	userType := graphql.NewObject(graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id":    &graphql.Field{Type: graphql.NewNonNull(graphql.ID)},
			"name":  &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
			"email": &graphql.Field{Type: graphql.NewNonNull(graphql.String)},
		},
	})
	queryType := graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"user": &graphql.Field{
				Type:    userType,
				Args:    graphql.FieldConfigArgument{"id": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.ID)}},
				Resolve: resolveUser,
			},
		},
	})

	return graphql.NewSchema(graphql.SchemaConfig{Query: queryType})
}
```

- Wire root query object into `graphql.NewSchema(graphql.SchemaConfig{ Query: query })`.
- Execute with `result := graphql.Do(graphql.Params{ Schema: schema, RequestString: query, VariableValues: vars })`; check `result.Errors`.

```go
package users

import (
	"context"
	"log"

	"github.com/graphql-go/graphql"
)

// execute runs one operation; the schema is built once and shared by every request.
func execute(ctx context.Context, schema graphql.Schema, query string, vars map[string]interface{}) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:         schema,
		RequestString:  query,
		VariableValues: vars,
		Context:        ctx, // request-scoped ctx: auth, tracing, loaders
	})
	for _, err := range result.Errors {
		log.Printf("graphql error: %v", err) // never swallow result.Errors
	}

	return result
}
```

## 3. Types and Inputs

- Scalars: `graphql.String`, `graphql.Int`, `graphql.Float`, `graphql.Boolean`, `graphql.ID`.
- Enums: `graphql.NewEnum(...)` with `ValueMap`.
- Input objects: `graphql.NewInputObject(...)` for mutations' arguments.
- Interfaces/unions: `graphql.NewInterface(...)` + `IsTypeOf` or `ResolveType` on objects.
- Nullability: `graphql.NewNonNull(type)` (e.g., error fields), `graphql.NewList(type)` for arrays.

## 4. Resolvers

- Access params: `graphql.ResolveParams{ Args, Source, Context, Info }`.

```go
package users

import (
	"context"
	"errors"
	"fmt"

	"github.com/graphql-go/graphql"
)

var errUserNotFound = errors.New("user not found") // sentinel returned by userSvc

// resolveUser returns the row for one user. Args arrive as interface{}, so assert then validate.
func resolveUser(p graphql.ResolveParams) (interface{}, error) {
	id, ok := p.Args["id"].(string)
	if !ok || id == "" {
		return nil, fmt.Errorf("id must be a non-empty string")
	}

	ctx, ok := p.Context.(context.Context)
	if !ok {
		return nil, fmt.Errorf("missing request context")
	}

	user, err := userSvc.GetByID(ctx, id) // service layer, not raw SQL in the resolver
	if errors.Is(err, errUserNotFound) {
		return nil, nil // nullable field: return nil, do not raise an error
	}
	if err != nil {
		return nil, fmt.Errorf("get user %s: %w", id, err) // wrap, never swallow
	}

	return user, nil
}
```

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
