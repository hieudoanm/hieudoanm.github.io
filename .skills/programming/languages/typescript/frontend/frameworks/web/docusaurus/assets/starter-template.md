# Docusaurus Best Practices: Starter Template

A reusable starting point derived from the **4. Configuration** section of [Docusaurus Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
module.exports = {
  title: 'My Project Docs',
  url: 'https://myproject.docs',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onUnusedIcons: 'warn',
  theme: {
    customCss: require('./theme/src/css/custom.css'),
  },
};
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
