---
title: Slack — Messaging
difficulty: easy
category: communication
author: Hieu Doan
tags: messaging, realtime, search
---

# Slack — Messaging

Channels, threads, realtime WebSocket delivery, presence, search, files.

## Interview Questions

- Design Slack / a team messaging app
- How do you deliver messages in real time across thousands of clients?
- How do you model channels and threaded replies?
- How do you scale presence and typing indicators?
- Design full-text search over every workspace

## Answers

### Q1. Design Slack / a team messaging app

Core building blocks are clients, an API gateway, chat and thread services, a
presence service, search, files, and realtime delivery. Clients connect over
WebSockets; HTTP handles posting, search, and uploads. Messages flow through a
chat service that persists to a messages DB sharded by workspace, then enqueues
delivery events to a Kafka topic that fan-out workers consume to push through
the gateway. Threads extend the channel model with a `thread_id` on the message.
Presence lives in Redis with heartbeats; search uses an inverted index sharded
per workspace. Files are content-addressed in object storage. Key trade-offs:
fan-out versus per-channel polling, ordering guarantees per channel,
backpressure for slow consumers, and eventual consistency between search and the
source of truth.

### Q2. How do you deliver messages in real time across thousands of clients?

Maintain persistent WebSocket connections through an edge gateway, with each
connection registered in Redis so any service can locate a client's socket. On
publish, the chat service persists the message and writes to a Kafka topic
partitioned by channel or workspace; fan-out consumers push to the gateway,
which forwards to every subscribed socket. Scale by running many gateway nodes
with shared pub/sub (Redis pub/sub or Kafka) so any node can fan out to a
subscriber. Support heartbeats for liveness, ack and backpressure so slow
consumers don't stall the pipeline, and resumable sessions with a message cursor
so a dropped connection replays only missed events. Offline clients fall back to
push notifications.

### Q3. How do you model channels and threaded replies?

Channels are rows keyed by `(workspace_id, channel_id)`, with membership in a
separate table or Redis sets to enforce access control. Messages carry a
monotonically increasing per-channel sequence number, giving a total order for
cursors and pagination. Threads are a lightweight association: each message has
a nullable `thread_id` pointing at the root, while the root denormalizes
`reply_count` and `last_reply_ts` for fast listing. Reply bodies live in the
same messages table indexed by `thread_id` and timestamp, colocated in the same
channel partition for locality. Trade-offs: snapshotting thread metadata to
avoid expensive aggregates, filtering thread fan-out to subscribers only, and
trimming threads to a retention window.

### Q4. How do you scale presence and typing indicators?

Presence is a heartbeat model: clients report online status every ~30 seconds
over the existing WebSocket, and the presence service writes a TTL entry to
Redis. Keep per-user and per-workspace membership sets, and broadcast changes
only to members subscribed to that workspace or channel. Use Redis pub/sub so
multiple gateway nodes stay consistent about who is online. Typing indicators
are transient, fire-and-forget signals with a 3–5 second TTL that are forwarded
to the channel's current viewers and never persisted. Under load, coalesce
heartbeats, batch presence polls, and shard Redis by workspace. Graceful
degradation means treating stale presence as offline rather than blocking
message delivery.

### Q5. Design full-text search over every workspace

Consume messages asynchronously from the message topic into a search pipeline
that tokenizes and indexes them into an inverted index
(Elasticsearch/OpenSearch) with fields for text, channel, author, timestamp, and
workspace ACL metadata. Shard by workspace, replicate hot workspaces, and rank
results with BM25 plus recency. A global search fans out across shards and
merges top-k results. Maintain per-message cursors for at-least-once indexing
with dedupe so a consumer restart doesn't duplicate documents. The hard parts
are access-control filtering during query (only return messages the user can
see), index freshness versus cost, and skew when popular workspaces dominate
replica load.

## Source

```text
title: Slack Messaging
node client: Client [round, icon=browser]
node gateway: WS Gateway [icon=server]
node api: API Gateway [icon=server]
node chat: Chat Service [icon=message]
node thread: Threads Service [icon=message]
node search: Search Service [icon=search]
node file: File Service [icon=file]
node presence: Presence Service [icon=users]
node notify: Notifications [icon=mail]
node queue: Message Queue [icon=queue]
node db: Messages DB [cylinder, icon=database]
node cache: Session Cache [cylinder, icon=cache]

edge client -> gateway: connect
edge client -> api: post message
edge api -> chat: route
edge chat -> db: persist
edge chat -> queue: enqueue
edge queue -> gateway: deliver
edge gateway -> client: realtime
edge client -> api: thread reply
edge api -> thread: reply
edge thread -> chat: associate
edge client -> api: search
edge api -> search: query
edge client -> api: upload
edge api -> file: store
edge gateway -> presence: status
edge api -> cache: session
edge api -> notify: push
```
