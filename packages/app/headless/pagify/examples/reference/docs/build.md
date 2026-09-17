---
title: build Package
description: Site building pipeline
---

# build Package

The `build` package orchestrates the complete site generation pipeline.

## Functions

### Build(opts Options) (Result, error)

Main entry point. Discovers content, renders pages, writes output.

```go
result, err := build.Build(build.Options{
    ContentDir: "./docs",
    OutputDir:  "./dist",
})
```

### Options

| Field      | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| ContentDir | string | Input directory (required)  |
| OutputDir  | string | Output directory (required) |

### Result

| Field  | Type | Description                    |
| ------ | ---- | ------------------------------ |
| Pages  | int  | Number of HTML pages generated |
| Assets | int  | Number of assets copied        |

## Pipeline

1. **Load Config** — Read site config from index.md frontmatter
2. **Discover** — Find all Markdown files and assets
3. **Render** — Convert Markdown to HTML
4. **Write Pages** — Execute templates, write HTML
5. **Search Index** — Generate search-index.json
6. **Copy Assets** — Copy theme assets and user assets

## Example

```go
package main

import (
    "fmt"
    "pagify/internal/build"
)

func main() {
    result, err := build.Build(build.Options{
        ContentDir: "./docs",
        OutputDir:  "./dist",
    })
    if err != nil {
        panic(err)
    }
    fmt.Printf("Built %d pages, %d assets\n", result.Pages, result.Assets)
}
```
