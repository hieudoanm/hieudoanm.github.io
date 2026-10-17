# pagify — Tech Stack

Allowed technologies and dependency policy for pagify.

## Technology stack

| Layer            | Technology                   | Responsibility                            |
| ---------------- | ---------------------------- | ----------------------------------------- |
| CLI              | Go, Cobra                    | `build`, `preview`, `serve`, `init`       |
| Markdown         | Goldmark                     | GFM parsing and rendering                 |
| Templating       | `html/template`              | Semantic HTML generation                  |
| Assets           | `go:embed`                   | Theme embedded in the binary              |
| Search           | Client-side JavaScript       | In-browser search index filtering         |
| Containerisation | Docker                       | Optional containerised build              |
| CI/CD            | GitHub Actions               | Lint, vet, test, cross-platform builds    |
| Testing          | Go testing                   | Table-driven unit tests                   |

## Dependency policy

Before adding a dependency:

1. Check whether the standard library can solve the problem.
2. Check whether the dependency is actively maintained.
3. Check its licence.
4. Check its size and transitive dependencies.
5. Check whether it meaningfully improves the project.

Avoid dependency creep. The CLI compiles to a standalone binary with minimal runtime requirements.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Data model: [`05-data-model.md`](05-data-model.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
