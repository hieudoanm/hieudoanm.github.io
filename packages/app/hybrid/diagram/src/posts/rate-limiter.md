---
title: API Rate Limiter
difficulty: easy
category: infrastructure
author: Hieu Doan
tags: infra
---

# API Rate Limiter

API gateway, sliding-window counting, policies per client, throttling.

## Interview Questions

- Design an API rate limiter
- Fixed window vs sliding window vs token bucket: which do you use?
- Where should the rate limiter live in the request path?
- How do you enforce limits across many gateway instances?
- How do you return 429 responses without dropping valid traffic?

## Answers

### Q1. Design an API rate limiter

The limiter lives on the API gateway and evaluates a policy per authenticated
client before the request hits backend services. Policies — per-client limits,
tiers, endpoints — load from a Policy DB with hot rules cached. The core is a
distributed counter store: Redis counters keyed by (client, window), incremented
atomically with `INCR` + `EXPIRE`, or Lua scripts for sliding windows. Request
flow: authenticate, resolve client and policy, check the counter, allow or deny,
then forward or return 429 with `Retry-After`. Allowed and denied traffic is
logged to analytics, and anomalies trigger alerts. The limiter must be fast
(in-memory fast path backed by Redis), fail open when the store is unavailable,
and scale by sharding keys with consistent hashing across a Redis cluster.

### Q2. Fixed window vs sliding window vs token bucket: which do you use?

Fixed window (one counter per clock window) is simple and cheap but allows
boundary bursts — a client can send 2x the limit around a window edge. Sliding
window log (a timestamp per request) is precise but memory-hungry. Sliding
window counter approximates it by weighting the previous and current window
counters — near-exact with constant memory. Token bucket adds a refill rate plus
a burst capacity, so it smooths the average rate while permitting short bursts;
it fits most APIs where clients occasionally spike. Recommendation: token bucket
when you want burst tolerance and simplicity, sliding-window counter when you
need strict adherence (e.g., login attempts). Implement both in Redis with Lua,
and make algorithm selection configurable per route.

### Q3. Where should the rate limiter live in the request path?

As early as possible — at the edge, in the API gateway or reverse proxy (Kong,
Envoy, NGINX, or a cloud load balancer) — so you reject abusive traffic before
it consumes backend resources. Gateway-level limits are coarse and universal
(per IP, per API key) and protect everything downstream. For finer control, add
per-service middleware enforcing application-specific policies per user or
endpoint, since only the service knows its semantics. Layer both: edge global
limits catch the bulk, service-level limits handle hotspots. Trade-offs: the
edge is hard to make context-aware, while in-service limiting adds per-request
overhead and does not protect other services from the same client. Client-side
politeness reduces retries; multi-layer with caching is the pragmatic answer.

### Q4. How do you enforce limits across many gateway instances?

You need a shared, distributed counter store — Redis is the standard. Use atomic
operations: `INCR` + `EXPIRE` for fixed windows, a sorted set (`ZADD`,
`ZREMRANGEBYSCORE`, `ZCARD`) for sliding-window logs, and Lua scripts to make
check-and-increment atomic and avoid TOCTOU races. Consistent hashing shards
keys across the cluster so no single node becomes a bottleneck. Per-request
Redis round trips add latency, so cache counts locally and sync periodically for
an approximate fast path, then enforce exactly on the global store. Availability
matters: run Redis with replicas and fail open to avoid dropping valid traffic
during an outage. Fallback: sticky sessions make per-instance counters
effectively global per client.

### Q5. How do you return 429 responses without dropping valid traffic?

Make the limiter fast and degrade gracefully. Keep the hot path in memory — a
local cache of recent decisions — and check the shared store asynchronously, so
legitimate requests are not blocked by Redis latency. Fail open: if the counter
store is unreachable, allow the request and log the event rather than denying
everyone; the cost is brief over-permission, which you monitor. Return a
consistent, well-formed 429 with `Retry-After` in seconds so clients back off
predictably instead of retrying immediately. Emit metrics on the 429 rate and
store outages for alerting. Accept that limiter semantics are approximate under
load, and size the store so P99 latency stays low.

## Source

```text
title: API Rate Limiter
node client: Client [round, icon=browser]
node gateway: API Gateway [icon=server]
node limiter: Rate Limiter [icon=shield]
node cache: Sliding Window Cache [cylinder, icon=cache]
node counter: Counter Store [cylinder, icon=queue]
node auth: Auth Service [icon=auth]
node backend: Backend Services [icon=compute]
node analytics: Analytics [icon=worker]
node db: Policy DB [cylinder, icon=database]
node notify: Alerts [icon=mail]

edge client -> gateway: request
edge gateway -> auth: verify
edge auth -> gateway: identity
edge gateway -> limiter: check
edge limiter -> cache: sliding window
edge cache -> limiter: allow / deny
edge limiter -> counter: increment
edge limiter -> gateway: 429 / pass
edge gateway -> backend: forward
edge backend -> gateway: response
edge limiter -> analytics: log
edge limiter -> db: policy rules
edge limiter -> notify: alert
```
