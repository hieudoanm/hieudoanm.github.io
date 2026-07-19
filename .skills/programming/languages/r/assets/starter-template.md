# R Best Practices: Starter Template

A reusable starting point derived from the **7. Testing & Verification** section of [R Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```r
cases <- tribble(~input, ~expected,
                 "a@b.co", TRUE,
                 "nope",   FALSE)
for (i in seq_len(nrow(cases))) {
  test_that(paste("email valid", cases$input[i]), {
    expect_equal(is_valid_email(cases$input[i]), cases$expected[i])
  })
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
