# Docker Best Practices: Starter Template

A reusable starting point derived from the **2. Dockerfile Structure** section of [Docker Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```dockerfile
# Good - Changes rarely
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Changes frequently
COPY . .
RUN npm run build
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
