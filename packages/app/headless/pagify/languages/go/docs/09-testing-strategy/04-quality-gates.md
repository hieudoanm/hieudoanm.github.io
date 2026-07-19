# pagify — Quality Gates

| Gate       | Command                  |
| ---------- | ------------------------ |
| Format     | `go fmt ./...`           |
| Vet        | `go vet ./...`           |
| Test       | `go test ./...`          |
| Build      | `go build ./...`         |

All four must be clean before a pull request is merged. Add a test alongside every change in behaviour.
