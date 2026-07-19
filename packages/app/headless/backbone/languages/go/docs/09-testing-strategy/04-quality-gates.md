# Backbone — Quality Gates

| Gate       | Command                  |
| ---------- | ------------------------ |
| Format     | `gofmt -w .`             |
| Vet        | `go vet ./...`           |
| Test       | `go test ./...`          |
| Build      | `go build ./...`         |
| All        | `make all`               |

All four must be clean before a pull request is merged. Add a test alongside every change in behaviour.
