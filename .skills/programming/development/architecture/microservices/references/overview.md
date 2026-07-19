# Overview

Focused reference for **microservices-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
