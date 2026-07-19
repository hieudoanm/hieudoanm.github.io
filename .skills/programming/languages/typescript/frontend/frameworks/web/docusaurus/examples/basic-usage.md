# Docusaurus Best Practices: Basic Usage

Best practices for Docusaurus documentation sites. Use when creating, structuring, or maintaining a Docusaurus site for project documentation.

## Scenario

Use this example as a starting point when applying **docusaurus-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
