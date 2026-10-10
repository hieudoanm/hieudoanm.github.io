# Ruby Best Practices: 5. Error Handling

## Source guidance

This example applies the **5. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions for genuine failures; custom exception classes per domain**:
- **`begin/rescue/else/ensure` with narrow rescue classes** — `rescue StandardError` in prod is a smell; `rescue => e` only at the true boundary for conversion:
- **Rethrow with `raise e` preserves origin; `raise` re-raises the current exception** — never `raise RuntimeError.new(e.message)` (loses class + trace).
- **`ensure` for guaranteed cleanup (file/connection release).**
- **No empty rescue blocks** — convert, log, or rethrow; never silently continue.

## Example

```ruby
class UserNotFound < StandardError; end

def find!(id)
  record = find(id)
  raise UserNotFound, "user #{id} missing" unless record
  record
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ruby-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
