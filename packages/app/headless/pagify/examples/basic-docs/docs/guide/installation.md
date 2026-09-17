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

## Next Steps

- Read [Configuration](./configuration.md) to customise your site.
- Go back to the [Guide](./index.md) section landing page.
- Return to the [home page](../index.md) for an overview.
- Check [Getting Started](../getting-started.md) to create your first site.

## Related

- [Guide](./index.md)
- [Configuration](./configuration.md)
- [Getting Started](../getting-started.md)
- [Home](../index.md)