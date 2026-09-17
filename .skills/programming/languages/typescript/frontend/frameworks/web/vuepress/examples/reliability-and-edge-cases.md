# VuePress Best Practices: 1. Core Stack

## Source guidance

This example applies the **1. Core Stack** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- VuePress **2.x** (latest stable)
- Vue **3.x**
- TypeScript **strict mode**
- Markdown for content
- Node.js **LTS**

## Example

```bash
npm init vuepress@latest my-docs
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for vuepress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
