# Gatsby Best Practices: Basic Usage

Best practices for building static websites with Gatsby. Use when creating, structuring, or reviewing Gatsby applications — covers data sourcing, pages, components, performance, and deployment.

## Scenario

Use this example as a starting point when applying **gatsby-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```javascript
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <header>{data.site.siteMetadata.title}</header>
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
