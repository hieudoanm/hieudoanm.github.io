# 2. Defining a Schema

Focused reference for **graphql-go**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
