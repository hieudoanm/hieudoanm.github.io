# Docusaurus Best Practices: 2. MDX & Content

## Scenario

A project is working on **2. mdx & content** for Docusaurus Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Use MDX for interactive examples** — import React components directly in Markdown (`import Tabs from '@theme/Tabs'`).
- **Admonitions for callouts** — `:::tip`, `:::note`, `:::warning`, `:::danger` for structured emphasis.
- **`tabs` component for multi-language examples** — `import Tabs from '@theme/Tabs'` with `import CodeBlock from '@theme/CodeBlock'`.
// JS example
// TS example
- **`docker run` version bumps** — `npm run docusaurus docs:version 2.0` freezes a snapshot and creates a versioned docset.
- **`versioned docs/`** — each version gets its own `versioned_docs/...` directory; don't edit shared docs across versions.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. MDX & Content** section of [SKILL.md](../SKILL.md).
