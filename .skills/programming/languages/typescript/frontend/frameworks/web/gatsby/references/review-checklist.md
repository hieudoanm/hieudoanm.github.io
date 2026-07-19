# Review checklist

Focused reference for **gatsby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
