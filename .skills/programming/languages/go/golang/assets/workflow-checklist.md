# Go Best Practices: Workflow Checklist

A practical run sheet for applying [Go Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **internal/ by default.** Only promote a package out of internal/ when something outside the module genuinely needs to import it
- [ ] 1. Project Structure: **main.go stays thin** — parse flags/config, wire dependencies, call into internal/ packages. No business logic in main
- [ ] 2. Error Handling: **Errors are values, not exceptions.** Check them immediately after the call that can produce them — don't defer checking or collect several before handling
- [ ] 2. Error Handling: **Wrap with context using fmt.Errorf("...: %w", err)** — preserves the chain for errors.Is/errors.As while adding what the caller needs to know
- [ ] 4. Concurrency: **Don't start a goroutine without knowing how it stops.** Every goroutine needs a clear exit path — via context cancellation, channel close, or sync.WaitGroup
- [ ] 4. Concurrency: **Pass context.Context as the first parameter** to any function that does I/O or could be long-running: func Fetch(ctx context.Context, url string) (...)
- [ ] 5. Testing: **Table-driven tests** are the idiomatic default for anything with multiple input/output cases:
- [ ] 5. Testing: Test files live next to the code (foo.go → foo_test.go), same package (white-box) unless testing only the public API (package foo_test, black-box) — use black-box for library packages to catch API usability issues
- [ ] 6. Formatting & Tooling (Non-negotiable): **gofmt/goimports on save** — there is no style debate to have in Go; the formatter is the style guide
- [ ] 6. Formatting & Tooling (Non-negotiable): **go vet** and **staticcheck** in CI — catch real bugs (unreachable code, printf format mismatches, unused results)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
