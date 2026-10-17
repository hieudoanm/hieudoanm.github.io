# pagify — Critical Test Scenarios

| Scenario                                 | Expectation                                  |
| ---------------------------------------- | -------------------------------------------- |
| Markdown → HTML                          | GFM tables, task lists, footnotes, callouts  |
| File discovery                           | Hidden files and `_partials` skipped         |
| URL resolution                           | `guide/install.md` → `/guide/install/`       |
| Navigation                               | Root landing page first; groups from dirs    |
| Frontmatter                              | `title`, `draft`, `order` respected          |
| Search index                             | `assets/search-index.json` written           |
| Clean rebuild                            | Deleted pages do not survive                 |
| Serve confinement                        | API cannot read outside `--root`             |
| No-JavaScript usability                  | Site readable without JS                     |
| Theme toggle                             | Light/dark switch and persistence            |
