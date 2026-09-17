# pagify — Deployment

Deployment strategy for pagify: static `dist/` output, CI quality gates, cross-platform releases, and local development.

## Options

| Option | Description                                               |
| ------ | ----------------------------------------------------------|
| Local  | `pagify build ./docs` → static `dist/` directory          |
| Static host | Deploy `dist/` to GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any web server |
| CI     | GitHub Actions quality gates and cross-platform releases  |

## Cross-references

- [`11-deployment/ci-cd-pipeline.md`](11-deployment/ci-cd-pipeline.md) — CI pipeline
- [`11-deployment/local-development.md`](11-deployment/local-development.md) — local development
- [`10-implementation-plan.md`](10-implementation-plan.md) — release phase
- [`12-operations.md`](12-operations.md) — ongoing operations
