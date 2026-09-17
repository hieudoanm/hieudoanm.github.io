---
title: Writing Markdown for pagify
description: Tips and best practices for authoring content with pagify
date: 2024-01-20
category: tutorials
author: hieudoanm
---

# Writing Markdown for pagify

pagify uses [Goldmark](https://github.com/yuin/goldmark) with GitHub-flavored Markdown extensions. Here's a guide to writing great content.

## Headings

Use standard ATX headings:

```markdown
# H1 - Page title (auto-removed from body)

## H2 - Section

### H3 - Subsection
```

The first H1 becomes the page title and is rendered in the header, not the body.

## Callouts

Use GitHub-style callouts for notes, tips, warnings:

```markdown
> [!NOTE]
> This is a note.

> [!TIP]
> Pro tip!

> [!WARNING]
> Watch out.

> [!DANGER]
> Critical issue.
```

Aliases: `info`, `success`, `check`, `caution`, `attention`, `error`.

## Code Blocks

Fenced code blocks with language tags get syntax highlighting:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, pagify!")
}
```

## Tables

```markdown
| Feature  | Supported |
| -------- | --------- |
| Tables   | ✅        |
| Math     | ❌        |
| Diagrams | ❌        |
```

## Cross-References

Link to other pages using relative paths:

```markdown
[Getting Started](getting-started.md)
[API Reference](../reference/api.md)
```

pagify rewrites these to clean URLs automatically.

## Frontmatter

Add metadata to your pages:

```yaml
---
title: Custom Title
description: SEO description
order: 1
label: Short Label
draft: false
---
```

## Images

Place images in your content directory:

```markdown
![Alt text](diagram.png)
```

Images are copied to `assets/` and paths rewritten.

## Best Practices

1. **One H1 per page** — Let pagify handle the title
2. **Use descriptive link text** — Avoid "click here"
3. **Keep lines under 120 chars** — Easier to review diffs
4. **Use callouts** — Highlight important information
5. **Add descriptions** — Improves SEO and search results

---

_Happy writing!_
