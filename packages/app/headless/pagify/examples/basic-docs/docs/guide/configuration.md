# Configuration

Create `pagify.yaml` at your content root to customize the site. All fields are optional.

```yaml
title: My Documentation
language: en
basePath: /my-repo # For GitHub Pages project sites
theme: light # light | dark | auto
footer: '© 2024 Example'
```

## Fields

| Field      | Default        | Description                               |
| ---------- | -------------- | ----------------------------------------- |
| `title`    | Directory name | Site title in header/meta                 |
| `language` | `en`           | HTML lang attribute                       |
| `basePath` | `/`            | URL prefix for GitHub Pages project sites |
| `theme`    | `auto`         | Initial color scheme                      |
| `footer`   | —              | Footer text (supports Markdown)           |

## Example: GitHub Pages

For a repo at `github.com/user/my-docs`:

```yaml
title: My Project Docs
basePath: /my-docs
```

Then in your repo settings, enable GitHub Pages from the `dist/` folder.

## No Config Needed

A site with no `pagify.yaml` builds with sensible defaults:

- Title from directory name
- Auto theme (follows OS)
- No footer
- Root path `/`
