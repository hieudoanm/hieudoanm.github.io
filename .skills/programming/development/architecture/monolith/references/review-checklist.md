# Review checklist

Focused reference for **monolith-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 10. Deployment

- **Containerization** — use Docker for consistent deployment:

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

- **CI/CD** — implement continuous integration and deployment
- **Environment configuration** — manage environment-specific configuration
- **Health checks** — implement health check endpoints

---

## 11. General Rules of Thumb

- **Clear module boundaries** — define and respect module boundaries
- **Layered architecture** — maintain clear separation between layers
- **Domain-driven design** — organize around business domains
- **Database optimization** — optimize database performance
- **Scalability planning** — plan for horizontal and vertical scaling
- **Evolutionary design** — design for potential future decomposition

---

## Quick-Start Checklist

- [ ] Layered architecture with clear boundaries
- [ ] Domain-driven organization
- [ ] RESTful API design
- [ ] Database schema organized by domain
- [ ] Caching strategy implemented
- [ ] Comprehensive testing
- [ ] Structured logging
- [ ] Monitoring and alerting
- [ ] Containerized deployment
- [ ] CI/CD pipeline
