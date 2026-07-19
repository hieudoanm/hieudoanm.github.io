# Workflow notes

Focused reference for **microservices-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
