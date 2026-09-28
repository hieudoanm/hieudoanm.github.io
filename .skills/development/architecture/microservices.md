---
name: microservices-architecture
description: Best practices for designing and implementing microservices architecture. Use when planning, structuring, or reviewing microservices — covers service design, communication, data management, and operational concerns.
---

# Microservices Architecture Best Practices

Microservices architecture is an approach where applications are structured as a collection of loosely coupled services. Best practice is to design services around business domains, implement proper communication patterns, manage data appropriately, and handle operational complexity effectively.

---

## 1. Core Principles

- **Single responsibility** — each service handles one business capability
- **Loose coupling** — services are independent and can evolve separately
- **High cohesion** — related functionality is grouped together
- **Independent deployment** — services can be deployed independently
- **Technology diversity** — services can use different technologies

---

## 2. Service Design

- **Domain-driven design** — design services around business domains:

```text
├── user-service/          # User management
├── order-service/         # Order processing
├── payment-service/       # Payment processing
├── inventory-service/     # Inventory management
├── notification-service/  # Notifications
└── analytics-service/     # Analytics and reporting
```

- **Bounded contexts** — clear boundaries between services
- **API-first design** — design APIs before implementation
- **Data ownership** — each service owns its data

---

## 3. Service Communication

- **Synchronous communication** — HTTP/REST for request/response:

```typescript
// Service A calling Service B
async function getUserOrders(userId: string): Promise<Order[]> {
  const response = await fetch(
    `http://order-service/api/orders/${userId}`
  )
  return response.json()
}
```

- **Asynchronous communication** — message queues for event-driven:

```typescript
// Publish event
await messageQueue.publish('order.created', {
  orderId: '123',
  userId: '456',
  total: 100
})

// Subscribe to event
messageQueue.subscribe('order.created', async (event) => {
  await processOrder(event)
})
```

- **API Gateway** — use API Gateway for external access:

```typescript
// API Gateway routes requests to appropriate services
gateway.get('/api/users/:id/orders', async (req, res) => {
  const orders = await orderService.getUserOrders(req.params.id)
  res.json(orders)
})
```

---

## 4. Data Management

- **Database per service** — each service has its own database:

```text
user-service/
  └── users_db/
order-service/
  └── orders_db/
payment-service/
  └── payments_db/
```

- **Data consistency** — eventual consistency across services
- **Saga pattern** — implement sagas for distributed transactions:

```typescript
// Order processing saga
async function processOrder(orderData: OrderData) {
  // Step 1: Create order
  const order = await orderService.create(orderData)

  try {
    // Step 2: Process payment
    await paymentService.process(order.id, order.total)

    // Step 3: Update inventory
    await inventoryService.reserve(order.items)

    // Step 4: Complete order
    await orderService.complete(order.id)
  } catch (error) {
    // Compensating transactions
    await orderService.cancel(order.id)
    await paymentService.refund(order.id)
    await inventoryService.release(order.items)
  }
}
```

- **CQRS** — separate read and write models for complex queries

---

## 5. Service Discovery

- **Service registry** — implement service discovery:

```typescript
// Service registration
await serviceRegistry.register('user-service', {
  host: 'user-service-1',
  port: 3000,
  health: '/health'
})

// Service discovery
const userServices = await serviceRegistry.discover('user-service')
const userService = loadBalance(userServices)
```

- **Load balancing** — implement load balancing strategies
- **Health checks** — implement health check endpoints:

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      database: checkDatabase(),
      cache: checkCache(),
      externalApi: checkExternalApi()
    }
  })
})
```

---

## 6. Configuration Management

- **Externalized configuration** — store configuration externally:

```typescript
// Load configuration from environment
const config = {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  services: {
    orderService: process.env.ORDER_SERVICE_URL,
    paymentService: process.env.PAYMENT_SERVICE_URL
  }
}
```

- **Configuration server** — use configuration server for centralized config
- **Environment-specific** — separate configs for different environments

---

## 7. Observability

- **Distributed tracing** — implement distributed tracing:

```typescript
// Add tracing to service calls
const tracer = opentelemetry.trace.getTracer('user-service')

async function getUser(id: string) {
  const span = tracer.startSpan('getUser')
  try {
    const user = await userRepository.findById(id)
    span.setStatus({ code: SpanStatusCode.OK })
    return user
  } catch (error) {
    span.recordException(error)
    throw error
  } finally {
    span.end()
  }
}
```

- **Logging** — implement structured logging with correlation IDs:

```typescript
logger.info('Processing order', {
  orderId: order.id,
  userId: order.userId,
  correlationId: request.headers['x-correlation-id']
})
```

- **Metrics** — collect and expose metrics:

```typescript
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds'
})

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    httpRequestDuration.observe(duration)
  })
  next()
})
```

---

## 8. Security

- **Service-to-service authentication** — implement mTLS:

```typescript
// mTLS configuration
const tlsConfig = {
  cert: fs.readFileSync('./certs/service-cert.pem'),
  key: fs.readFileSync('./certs/service-key.pem'),
  ca: fs.readFileSync('./certs/ca-cert.pem')
}

const httpsAgent = new https.Agent(tlsConfig)
```

- **API security** — implement API keys, OAuth2, JWT
- **Network security** — implement service mesh for network security
- **Secrets management** — use secrets management service

---

## 9. Deployment

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
        image: user-service:latest
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
