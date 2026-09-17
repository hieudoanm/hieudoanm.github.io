# Go Best Practices: 5. Testing

## Source guidance

This example applies the **5. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Table-driven tests** are the idiomatic default for anything with multiple input/output cases:
- Test files live next to the code (`foo.go` → `foo_test.go`), same package (white-box) unless testing only the public API (`package foo_test`, black-box) — use black-box for library packages to catch API usability issues.
- Use `t.Helper()` in test helper functions so failures report the caller's line number.
- Use `testify/assert` sparingly — plain `if got != want { t.Errorf(...) }` is often clearer and is what most of the standard library itself uses.

## Example

This excerpt is from the cited **5. Testing** section.

```go
func TestParse(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    int
        wantErr bool
    }{
        {"valid", "42", 42, false},
        {"empty", "", 0, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Parse(tt.input)
            if (err != nil) != tt.wantErr {
                t.Fatalf("error = %v, wantErr %v", err, tt.wantErr)
            }
            if got != tt.want {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for go-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
