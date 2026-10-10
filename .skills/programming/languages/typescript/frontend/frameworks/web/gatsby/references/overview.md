# Overview

Focused reference for **gatsby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Gatsby Best Practices

Gatsby is a React-based static site generator that pulls data from various sources. Best practice is to leverage Gatsby's data layer, optimize for performance, use GraphQL for data queries, and follow Gatsby's file system conventions.

---

## 1. Core Stack

- Gatsby **latest stable**
- React **18+**
- TypeScript **strict mode**
- GraphQL for data queries
- Gatsby CLI for tooling

```bash
npm init gatsby -y my-app
```

---

## 2. Project Structure

```text
src/
├── components/           # Reusable components
│   ├── Header.js
│   └── Footer.js
├── pages/                # File-based routing
│   ├── index.js
│   └── about.js
├── templates/            # Template components
│   └── blog-post.js
├── styles/               # Global styles
│   └── global.css
└── hooks/                # Gatsby hooks
    └── gatsby-browser.js

gatsby-config.js          # Gatsby configuration
gatsby-node.js            # Build-time API
static/                   # Static assets
```

- **File-based routing** — pages in `src/pages/` become routes
- **Components** — reusable components in `src/components/`
- **Templates** — templates for programmatic page creation
- **Configuration** — `gatsby-config.js` for plugins and configuration

---

## 3. Components

- **React components** — use React components with GraphQL:

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

- **Page queries** — use page queries for page-specific data:

```javascript
export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
        }
      }
    }
  }
`
```

- **Static queries** — use static queries for component data

---

## 4. Pages
