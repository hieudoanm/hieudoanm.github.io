# Backbone — CI/CD Pipeline

Reusable GitHub Actions Go template with ci and publish stages.

## Quality gate (ci stage)

```yaml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.26' }
      - run: gofmt -l .
      - run: go vet ./...
      - run: go test ./...
      - run: make build-all
      - uses: actions/upload-artifact@v4
        with:
          name: app-headless-backbone
          path: bin/*
```

## Publish (publish stage)

```yaml
name: publish
needs: ci
runs-on: ubuntu-latest
steps:
  - uses: actions/download-artifact@v4
    with:
      name: app-headless-backbone
  - uses: softprops/action-gh-release@v1
    with:
      tag_name: app-headless-backbone-latest
      force: true
      files: |
        app-headless-backbone-backbone-linux-amd64
        app-headless-backbone-backbone-linux-arm64
        app-headless-backbone-backbone-darwin-amd64
        app-headless-backbone-backbone-darwin-arm64
```

## Acceptance criteria

- `gofmt`, `go vet`, `go test`, `make build-all` clean on every push.
- Four platform binaries published as release assets.
- Release tag `app-headless-backbone-latest` force-updated on every push.
