# Backbone — FEATURE-19: CI Pipeline

## 1. Summary

Reusable GitHub Actions Go template with ci and publish stages.

## 2. Behaviour

- `.github/workflows/ci-app-headless-backbone.yaml`.
- `ci` stage: gofmt check, `make lint`, `make test`, `make build-all`, upload `bin/*`.
- `publish` stage: rolling GitHub Release from uploaded binaries.
- Release tag `app-headless-backbone-latest` force-updated on every push.

## 3. Acceptance criteria

- CI passes on every push.
- Four platform binaries published as release assets.
- Download URL points at the newest build.
