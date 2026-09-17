# pagify — Test Layers

| Layer              | Target                                   | Tools            |
| ------------------ | ---------------------------------------- | ---------------- |
| Unit               | Markdown parsing, discovery, URLs, nav   | Go testing       |
| Integration        | Build pipeline, template rendering       | Go testing       |
| Contract           | JSON API endpoints                       | Go testing       |
| E2E                | `pagify build` → static `dist/`          | Go testing       |
| Security           | Path confinement in `serve`              | Go testing       |
| Performance        | Build speed, output size                 | Go testing       |

Prefer table-driven Go tests. Tests assert observable behaviour, not implementation details.
