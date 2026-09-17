# graphql-go: Basic Usage

graphql-go — the reference GraphQL server implementation for Go (graphql-go/graphql library), building schemas and resolving field functions.

## Scenario

Use this example as a starting point when applying **graphql-go** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Defining a Schema** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
