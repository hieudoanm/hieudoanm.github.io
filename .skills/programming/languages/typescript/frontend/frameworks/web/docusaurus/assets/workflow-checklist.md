# Docusaurus Best Practices: Workflow Checklist

A practical run sheet for applying [Docusaurus Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project Structure: **docs/ folder** — place all Markdown/MDX files under docs/, organized by category folders (intro, api, guides)
- [ ] 1. Project Structure: **theme/ folder** — customize the DaisyUI theme or add custom src/css/custom.css for branding overrides
- [ ] 2. MDX & Content: **Use MDX for interactive examples** — import React components directly in Markdown (import Tabs from '@theme/Tabs')
- [ ] 2. MDX & Content: **Admonitions for callouts** — :::tip, :::note, :::warning, :::danger for structured emphasis
- [ ] 3. Versioning: **docker run version bumps** — npm run docusaurus docs:version 2.0 freezes a snapshot and creates a versioned docset
- [ ] 3. Versioning: **versioned docs/** — each version gets its own versioned_docs/... directory; don't edit shared docs across versions
- [ ] 4. Configuration: **preset: 'github'** — enables GitHub integration (Edit this page, version badges, release notes)
- [ ] 4. Configuration: **title, url, favicon** — set in docusaurus.config.js; keep url matching the repo hostname

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
