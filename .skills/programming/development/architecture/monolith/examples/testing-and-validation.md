# Monolithic Architecture Best Practices: 10. Deployment

## Source guidance

This example applies the **10. Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Containerization** — use Docker for consistent deployment:
- **CI/CD** — implement continuous integration and deployment
- **Environment configuration** — manage environment-specific configuration
- **Health checks** — implement health check endpoints

## Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for monolith-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
