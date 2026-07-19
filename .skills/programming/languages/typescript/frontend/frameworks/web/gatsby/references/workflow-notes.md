# Workflow notes

Focused reference for **gatsby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
