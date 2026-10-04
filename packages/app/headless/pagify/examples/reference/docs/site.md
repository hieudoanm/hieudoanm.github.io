---
title: site Package
description: Content discovery and navigation
---

# site Package

Discovers Markdown content, builds navigation tree, and resolves URLs.

## Functions

### Discover(root string) (\*Content, error)

Walks content directory, returns pages and assets.

```go
content, err := site.Discover("./docs")
```

### Content

```go
type Content struct {
    Pages  Pages
    Assets map[string][]byte
}
```

## Page

```go
type Page struct {
    Source       string
    URL          string
    Output       string
    Title        string
    Description  string
    Label        string
    Order        *int
    Content      []byte
    HTML         string
    Outline      markdown.Outline
}
```

## Navigation

```go
nav := site.BuildNav(pages)
```

Returns `*Nav` with `Pages` (flat list) and `Groups` (hierarchical).

## URL Resolution

- `URLForSource()` — content path → URL
- `OutputPathForSource()` — content path → output file
- `LinkResolverFor()` — resolves cross-references

## Example

```go
package main

import (
    "fmt"
    "pagify/internal/site"
)

func main() {
    content, err := site.Discover("./docs")
    if err != nil {
        panic(err)
    }

    fmt.Printf("Found %d pages:\n", len(content.Pages))
    for _, p := range content.Pages {
        fmt.Printf("  %s -> %s\n", p.Source, p.URL)
    }

    nav := site.BuildNav(content.Pages)
    fmt.Println("\nNavigation:")
    printNav(nav.Pages, 0)
}

func printNav(pages []*site.Page, indent int) {
    for _, p := range pages {
        fmt.Printf("%s- %s (%s)\n", strings.Repeat("  ", indent), p.Title, p.URL)
    }
}
```
