# Workflow notes

Focused reference for **ruby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Methods that yield use blocks with `yield` or `&block`** — blocks are the idiomatic composition tool:

```ruby
def with_retry(times: 3, &block)
  times.times do |attempt|
    begin
      return yield
    rescue TransientError
      sleep(0.1 * attempt) if attempt.positive?
    end
  end
  raise "retries exhausted"
end
```

- **Enumerable over hand-rolled loops** — `map`, `select`, `reduce`, `each_with_object`, `group_by`:

```ruby
scores = users.filter_map { |u| u.score if u.active? }.sum
```

- **`filter_map`/`tally`/`compact` over post-loop compaction; `each_with_object` for accumulator objects.**
- **`&:method` shorthand only when the method needs no args** — a probe with arguments reads clearer as an explicit block.
- **Keep blocks small** — a block over ~6 lines is a method in hiding; extract with `then`/named extraction.

---

## 4. Nil Safety & Required Values

- **Safe navigation `&.` and `||`/`nil?` for defaulting:**

```ruby
city = user&.address&.city || "unknown"
```

- **`Hash#dig`/`Array#dig` for nested data without `if a && a[:b] && a[:b][:c]`:**

```ruby
region = payload.dig(:user, :prefs, :region)
```

- **`fetch(key, default)` over `[]` for Hash reads with a guaranteed fallback** — and `Hash#fetch` raises with `raise`-less clarity.
- **Constructor params `required:`/positional required raise early** — never ship a half-built object that must rely on later mutation.
- **`nil` is data** when absence is a real state; prefer explaining it in the type/api over returning `""` placeholders.

---

## 5. Error Handling

- **Exceptions for genuine failures; custom exception classes per domain**:

```ruby
class UserNotFound < StandardError; end

def find!(id)
  record = find(id)
  raise UserNotFound, "user #{id} missing" unless record
  record
end
```

- **`begin/rescue/else/ensure` with narrow rescue classes** — `rescue StandardError` in prod is a smell; `rescue => e` only at the true boundary for conversion:
