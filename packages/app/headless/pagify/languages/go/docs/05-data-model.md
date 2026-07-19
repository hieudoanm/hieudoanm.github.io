# pagify — Data Model

## 1. Purpose

This document describes the content model, URL rules, and schema that pagify builds from a directory of Markdown files.

pagify has no database. The "data model" is the in-memory representation of a site: pages, frontmatter, URLs, navigation, assets, and the search index.

## 2. Content Model

### 2.1 Page

A page is the unit of content. Each Markdown file becomes one `site.Page`:

| Field         | Type     | Source                            |
| ------------- | -------- | --------------------------------- |
| `Path`        | string   | Source file path                  |
| `URL`         | string   | Resolved clean URL                |
| `Output`      | string   | Output path within `dist/`        |
| `Title`       | string   | Frontmatter `title` or leading H1 |
| `Description` | string   | Frontmatter `description`         |
| `Body`        | string   | Rendered HTML                     |
| `Frontmatter` | map      | Parsed YAML frontmatter           |
| `Outline`     | []Heading| Extracted heading outline         |
| `Draft`       | bool     | Frontmatter `draft`               |

### 2.2 Heading

Each heading in the outline:

| Field   | Type     | Source              |
| ------- | -------- | ------------------- |
| `Level` | int      | Heading level (1-6) |
| `Text`  | string   | Plain-text heading  |
| `ID`    | string   | Auto-generated anchor ID |

### 2.3 Navigation

Navigation is a tree of groups derived from the file tree:

| Field       | Type       | Source                        |
| ----------- | ---------- | ----------------------------- |
| `Label`     | string     | Directory or page label       |
| `URL`       | string     | Group link or page URL        |
| `Pages`     | []Page     | Child pages                   |
| `Groups`    | []Group    | Child groups                  |
| `IsLink`    | bool       | Whether the group is a link   |

### 2.4 Search Index

Each page contributes a search document:

| Field     | Type     | Source                    |
| --------- | -------- | ------------------------- |
| `URL`     | string   | Page URL                  |
| `Title`   | string   | Page title                |
| `Content` | string   | Plain-text rendered body  |

## 3. URL Rules

| Source file           | URL               | Output path              |
| --------------------- | ----------------- | ------------------------ |
| `index.md`            | `/`               | `index.html`             |
| `README.md`           | `/`               | `index.html`             |
| `about.md`            | `/about/`         | `about/index.html`       |
| `guides/install.md`   | `/guides/install/`| `guides/install/index.html`|

Root-relative links resolve against the content root. All destinations pass through the base-path prefix.

## 4. Frontmatter Schema

| Field             | Type     | Default     | Purpose                        |
| ----------------- | -------- | ----------- | ------------------------------ |
| `title`           | string   | leading H1  | Page title                     |
| `description`     | string   | ""          | Page description / meta        |
| `order`           | int      | 0           | Sort order within a group      |
| `draft`           | bool     | false       | Exclude from build when true   |
| `navigation label`| string   | file name   | Label shown in navigation      |
| `layout`          | string   | default     | Theme layout to use            |

## 5. Asset Handling

Non-Markdown files are copied to `dist/` preserving relative paths. Hidden files, `.bak`/`.backup` siblings, `_partials` directories, and `pagify.yaml` are skipped.

## 6. Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- API: [`06-api-specification.md`](06-api-specification.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
