# Backbone — Local Development

## Setup

Go 1.26+ is required.

## Commands

```bash
# repo root — the Go module lives under packages/app/headless/backbone/go
cd packages/app/headless/backbone/go

# Format
gofmt -w .

# Lint
go vet ./...

# Test
go test ./...

# Test (E2E)
go test ./tests/

# Build
make build        # bin/backbone (CGO disabled)
make build-all    # Cross-compile 4 platforms into bin/

# Run
./bin/backbone
# → http://localhost:8080

# Install
make install      # Install to ~/bin/backbone
```

## Before you open a pull request

```bash
gofmt -l .
go vet ./...
go test ./...
go build ./...
```

All must be clean. Add a test alongside every change in behaviour.

## Environment variables

| Env                    | Default                           | Purpose                       |
| ---------------------- | --------------------------------- | ----------------------------- |
| `PORT`                 | `8080`                            | HTTP listen port              |
| `BACKBONE_DATA`        | `~/.backbone`                     | Data dir (`data.db`, uploads) |
| `JWT_SECRET`           | `dev-secret-change-in-production` | JWT signing key               |
| `BACKBONE_SECRETS_KEY` | (generated file)                  | AES-256 key for Secrets       |
