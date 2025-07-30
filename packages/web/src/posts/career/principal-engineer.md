---
name: 'Principal Engineer'
title: 'Principal Engineer'
date: '2025-07-30'
---

## 📚 Table of Contents

- [📚 Table of Contents](#-table-of-contents)
- [🔧 Back-end](#-back-end)
  - [🧱 Microservices Architecture](#-microservices-architecture)
  - [⚙️ Apache Kafka](#️-apache-kafka)
  - [☕️ Java + Spring Boot](#️-java--spring-boot)
  - [🛢 PostgreSQL](#-postgresql)
- [🖼 Front-end](#-front-end)
  - [Node.js](#nodejs)
  - [⚛️ React](#️-react)
  - [🔗 GraphQL](#-graphql)
- [☁️ 3. DevOps and Infrastructure](#️-3-devops-and-infrastructure)
  - [🔄 Harness CI/CD](#-harness-cicd)
  - [☁️ AWS](#️-aws)
  - [Solution Design](#solution-design)
- [FAQs](#faqs)
  - [SQL vs NoSQL](#sql-vs-nosql)
  - [Monolith vs Microservices](#monolith-vs-microservices)
  - [Vertical vs Horizontal](#vertical-vs-horizontal)

## 🔧 Back-end

### 🧱 Microservices Architecture

- Core Principles
  - Single Responsibility: Each service owns a bounded context (DDD).
  - Loose Coupling & High Cohesion: Minimize dependencies, maximize internal focus.
  - Autonomy: Services deploy, scale, and evolve independently.
  - Decentralized Data Management: Each service manages its own database; avoid shared DB.
  - Resiliency & Observability: Circuit breakers, retries, metrics, tracing, logging.
- Benefits
  - Independent deployments (CI/CD friendly).
  - Polyglot architecture (choose best tech per service).
  - Fault isolation (failure in one service doesn’t cascade).
  - Scalability per component (e.g., scale only order service).
- Challenges
  - Data consistency (distributed transactions).
  - Operational complexity (monitoring, debugging).
  - Network latency & reliability (timeouts, retries).
  - Deployment orchestration (service discovery, configuration management).
- Design Patterns
  - Database per service
  - CQRS (Command Query Responsibility Segregation)
  - Event sourcing (capture state changes as immutable events)
  - Strangler Fig Pattern (incremental migration from monolith)
- Common questions
  - What are the main challenges of microservices architecture? Hard to maintain consistency without 2PC. Use Saga/Event patterns.
    - 2PC (All for Nothing)
    - Saga Pattern
      - Break transaction into local transactions per service.
      - Each service publishes an event after completing its local action.
      - Other services react to events (Choreography) or are told what to do (Orchestration).
      - Use compensating actions to roll back (e.g., cancel payment if inventory fails).
  - Operational complexity: Monitoring, logging, tracing across services? Use correlationId and Generate at API Gateway or entry service.
  - Versioning & backward compatibility: Handle evolving contracts with API versioning and schema evolution.
  - Benefits of Orchestration
    - Centralized Workflow Control (BPMN diagrams)
    - Simpler to reason about success/failure paths compared to multiple scattered events.
    - Can trigger compensating actions immediately when a step fails.
    - Avoids “event storming” where multiple services react redundantly.
    - Flexible Sequencing: Can reorder or skip steps without touching multiple services.
    - Good for complex workflows (e.g., multi-step approvals, conditional branching).
    - When to Prefer Orchestration
      - Complex workflows with many steps or compensations.
      - Dynamic flows (branching, conditional logic).
      - When you need auditability and monitoring of workflows.
- Inbox / Outbox
  - Outbox
    - In microservices, dual writes happen often:
      - Write to local DB (business state).
      - Publish event to message broker (Kafka/RabbitMQ).
    - Ensure that when you update a database and publish an event, both happen atomically.
      - How It Works
        - When processing a command, write both:
          - Business data (e.g., order table)
          - Event data (e.g., outbox table) into the same database transaction.
        - A separate process (or Kafka Connect/Debezium) reads outbox table and publishes the event to Kafka.
        - After successful publish, mark outbox entry as processed (or delete).
    - Benefits
      - Guarantees no lost events (DB and event always in sync).
      - Avoids dual write problem without 2PC.
      - Works well with Kafka + relational DB.
    - Trade-offs
      - Extra outbox table management (cleanup, indexes).
      - Slight latency between DB commit and event publish.
      - Need idempotent consumers (events may be delivered at least once).
  - Inbox
    - Goal
      - Ensure idempotent event consumption (avoid double-processing events).
    - How It Works
      - Consumer stores event ID in inbox table when processing event.
      - Before processing, check if event ID exists:
        - If exists → ignore (duplicate).
        - If not → process and insert into inbox.
    - Benefits
      - Ensures exactly-once processing in consumer.
      - Protects against replayed or duplicate messages.
    - Trade-offs
      - Requires storage for inbox table.
      - More DB writes on consumers.
- Kafka
  - Topic
    - A log-structured data stream.
    - Append-only; events are immutable.
    - Divided into partitions → allows horizontal scaling and parallel consumption.
    - Each message has an offset (position in partition).
  - Consumer Groups
    - Group of consumers sharing the same group ID.
    - Kafka assigns partitions to consumers → ensures load balancing.
    - Within a group:
      - Each partition consumed by only one consumer (scales horizontally).
    - Multiple groups can consume the same topic independently (e.g., analytics vs billing).
  - Examples
    - `order.events` contains all order-related events: `OrderCreated`, `OrderPaid`, `OrderShipped`.
    - events are distributed by partition key (e.g., orderId):
  - Retention
    - Kafka stores events for a configurable period (e.g., 7 days).
    - Consumers can replay events by resetting offsets (great for recovery/debugging).
  - Delivery Semantics
    - At-least-once (default).
      - Each message is delivered one or more times.
      - Duplicates may occur, but no message is lost.
      - Consumer processes message first, then commits offset (auto or manual).
      - If crash happens after processing but before commit, message is re-delivered.
    - At-most-once (manual offset commit control).
      - Each message is delivered zero or one time.
      - No duplicates, but possible data loss.
      - Commit offset before processing message.
      - If crash occurs after commit but before processing, message is lost.
    - Exactly-once (requires idempotent producers + transactional APIs).
      - Each message is delivered once and only once (no duplicates, no loss).
      - Idempotent Producer (enable.idempotence=true) -> ensures no duplicates during retries.
      - Transactional API -> ensures atomic writes + offset commits.
  - Why Kafka is Popular in Microservices
    - Offset
      - Offset = sequential ID for each record within a partition.
      - Starts at 0, increments by 1 per message.
      - Identifies a unique position in a partition.
    - High throughput + horizontal scalability (millions of messages/sec).
    - Replayability: Consumers can reprocess past events (e.g., rebuild state).
    - Decoupled architecture: Multiple consumers read same event independently.
    - Event sourcing & CQRS: Naturally supports state rebuild and projections.
      - Store different states (Instead of storing order: {status: SHIPPED}, store: OrderCreated, OrderPaid, OrderShipped)
    - Strong ordering within partitions: Good for workflows per entity (e.g., per order ID).
    - Schema Registry
      - Definition
        - Service that manages schemas (Avro, JSON Schema, Protobuf) for Kafka topics.
        - Producers and consumers register and validate schemas to ensure compatibility.
      - How It Works
        - Each schema gets an ID stored in Kafka message header.
        - Consumer fetches schema by ID → deserializes message correctly.
        - Supports schema evolution (backward/forward/full compatibility).
      - Key points
        - Always add default values for new fields (avoid breaking old consumers).
        - Avoid removing fields — mark them as deprecated instead.
        - Choose compatibility mode based on rollout strategy (backward is safest).
        - Use Schema Registry’s versioning to manage multiple schema versions in parallel.
        - When using Kafka Connect or CDC, schemas evolve automatically with registry checks.

### ⚙️ Apache Kafka

- Concepts:
  - Topics, partitions, consumer groups, offset management
  - At-least-once vs. exactly-once semantics
- Use Cases: Event sourcing, change data capture (CDC), stream processing
- Tools: Kafka Streams, Kafka Connect, schema registry (e.g., Avro with Confluent)

### ☕️ Java + Spring Boot

- Core knowledge:
  - Spring Boot Autoconfiguration, Profiles, Actuators
  - Dependency injection with Spring Framework
  - Exception handling, validation, and AOP
- Advanced topics:
  - Spring Cloud: Config, Discovery, Gateway
  - Reactive programming (WebFlux) – especially with Kafka or streaming
  - Observability with Spring Boot: Micrometer, Prometheus, Zipkin
- Difference between abstract class and interface?
  - Purpose: Base class for related objects; partial implementation vs Contract/behavior without implementation
  - Inheritance: A class can extend one abstract class vs A class can implement multiple interfaces
  - Constructor: Can define constructors (called by subclasses) vs No constructors (no state to initialize)
  - Access Modifiers: Can use any (private, protected, etc.) vs All methods are implicitly public abstract (Java 8 default/static methods are public)
  - Use Case: When classes share code/state vs When classes share behavior contract but differ in implementation
- SOLID

- S - Single Responsibility Principle (SRP):
  - A class should have only one reason to change.
  - One class = one responsibility = one axis of change.
  - E.g: OrderService only does Order, InvoiceService only does Invoice
- O — Open/Closed Principle (OCP)
  - Classes should be open for extension, closed for modification.
  - Add new functionality by extending classes, not modifying them.

```java
interface PaymentMethod {
    void pay();
}

class CreditCardPayment implements PaymentMethod {
    public void pay() { /* ... */ }
}

class PayPalPayment implements PaymentMethod {
    public void pay() { /* ... */ }
}

class PaymentService {
    public void processPayment(PaymentMethod method) {
        method.pay();
    }
}
```

- L — Liskov Substitution Principle (LSP)

```java
abstract class Bird { }

interface Flyable {
    void fly();
}

class Sparrow extends Bird implements Flyable {
    public void fly() { /* ... */ }
}
```

- I — Interface Segregation Principle (ISP)
  - Clients should not be forced to depend on methods they don’t use.
  - Prefer multiple specific interfaces over one large interface.

```java
interface Workable {
    void work();
}

interface Eatable {
    void eat();
}

class Robot implements Workable {
    public void work() { /* ... */ }
}

class Human implements Workable, Eatable {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
}
```

- D — Dependency Inversion Principle (DIP)
  - High-level modules should not depend on low-level modules.
  - Both should depend on abstractions.

```java
interface Database {
    void saveOrder(Order order);
}

class MySQLDatabase implements Database {
    public void saveOrder(Order order) { /* ... */ }
}

class OrderService {
    private Database db;
    public OrderService(Database db) {
        this.db = db;
    }
    public void save(Order order) {
        db.saveOrder(order);
    }
}
```

### 🛢 PostgreSQL

- Schema design: normalization, indexing, constraints, partitioning
- Performance: query optimization (EXPLAIN ANALYZE), caching strategies, connection pooling (HikariCP)
- Advanced: JSONB support, full-text search, triggers, stored procedures
- Scaling: Replication, sharding, and failover

## 🖼 Front-end

### Node.js

- Event Loop and Concurrency
- Phases of Event Loop
  - Timers (setTimeout, setInterval callbacks)
  - Pending Callbacks
  - Idle, Prepare
  - Poll (I/O callbacks)
  - Check (setImmediate callbacks)
  - Close Callbacks

### ⚛️ React

- Architecture: Micro frontends (MFEs), independent deployability, cross-app communication
- Patterns:
  - Component-driven design (Storybook, Atomic Design)
  - State management (Redux, Zustand, or React Query)
  - Code splitting, lazy loading, and performance optimization
- Testing: Unit (Jest), integration (React Testing Library), E2E (Playwright/Cypress)

### 🔗 GraphQL

- Design: Schema-first vs. code-first, queries, mutations, subscriptions
- Tooling: Apollo Client/Server, caching, batching
- Security: Depth limiting, query complexity analysis
- Performance: N+1 problem and dataloader pattern, persisted queries

## ☁️ 3. DevOps and Infrastructure

### 🔄 Harness CI/CD

- Pipelines: Understand workflows, GitOps, triggers, rollback strategies
- Templates and Reuse: Use of YAML templates, stages, and approval gates
- Governance: RBAC, policy enforcement, secrets management
- Integration: With artifact repositories (e.g., Artifactory), test tools, monitoring

### ☁️ AWS

- Core services:
  - Compute: EC2, ECS/EKS, Lambda (for serverless microservices)
  - Networking: VPC, ALB/NLB, Route53, PrivateLink, NAT Gateways
  - Storage: S3, EBS, EFS
  - Databases: RDS (PostgreSQL), DynamoDB, ElastiCache
- Security: IAM roles/policies, security groups, KMS, secrets manager
- DevOps on AWS: CloudWatch, CloudTrail, X-Ray, Systems Manager
- IaC: Terraform vs. AWS CDK, CloudFormation

### Solution Design

- Key Goals
  - Scalability (handle growth in users/data).
  - Reliability (no data loss, fault-tolerant).
  - Performance (low latency, high throughput).
  - Maintainability (clean APIs, modular).
  - Cost efficiency (cloud vs on-prem trade-offs).
- Key Concepts
  - Horizontal vs vertical scaling
  - CAP Theorem (Consistency, Availability, Partition tolerance)
  - Latency vs throughput trade-offs
  - Load balancing, caching, databases, queues, storage
- High-Level Design Process
  - Clarify requirements (functional + non-functional)
  - Estimate scale (QPS, storage, bandwidth)
  - Define API contracts (input/output)
  - Choose architecture style (monolith, microservices, event-driven)
  - Design components (DB, cache, message broker, load balancer)
  - Plan data flows (read/write paths)
  - Handle failures (replication, retries, circuit breakers)
  - Security & compliance (auth, encryption, GDPR)
  - Monitoring & observability (logs, metrics, tracing)
  - Evolution & scaling strategy
- Core Building Block
  - Databases
    - SQL vs NoSQL
    - Sharding, replication, partitioning
    - Read/write patterns (CQRS, event sourcing)
    - Transactions (ACID) vs eventual consistency
  - Caching
    - In-memory: Redis, Memcached
    - Patterns: write-through, write-behind, cache-aside
    - Cache invalidation strategies
  - Message Brokers
    - Kafka (pub/sub, event streams)
    - RabbitMQ (work queues)
    - SQS, Pub/Sub (cloud)
  - Load Balancing
    - L4 (TCP) vs L7 (HTTP)
    - Sticky sessions, consistent hashing
    - Global vs regional load balancers (CDN + GSLB)
  - Storage
    - Object (S3), block (EBS), file (EFS)
    - Hot vs cold storage
- Scalability Patterns
  - Horizontal scaling (stateless services)
  - Partitioning/sharding (e.g., user_id % N)
  - Database replication (leader/follower)
  - Event-driven microservices
  - CQRS (Command Query Responsibility Segregation)
  - Backpressure handling (rate limiting, bulkheads)
- Blue/Green & Canary deployments
  - What is it? Two identical production environments: Blue (current) and Green (new). Deploy new version to Green → switch traffic from Blue to Green (instant cutover).
  - Switch traffic to Green (DNS, load balancer, or routing change).
  - LaunchDarkly
- API Gateway + BFF (Backend For Frontend)
  - API Gateway: A single entry point for all client requests to backend services.
  - Handles:
    - Routing
    - Aggregation
    - Authentication/Authorization
    - Rate limiting
    - Caching
    - Logging/Monitoring
  - Backend For Frontend (BFF)
    - Definition
      - A dedicated backend layer per frontend (e.g., Web, Mobile, Smart TV).
      - Tailors APIs to frontend-specific needs (data shape, latency, features).
    - Why Use It?
      - Avoids over-fetching/under-fetching (common with mobile apps).
      - Allows separate release cycles for frontend and backend.
      - Simplifies frontend logic — no need to aggregate multiple microservice calls.
  - Front-end -> API Gateway -> BFF -> Microserivces -> return packages that front-end needs
- Backpressure handling (rate limiting, bulkheads)
  - What it is
    - Occurs when producers send data faster than consumers can process.
    - Leads to queue buildup, memory exhaustion, timeouts, or crashes.
    - Common in message queues (Kafka, RabbitMQ), HTTP APIs, streaming systems.
  - Backpressure Handling Techniques
    - Rate Limiting
      - Restrict incoming requests to avoid overwhelming system.
      - Implemented at API Gateway, load balancer, or service level.
    - Bulkheads
      - Isolate resources into compartments so failure in one doesn’t affect others.
      - Named after ship bulkheads (watertight compartments).
      - Separate thread pools / connection pools per client or feature.
      - Example: Reserve DB pool for payment service separate from analytics.
    - Circuit Breakers
      - Open circuit when failures exceed threshold → block calls temporarily.
      - Allows system to recover without constant failing calls.
      - Often paired with retry + fallback mechanisms.
    - Backpressure in Streaming (Reactive Systems)
      - Protocols like Reactive Streams or frameworks like Project Reactor, Akka implement pull-based flow control:
    - Queue Length Monitoring
      - Monitor queue depth (Kafka lag, RabbitMQ queue length).

## FAQs

### SQL vs NoSQL

| Aspect           | SQL (Relational)                                  | NoSQL (Non-relational)                                |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Data Model       | Tables with fixed schema                          | Document, key-value, columnar, or graph (flexible)    |
| Consistency      | Strong ACID transactions                          | Often eventual consistency (tunable)                  |
| Query Complexity | Supports joins, aggregations, complex queries     | Limited joins; optimized for specific access patterns |
| Scalability      | Vertical scaling (scale-up)                       | Horizontal scaling (sharding, scale-out)              |
| Schema Evolution | Rigid; migrations required                        | Flexible; schema-less or dynamic                      |
| Use Cases        | Financial systems, ERP, strong consistency needed | Real-time analytics, IoT, flexible evolving data      |
| Maturity/Tooling | Mature ecosystem (ORMs, tools, drivers)           | Newer, evolving ecosystem                             |
| Cost/Complexity  | Can be costly to scale horizontally               | Operational complexity in sharding & consistency      |

### Monolith vs Microservices

| Aspect                 | Monolith                                             | Microservices                                          |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Architecture           | Single codebase & deployment                         | Multiple independent services                          |
| Development Speed      | Fast to start; simple CI/CD                          | Independent teams; faster feature velocity at scale    |
| Scalability            | Scale entire app together                            | Scale services independently                           |
| Operational Complexity | Simple deployment, debugging, monitoring             | Requires service discovery, API Gateway, observability |
| Team Size Fit          | Small teams (startup phase)                          | Large teams (clear domain boundaries)                  |
| Data Consistency       | Single DB → easy consistency                         | Distributed data → eventual consistency (Saga)         |
| Tech Stack Choice      | One tech stack                                       | Polyglot per service possible                          |
| Failure Isolation      | Failure affects whole system                         | Failures isolated per service                          |
| Migration Path         | Can evolve into modular monolith, then microservices | Start microservices only if domain is complex          |

### Vertical vs Horizontal

| Aspect               | Vertical Scaling (Scale Up)                             | Horizontal Scaling (Scale Out)                                 |
| -------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| Definition           | Add more resources (CPU, RAM, disk) to a single machine | Add more machines/nodes to distribute the load                 |
| Complexity           | Simple to implement; minimal code changes               | Requires distributed systems design (load balancing, sharding) |
| Hardware Limitations | Limited by max capacity of a single machine             | Can scale almost infinitely by adding more nodes               |
| Fault Tolerance      | Single point of failure; if server fails, system down   | High availability; other nodes handle failures                 |
| Cost                 | Expensive for high-end hardware (diminishing returns)   | Cheaper commodity hardware; cost grows linearly                |
| Data Management      | Centralized; no data distribution required              | Requires partitioning, replication, consistency management     |
| Use Cases            | Small/medium apps, early-stage startups                 | Large-scale apps, microservices, cloud-native systems          |
| Example              | Upgrading server from 8-core to 64-core CPU             | Adding 10 servers behind a load balancer                       |
