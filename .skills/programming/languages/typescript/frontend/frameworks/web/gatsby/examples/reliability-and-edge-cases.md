# Gatsby Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Image optimization** — use gatsby-plugin-image:
- **Code splitting** — Gatsby automatically code-splits routes
- **Lazy loading** — use React.lazy for lazy loading:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for gatsby-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
