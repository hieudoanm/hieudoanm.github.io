# Architecture

How `pagify` turns a directory of Markdown into a static site, and why the code
is split the way it is.

```text
Markdown files
      │
      ▼
internal/site          discover pages, read frontmatter, map URLs,
      │               resolve links, build the navigation tree
      ▼
internal/markdown      parse and render: HTML, heading outline,
      │               extracted title, link resolution, callouts
      ▼
internal/build         project onto the theme's view model, resolve URLs
      │               against pagify.yaml, write pages, assets, search index
      ▼
internal/theme         embedded template, stylesheet and scripts
      │
      ▼
dist/                 static HTML, CSS, JS and assets
```

Each package depends only on the one above it. Nothing below knows what a URL
looks like; nothing above knows what a tag looks like.

## internal/site — content

Answers "what pages exist and where do they go".

- **discover.go** walks the content directory once, collecting Markdown files
  and copying non-Markdown files as assets. Hidden files, `.bak`/`.backup`
  siblings, `_partials` directories and `pagify.yaml` itself are skipped.
- **page.go** splits frontmatter from the body and resolves each file to a URL
  (`guide/install.md` → `/guide/install/`) and an output path
  (`guide/install/index.html`). `index.md` and `README.md` are the landing page
  of their directory.
- **url.go** owns every URL and output-path rule, so the same file always maps
  to the same address whether it is linked, published or listed in navigation.
- **nav.go** builds the sidebar from the file tree. A directory becomes a group;
  a directory with an `index.md` becomes a group that is also a link. The root
  landing page is moved to the front, because it is the site's front door rather
  than wherever its file name sorts.
- **resolve.go** rewrites Markdown link and image destinations: `.md` links
  become clean URLs, root-relative links resolve against the content root, and
  everything passes through the base-path prefix.

## internal/markdown — parsing and rendering

Owns Goldmark and knows nothing about visual design.

- **render.go** holds the single shared Goldmark instance, configured with GFM,
  footnotes, automatic heading ids and raw HTML passthrough.
- **transform.go** is one AST walk doing three jobs: collecting the heading
  outline, running link destinations through the caller's resolver, and marking
  GitHub-style callout blockquotes.
- **callout.go** renders a marked blockquote as the theme's `<aside>`.
- **title.go** lifts a document's leading level-1 heading out of the body and
  hands it back as the page title, so the theme's header and the body never
  print it twice.
- **outline.go** flattens heading inline markup into plain text for navigation.

## internal/build — the pipeline

Ties the packages together and owns everything about one build.

- **config.go** reads the optional `pagify.yaml` and fills in defaults. A
  missing file is not an error; an unparsable one is, because silently ignoring
  it would be far more confusing than failing.
- **render.go** is the boundary between content and presentation. It projects a
  `site.Page` onto the flat, trusted-HTML view model the template consumes, and
  is the single place URLs are prefixed with the base path.
- **search.go** reduces each page's rendered HTML to plain text and writes
  `assets/search-index.json`. Script, style and `data-no-search` content is
  skipped, so generated decoration never becomes a searchable word.
- **build.go** runs the steps in order: config, discovery, render pages, write
  pages, write search index, copy assets. The output directory is replaced
  first, so a deleted page cannot survive a rebuild. When the content has no
  index page, a landing page is generated from the navigation so the site's root
  URL still resolves.

## internal/theme — presentation

The default theme is embedded in the binary with `go:embed`, so building a site
needs nothing but the `pagify` executable.

- **theme.go** loads the template and exposes its assets as an `fs.FS`.
- **default/template.html** is a semantic document: `header`, `nav`, `main`,
  `article`, `footer`, plus an on-page outline. Its data is exactly the view
  model in `build/render.go` and nothing more.
- **default/styles.css** is a design system built on custom properties, in the
  order the theme file recommends: tokens, reset, layout, header, sidebar,
  typography, links, code, tables, callouts, navigation, animations, responsive
  rules, dark mode, accessibility.
- **default/script.js** is progressive enhancement for the theme toggle, the
  mobile drawer, code-block copy buttons and wide tables. Each is a no-op when
  the file fails to load.
- **default/search.js** reads the generated index once and filters it in the
  browser. Search is a separate file because it is a separate concern, and
  because a site with no search box should not download it.

## internal/server — preview

Rebuilds on every request instead of watching the filesystem: a Markdown build
is fast, and rebuilding per request removes an entire class of missed-change
bugs. It honours `basePath`, so a site configured for a GitHub project page
previews under the same prefix it will deploy to.

## Adding a theme

A theme is a template plus an asset tree. To add one, embed it the way
`theme.Default` does and resolve it by name in `build.Build`. Nothing in
`internal/site` or `internal/markdown` needs to change, because neither knows
a theme exists.
