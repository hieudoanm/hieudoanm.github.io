# pagify — Local Development

## Setup

Go 1.27 or newer is required. There is nothing to install beyond Go: the default theme is embedded in the binary, so no Node.js, npm, or frontend toolchain is involved.

## Commands

```bash
# Format
go fmt ./...

# Lint
go vet ./...

# Test
go test ./...

# Build
go build -o pagify .

# Build a site
./pagify build ./docs

# Preview locally
./pagify preview ./docs

# Serve JSON API
./pagify serve
```

## Before you open a pull request

```bash
go fmt ./...
go vet ./...
go test ./...
go build ./...
```

All must be clean. Add a test alongside every change in behaviour.
