# dbml (Go) — CI/CD Pipeline

CI lives at the monorepo root: `.github/workflows/ci-app-headless-dbml.yaml`, which calls the shared reusable workflow `.github/workflows/ci-app-headless-template.yaml`. There is no CI configuration inside the package directory itself.

## Triggers

| Trigger | Detail |
| ------- | ------ |
| Push branches | `master`, `develop`, `hotfix/**`, `feature/**`, `renovate/**`, `dependabot/**` |
| Path filter | `packages/app/headless/dbml/languages/go/**` and the two workflow files |
| Concurrency | One run per ref; in-progress runs are cancelled |

## Jobs

| Job | Runner | Steps |
| --- | ------ | ----- |
| Go | `macos-latest` | checkout, setup Go 1.27.2, `go mod download`, `make lint`, `make test`, `make build-all`, upload `bin/*` as artifact `app-headless-dbml` |
| Publish | `ubuntu-latest` | download the artifact, prefix files `app-headless-dbml-`, delete and recreate the rolling release |

The publish job runs only when the Go job succeeds. dbml passes `rustPackage: ''`, so the template's Rust job is skipped.

## Release

- Tag: `app-headless-dbml-latest` — force-updated on every qualifying push (the publish job deletes the old release and tag, then creates a new one).
- Title: `App - Headless - DBML (latest)`.
- Release notes: "Auto-built from commit `<sha>`"; the job also inlines `docs/DOWNLOADS.md` when present, but that file does not exist in this package, so notes stay minimal.
- Published files: `app-headless-dbml-dbml-linux-amd64`, `-linux-arm64`, `-darwin-amd64`, `-darwin-arm64`.

## Pipeline checklist

- [ ] Push to a triggering branch with a change under the package path.
- [ ] Go job is green (lint, test, cross-build).
- [ ] Artifact `app-headless-dbml` uploaded with four binaries.
- [ ] Release tag `app-headless-dbml-latest` points at the new commit.

## Notes

- CI is the authoritative quality gate; the local Husky hook (`pnpm run lint` / `typecheck` / `format`, JS/TS packages only) is a fast check that never touches this Go package (see [`00-overview.md`](../00-overview.md) §8).
- The pipeline has no container-image publish step and no deployment step: images are built locally or by consumers (see [`container.md`](container.md)).
- Coverage reports, performance gates, and database-backed integration tests are not part of the pipeline.

## Cross-references

- Deployment: [`11-deployment.md`](../11-deployment.md)
- Implementation plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- Testing strategy: [`09-testing-strategy.md`](../09-testing-strategy.md)
