---
title: URL Shortener
difficulty: easy
category: infrastructure
author: Hieu Doan
tags: analytics, cache, distributed
---

# URL Shortener

Shorten + redirect at scale, ID generation, analytics, caching.

## Interview Questions

- Design a URL shortening service like bit.ly
- How do you generate unique short IDs at scale (base62 vs UUID)?
- How do you handle ~10M redirects/sec?
- How do you track click analytics?
- Design the storage schema and cache strategy

## Answers

### Q1. Design a URL shortening service like bit.ly

Two operations dominate: create a short link and resolve it. For create, the
service takes a long URL, generates a unique short code, and persists a
`(code → long_url, created_by, expiry)` row. For resolve, a `GET /<code>` looks
up the row and returns a 301 redirect to the long URL. Make the short code short
enough to fit in a tweet yet unique across billions of rows. Read path must be
fast and cheap, so it is cache-first with a hot read store. Cap the long URL
length and expire or quarantine abusive links. Analytics (click counts,
referrer, device, geo) are captured on the redirect path and processed offline.
The service is stateless except for the shared stores, so it scales
horizontally; the redirect endpoint should be the single most optimized code
path in the system.

### Q2. How do you generate unique short IDs at scale (base62 vs UUID)?

A short ID is a base-62 encoding (a–z, A–z, 0–9) of an integer: 7 characters
give 62^7 ≈ 3.5 trillion combinations, comfortably unique. UUIDs are convenient
but 36 characters — useless for a URL shortener unless truncated, and truncating
UUIDs is not collision-safe. The clean approach is a central distributed ID
generator: a dedicated ID service issuing ranges (e.g. "you own IDs
1,000,000–2,000,000") using a ZooKeeper/DB-backed allocation, or a
snowflake-style ID (timestamp + worker id + sequence), then base-62 encode each
number. Offline pre-generation removes the ID service from the request path
entirely. To guard against collisions with vanity/dictionary URLs, put a unique
constraint on the code and retry on conflict. Never guess codes by incrementing
publicly guessable ranges for private links.

### Q3. How do you handle ~10M redirects/sec?

The redirect is a pure key lookup, so it is the easiest thing in the system to
make fast. Route `GET /<code>` to an edge layer that serves the mapping from
memory, not from a database: an in-process, warm cache of hot mappings (LRU)
with a distributed cache (Redis) behind it. Preload the cache and keep it hot by
serving only a small hot set. When a code misses cache, fall back to the
database read, repopulate the cache, and consider a background warmer for
popular links. Keep the response tiny (301 + `Location` header), put the
redirect service behind many small stateless instances behind an L7 LB, and use
edge CDNs / PoPs to absorb the global load. Because the data is read-only for a
given code, you can even embed the mapping in the edge cache tier itself.

### Q4. How do you track click analytics?

Never block the hot redirect on analytics. Fire-and-forget the click event
(code, timestamp, referrer, user-agent, geo IP, device) into a durable message
queue on the redirect path; the redirect response is sent regardless of
analytics success. Async consumers aggregate into time-bucketed counters (e.g.
hourly click counts per code) in a columnar/OLAP store, plus raw events for
drill-down. Present totals via a read model built from the aggregates so
dashboards don't scan raw rows. For high precision, cap the counter resolution
(e.g. per-hour) to keep aggregation cheap. Correlate bot vs human traffic by
filtering known crawler user-agents so dashboards reflect real clicks. This
decoupling means a surge in clicks never affects redirect latency.

### Q5. Design the storage schema and cache strategy

Schema: `links(code PK, long_url, user_id, created_at, expires_at, clicks)` for
the source of truth and `clicks(code, hour, count)` for aggregates; index on
`user_id` for listing a user's links. Writes are rare (a create per user
occasionally), so the DB is write-light and can be heavily read-optimized. Cache
strategy: L1 in-process LRU (fastest, ~microseconds) → L2 Redis (shared, handles
instance churn) → DB fallback. Populate the L2 on create so a brand-new short
link is immediately cache-resident, and set TTLs (e.g. 24h) with
refresh-on-read; use cache-aside for correctness and a short negative TTL for
missing codes to avoid cache stampedes against the DB for nonexistent links.
Partition links by code-hash when the read set no longer fits one node; because
the hot set is small and read-mostly, you can serve the overwhelming majority of
traffic from memory.

## Source

```text
title: URL Shortener
node client: Client [round, icon=browser]
node api: API Gateway [icon=server]
node shorten: Shorten Service [icon=compute]
node redirect: Redirect Service [icon=sync]
node ids: ID Generator [icon=cache]
node analytics: Analytics Worker [icon=worker]
node cache: Redirect Cache [cylinder, icon=cache]
node db: Links DB [cylinder, icon=database]

edge client -> api: POST /shorten
edge api -> shorten: create
edge shorten -> ids: next id
edge ids -> shorten: short code
edge shorten -> db: persist
edge client -> api: GET /code
edge api -> redirect: resolve
edge redirect -> cache: lookup
edge redirect -> db: miss fallback
edge redirect -> client: 301
edge api -> analytics: log click
edge analytics -> db: aggregate
```
