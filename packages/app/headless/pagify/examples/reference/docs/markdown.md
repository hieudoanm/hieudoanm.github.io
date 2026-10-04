---
title: markdown Package
description: Markdown rendering with Goldmark
---

# markdown Package

Markdown rendering using Goldmark v2 with GitHub-flavored extensions.

## Types

### Renderer

```go
r := markdown.NewRenderer()
doc, err := r.Render([]byte("# Hello"), nil)
```

### Document

```go
type Document struct {
    HTML    []byte
    Outline Outline
    Title   string
}
```

### Resolver

```go
type Resolver func(destination []byte) []byte
```

Rewrites link/image destinations during rendering.

## Extensions Enabled

- GFM (tables, task lists, strikethrough, autolinks)
- Footnotes
- Auto heading IDs
- Raw HTML passthrough
- Callouts (`> [!NOTE]`, etc.)

## Example

```go
package main

import (
    "fmt"
    "pagify/internal/markdown"
)

func main() {
    r := markdown.NewRenderer()

    src := []byte(`
# Title

> [!TIP]
> This is a tip.

## Section

Content here.
    `)

    doc, err := r.Render(src, nil)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(doc.HTML))
    fmt.Println("Title:", doc.Title)
    for _, h := range doc.Outline {
        fmt.Printf("  H%d: %s (%s)\n", h.Level, h.Text, h.ID)
    }
}
```

## Frontmatter

Frontmatter is parsed separately using `SplitFrontmatter()`:

```go
fm, body, ok, err := markdown.SplitFrontmatter(src)
```
