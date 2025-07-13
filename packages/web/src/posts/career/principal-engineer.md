---
name: 'Principal Engineer'
title: 'Principal Engineer'
date: '2025-06-13'
---

## 📚 Table of Contents

- [📚 Table of Contents](#-table-of-contents)
- [🔧 Back-end](#-back-end)
  - [🧱 Microservices Architecture](#-microservices-architecture)
  - [☕️ Java + Spring Boot](#️-java--spring-boot)
  - [⚙️ Apache Kafka](#️-apache-kafka)
  - [🛢 PostgreSQL](#-postgresql)
- [🖼 Front-end](#-front-end)
  - [⚛️ React](#️-react)
  - [🔗 GraphQL](#-graphql)
- [☁️ 3. DevOps and Infrastructure](#️-3-devops-and-infrastructure)
  - [🔄 Harness CI/CD](#-harness-cicd)
  - [☁️ AWS](#️-aws)

## 🔧 Back-end

### 🧱 Microservices Architecture

- Principles: Domain-driven design (DDD), loose coupling, high cohesion, bounded contexts.
- Service communication: REST vs. gRPC, Kafka (event-driven), synchronous vs. asynchronous flows.
- Common patterns: API Gateway, Circuit Breaker, Saga/Orchestration, CQRS, Service Registry (e.g., Eureka), Config Server.
- Deployment: Independent service deployments, blue/green or canary releases.

### ☕️ Java + Spring Boot

- Core knowledge:
  - Spring Boot Autoconfiguration, Profiles, Actuators
  - Dependency injection with Spring Framework
  - Exception handling, validation, and AOP
- Advanced topics:
  - Spring Cloud: Config, Discovery, Gateway
  - Reactive programming (WebFlux) – especially with Kafka or streaming
  - Observability with Spring Boot: Micrometer, Prometheus, Zipkin

### ⚙️ Apache Kafka

- Concepts:
  - Topics, partitions, consumer groups, offset management
  - At-least-once vs. exactly-once semantics
- Use Cases: Event sourcing, change data capture (CDC), stream processing
- Tools: Kafka Streams, Kafka Connect, schema registry (e.g., Avro with Confluent)

### 🛢 PostgreSQL

- Schema design: normalization, indexing, constraints, partitioning
- Performance: query optimization (EXPLAIN ANALYZE), caching strategies, connection pooling (HikariCP)
- Advanced: JSONB support, full-text search, triggers, stored procedures
- Scaling: Replication, sharding, and failover

## 🖼 Front-end

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
