# pagify — Testing Strategy

Test layers, fixtures, acceptance criteria, and quality gates for pagify.

## Test layers

| Layer              | Target                                   | Tools            |
| ------------------ | ---------------------------------------- | ---------------- |
| Unit               | Markdown parsing, discovery, URLs, nav   | Go testing       |
| Integration        | Build pipeline, template rendering       | Go testing       |
| Contract           | JSON API endpoints                       | Go testing       |
| E2E                | `pagify build` → static `dist/`          | Go testing       |
| Security           | Path confinement in `serve`              | Go testing       |
| Performance        | Build speed, output size                 | Go testing       |

## 1. Test Layers

See [`09-testing-strategy/01-test-layers.md`](09-testing-strategy/01-test-layers.md).

## 2. Test Fixtures

See [`09-testing-strategy/02-test-fixtures.md`](09-testing-strategy/02-test-fixtures.md).

## 3. Test Organization

See [`09-testing-strategy/03-test-organization.md`](09-testing-strategy/03-test-organization.md).

## 4. Quality Gates

See [`09-testing-strategy/04-quality-gates.md`](09-testing-strategy/04-quality-gates.md).

## 5. Critical Test Scenarios

See [`09-testing-strategy/05-critical-test-scenarios.md`](09-testing-strategy/05-critical-test-scenarios.md).

## 6. Definition of Done

See [`09-testing-strategy/06-definition-of-done.md`](09-testing-strategy/06-definition-of-done.md).

## Key targets

- Build is fast enough to rebuild on every preview request.
- Generated sites work without JavaScript.
- Table-driven Go tests cover behaviour, not implementation.
- CI runs `go fmt`, `go vet`, `go test`.

## Cross-references

- Requirements: [`01-requirements.md`](01-requirements.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
- Implementation plan: [`10-implementation-plan.md`](10-implementation-plan.md)
