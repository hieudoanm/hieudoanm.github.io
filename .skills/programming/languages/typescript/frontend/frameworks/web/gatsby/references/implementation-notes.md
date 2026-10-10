# Implementation notes

Focused reference for **gatsby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
