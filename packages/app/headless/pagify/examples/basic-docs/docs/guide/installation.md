# Installation

## Requirements

- Go 1.21+ (for building from source)
- No Node.js, npm, or Python required

## Methods

### Go Install (Recommended)

```bash
go install github.com/hieudoanm/pagify@latest
```

Ensure `$(go env GOPATH)/bin` is in your `$PATH`.

### Build from Source

```bash
git clone https://github.com/hieudoanm/pagify
cd pagify
make build
./bin/pagify --help
```

### Homebrew (macOS)

```bash
brew tap hieudoanm/pagify
brew install pagify
```

## Verify Installation

```bash
pagify --version
```

Should output something like `pagify version 0.1.0`.
