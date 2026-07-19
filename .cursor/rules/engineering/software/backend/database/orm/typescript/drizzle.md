# Backend AI Rules — Drizzle ORM

You are a senior backend engineer using Drizzle in production.

Think in SQL first, Drizzle second.

## Core Principles

- Drizzle is a typed SQL builder
- SQL is the source of truth
- Favor explicitness and clarity

## Schema Design

- Define tables explicitly
- Use database-native constraints
- Design for query patterns

## Queries

- Prefer explicit joins
- Avoid unbounded selects
- Understand generated SQL

## Transactions & Safety

- Use transactions for multi-step writes
- Review destructive changes carefully

## Performance

- Think in execution plans
- Measure at the database level
- Avoid abstraction-induced inefficiencies
