---
name: gatsby-best-practices
description: Best practices for building static websites with Gatsby. Use when creating, structuring, or reviewing Gatsby applications — covers data sourcing, pages, components, performance, and deployment.
---

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

- **File-based routing** — create pages with files:

```javascript
// src/pages/index.js
import React from 'react'

const HomePage = () => {
  return <div>Home</div>
}

export default HomePage
```

- **Programmatic pages** — create pages programmatically:

```javascript
// gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: { slug: node.frontmatter.slug }
    })
  })
}
```

- **404 page** — create a custom 404 page:

```javascript
// src/pages/404.js
import React from 'react'

const NotFoundPage = () => {
  return <div>404 - Page Not Found</div>
}

export default NotFoundPage
```

---

## 5. Data Sourcing

- **File system** — use gatsby-source-filesystem for local files:

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`
      }
    }
  ]
}
```

- **Markdown** — use gatsby-transformer-remark for Markdown:

```javascript
module.exports = {
  plugins: [
    `gatsby-transformer-remark`
  ]
}
```

- **External APIs** — use gatsby-source-graphql for external APIs:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `CMS`,
        fieldName: `cms`,
        url: `https://api.example.com/graphql`
      }
    }
  ]
}
```

---

## 6. Styling

- **CSS Modules** — use CSS Modules for scoped styles:

```javascript
import styles from './Header.module.css'

const Header = () => {
  return <header className={styles.header}>Header</header>
}
```

- **Styled Components** — use styled-components:

```javascript
import styled from 'styled-components'

const Header = styled.header`
  padding: 16px;
  background: white;
`
```

- **TailwindCSS** — use TailwindCSS:

```bash
npm install --save-dev tailwindcss
```

```javascript
import './src/styles/global.css'
```

---

## 7. Performance

- **Image optimization** — use gatsby-plugin-image:

```javascript
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const ImageComponent = ({ data }) => {
  return (
    <GatsbyImage
      image={data.file.childImageSharp.gatsbyImageData}
      alt="My image"
    />
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
```

- **Code splitting** — Gatsby automatically code-splits routes
- **Lazy loading** — use React.lazy for lazy loading:

```javascript
import React, { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

---

## 8. SEO

- **SEO component** — use gatsby-plugin-react-helmet:

```javascript
import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}
```

- **Sitemap** — use gatsby-plugin-sitemap:

```javascript
module.exports = {
  plugins: [
    `gatsby-plugin-sitemap`
  ]
}
```

- **Robots.txt** — use gatsby-plugin-robots-txt:

```javascript
module.exports = {
  plugins: [
    `gatsby-plugin-robots-txt`
  ]
}
```

---

## 9. Hooks

- **Browser hooks** — use gatsby-browser.js for client-side code:

```javascript
// gatsby-browser.js
export const onClientEntry = () => {
  console.log('Gatsby browser entry')
}
```

- **Server hooks** — use gatsby-ssr.js for server-side code:

```javascript
// gatsby-ssr.js
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="stylesheet" href="https://fonts.googleapis.com/css" />
  ])
}
```

- **Node hooks** — use gatsby-node.js for build-time code

---

## 10. Testing

- **Component testing** — test components with Jest:

```javascript
import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

test('renders header', () => {
  const { getByText } = render(<Header />)
  expect(getByText('Header')).toBeInTheDocument()
})
```

- **E2E testing** — use Cypress for E2E testing:

```javascript
describe('Homepage', () => {
  it('loads successfully', () => {
    cy.visit('/')
    cy.contains('Home')
  })
})
```

---

## 11. General Rules of Thumb

- **GraphQL** — use GraphQL for data queries
- **File-based routing** — use file-based routing
- **Performance** — optimize images and code splitting
- **SEO** — optimize for search engines
- **Plugins** — leverage Gatsby's plugin ecosystem
- **Convention over configuration** — follow Gatsby's conventions

---

## Quick-Start Checklist

- [ ] Gatsby with TypeScript strict mode
- [ ] File-based routing in `src/pages/`
- [ ] GraphQL queries for data
- [ ] gatsby-source-filesystem for local data
- [ ] gatsby-plugin-image for images
- [ ] CSS Modules or styled-components
- [ ] gatsby-plugin-react-helmet for SEO
- [ ] Programmatic page creation
- [ ] Testing setup with Jest/Cypress
- [ ] Performance optimization
