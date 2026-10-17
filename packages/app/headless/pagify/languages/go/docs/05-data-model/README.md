# pagify — Data Model Index

This directory documents the internal packages that make up the pagify data model.

| Package                            | Responsibility                                |
| ---------------------------------- | --------------------------------------------- |
| [`site/`](site/)                   | Pages, frontmatter, URLs, navigation tree     |
| [`markdown/`](markdown/)           | Parsing, rendering, callouts, headings        |
| [`build/`](build/)                 | Pipeline, view model, search index, assets    |
| [`theme/`](theme/)                 | Embedded template, stylesheet, scripts        |
| [`server/`](server/)               | Preview and JSON API                          |
| [`workspace/`](workspace/)         | Path confinement for the API                  |

See [`05-data-model.md`](../05-data-model.md) for the consolidated data model.
