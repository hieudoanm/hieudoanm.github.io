# dbml (Go) — Local Development

## Setup

Go 1.27.2 or newer is required (`go.mod` pins `go 1.27.2`). There is nothing else to install: the toolchain is the Go standard library plus Cobra and Gorilla Mux; no Node.js, npm, or external diagram tooling is involved.

## Daily commands

All targets are Makefile-driven from the package root:

```bash
make help       # list targets
make all        # format + lint + test + build
make format     # go fmt ./...
make lint       # go vet ./...
make test       # go test ./...
make build      # CGO_ENABLED=0 go build -o bin/dbml .
make build-all  # cross-compile 4 platforms into bin/
make coverage   # HTML coverage report under coverage/
make tidy       # go mod tidy
make install    # build into $(HOME)/bin/dbml
make clean      # remove bin/ and coverage/
```

## Running the tool locally

```bash
./bin/dbml all schema.dbml --output-dir ./output
./bin/dbml serve --port 8080        # REST API, add --debug for debug logs
./bin/dbml mcp serve                # MCP server on stdio
```

## Container workflow

```bash
docker build -t dbml .
docker run --rm -p 8080:8080 -v "$PWD:/work:ro" dbml serve --port 8080
```

[`11-deployment.md`](../11-deployment.md) mentions Docker Compose for local development, but no Compose file ships in this repository; use `docker build`/`docker run` or the Makefile targets directly. A Compose setup is aspirational, not implemented.

## Before you open a pull request

```bash
make format
make lint
make test
make build
```

All must be clean, and a test should accompany every behaviour change. When a change touches generated SQL, Mermaid, or SVG, verify the generated output manually (workflow in `AGENTS.md`). CI repeats these gates as the authoritative check (see [`ci-cd-pipeline.md`](ci-cd-pipeline.md)).

## Cross-references

- Deployment: [`11-deployment.md`](../11-deployment.md)
- Implementation plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
