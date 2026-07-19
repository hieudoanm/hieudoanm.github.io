# Graphql Go: 2. Defining a Schema

## Source guidance

This example applies the **2. Defining a Schema** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Define types: `graphql.NewObject(graphql.ObjectConfig{ Name: "User", Fields: graphql.Fields{ "name": &graphql.Field{ Type: graphql.String, Resolve: ... } }})`.
- Wire root query object into `graphql.NewSchema(graphql.SchemaConfig{ Query: query })`.
- Execute with `result := graphql.Do(graphql.Params{ Schema: schema, RequestString: query, VariableValues: vars })`; check `result.Errors`.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for graphql-go.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
