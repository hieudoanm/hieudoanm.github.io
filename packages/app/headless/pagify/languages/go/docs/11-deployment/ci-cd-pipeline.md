# pagify — CI/CD Pipeline

GitHub Actions quality gate and cross-platform release pipeline.

## Quality gate

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.23' }
      - run: go fmt ./...
      - run: go vet ./...
      - run: go test ./...
      - run: go build ./...
```

## Release

```yaml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - goos: linux
            goarch: amd64
          - goos: linux
            goarch: arm64
          - goos: darwin
            goarch: amd64
          - goos: darwin
            goarch: arm64
          - goos: windows
            goarch: amd64
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.23' }
      - run: CGO_ENABLED=0 GOOS=${{ matrix.goos }} GOARCH=${{ matrix.goarch }} go build -ldflags="-s -w" -o pagify${{ matrix.goos == 'windows' && '.exe' || '' }} .
      - uses: actions/upload-artifact@v4
        with:
          name: pagify-${{ matrix.goos }}-${{ matrix.goarch }}
          path: pagify*
  release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
      - run: sha256sum * > checksums.txt
      - uses: softprops/action-gh-release@v1
        with:
          files: |
            pagify*/*
            checksums.txt
```

## Acceptance criteria

- `go fmt`, `go vet`, `go test`, `go build` are clean on every push.
- Cross-platform builds succeed for each tagged release.
- Release assets include SHA256 checksums.
