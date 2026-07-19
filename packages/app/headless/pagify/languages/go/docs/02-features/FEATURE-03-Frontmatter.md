# pagify — FEATURE-03: Frontmatter Metadata

## 1. Summary

YAML frontmatter provides per-page metadata without requiring a site config.

## 2. Behaviour

- `internal/page` splits frontmatter from the body.
- Supported metadata: `title`, `description`, `order`, `draft`, `navigation label`, `layout`.
- A missing frontmatter block is not an error.

## 3. Acceptance criteria

- A page with `title:` in frontmatter uses it as the page title.
- Pages without frontmatter fall back to the leading heading / file name.
- Draft pages can be excluded via configuration.
