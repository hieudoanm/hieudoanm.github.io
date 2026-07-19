# graphql-go: Workflow Checklist

A practical run sheet for applying [graphql-go](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Schema definition in Go**: you build graphql.Schema from graphql.Objects, field definitions, and resolver functions
- [ ] 1. Core Concepts: **Resolvers are plain Go functions**: Resolve func(p graphql.ResolveParams) (interface{}, error) returning a value for each field
- [ ] 2. Defining a Schema: Define types: graphql.NewObject(graphql.ObjectConfig{ Name: "User", Fields: graphql.Fields{ "name": &graphql.Field{ Type: graphql.String, Resolve: ... } }})
- [ ] 2. Defining a Schema: Wire root query object into graphql.NewSchema(graphql.SchemaConfig{ Query: query })
- [ ] 3. Types and Inputs: Scalars: graphql.String, graphql.Int, graphql.Float, graphql.Boolean, graphql.ID
- [ ] 3. Types and Inputs: Enums: graphql.NewEnum(...) with ValueMap
- [ ] 4. Resolvers: Access params: graphql.ResolveParams{ Args, Source, Context, Info }
- [ ] 4. Resolvers: Read args through p.Args["id"] (assert type carefully: Go interface{}); validate with graphql.NewInputObject types
- [ ] 5. Performance and Middleware: Add field-level middleware for logging/timing: wrap Resolve functions
- [ ] 5. Performance and Middleware: Use graphql.Extensions for Apollo-style federation (via graphql-go-tools federation composition)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
