# Review checklist

Focused reference for **microservices-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Containerization** — containerize each service:

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

- **Orchestration** — use Kubernetes for orchestration:

```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:1.2.3
        ports:
        - containerPort: 3000
```

- **CI/CD** — implement service-specific CI/CD pipelines
- **Blue-green deployment** — implement blue-green deployment strategy

---

## 10. Testing

- **Contract testing** — test service contracts:

```typescript
// Contract test
describe('User Service Contract', () => {
  it('should match API contract', async () => {
    const response = await request(app)
      .get('/api/users/123')
    expect(response.status).toBe(200)
    expect(response.body).toMatchSchema(userSchema)
  })
})
```

- **Integration testing** — test service integration
- **End-to-end testing** — test complete user flows

---

## 11. General Rules of Thumb

- **Single responsibility** — each service has one clear purpose
- **Database per service** — each service owns its data
- **Asynchronous communication** — prefer async over sync where possible
- **Circuit breakers** — implement circuit breakers for resilience
- **Observability** — implement comprehensive observability
- **Security** — implement defense-in-depth security

---

## Quick-Start Checklist

- [ ] Services designed around business domains
- [ ] Database per service implemented
- [ ] API Gateway configured
- [ ] Service discovery implemented
- [ ] Message queue for async communication
- [ ] Distributed tracing configured
- [ ] Structured logging with correlation IDs
- [ ] Metrics collection implemented
- [ ] Service-to-service authentication
- [ ] Containerized deployment with orchestration
