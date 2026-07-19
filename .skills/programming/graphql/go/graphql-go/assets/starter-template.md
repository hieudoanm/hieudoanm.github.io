# Graphql Go: Starter Template

A reusable starting point derived from the **2. Defining a Schema** section of [Graphql Go](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
