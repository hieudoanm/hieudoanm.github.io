# Implementation notes

Focused reference for **microservices-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
