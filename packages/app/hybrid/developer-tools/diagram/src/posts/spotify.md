---
title: Spotify — Music Streaming
difficulty: easy
category: media
author: Hieu Doan
tags: audio, cdn, ecommerce, realtime, recommendation
---

# Spotify — Music Streaming

Music catalog, streaming delivery via CDN, playlists, recommendations, DRM.

## Interview Questions

- Design Spotify / a music streaming service
- How do you stream audio with low latency and no buffering?
- Design the music catalog and metadata model
- How do you build a music recommendation system?
- How do you serve billions of playlist lookups?

## Answers

### Q1. Design Spotify / a music streaming service

Players talk to an API gateway for metadata, search, playlists, and
recommendations, while audio flows separately from a CDN.

- The catalog service reads enriched metadata (artists, albums, tracks) with a
  heavy Redis cache.
- The streaming service issues DRM licenses, then the player streams encrypted
  audio segments from a CDN edge close to the user.
- Recommendations consume analytics signals such as plays and skips and serve
  personalized track lists.
- Playlists and search are dedicated services over the catalog DB plus an
  inverted index.

Key considerations:

- Scaling a read-heavy metadata layer through cache hierarchies.
- Adaptive streaming over CDN (HLS/DASH).
- License issuing with short-lived auth.
- An offline analytics pipeline (Kafka) to drive recommendations.

### Q2. How do you stream audio with low latency and no buffering?

Encode audio into short segments (2–10 seconds) at multiple bitrates (AAC/Opus)
and serve them from a CDN edge near the user.

- Adaptive bitrate streaming (HLS/DASH) lets the player switch quality to match
  measured throughput.
- Start at a low bitrate for instant playback and ramp up while prefetching and
  buffering ahead a few seconds.
- Segment keys are content-addressed and aggressively cached at the edge to keep
  origin load low.
- DRM encrypts segments with rotating keys; the license is issued only after
  short-lived auth.

Trade-offs:

- Shorter segments reduce startup latency but add overhead and more requests.
- Balance segment size, prefetch depth, and regional edge placement for cache
  hit rate.

### Q3. Design the music catalog and metadata model

The core entities are artists, albums, and tracks, plus genres, images, and
contributors, with many-to-many relationships (a track belongs to albums and
features artists).

- Split immutable fields (ISRC, duration, explicit flag, asset ids) from mutable
  metadata (title, artwork) so editorial changes don't invalidate the whole
  cache.
- Use globally unique IDs such as UUIDs.
- Store the relational graph in a DB and denormalize read models into a Redis
  cache keyed by artist, album, and track id, refreshed via events on edit.
- Audio assets are content-addressed in object storage, referenced by segment
  manifests.

Considerations:

- Caching hot albums.
- Propagating metadata changes with versioning for licensing updates.
- Avoiding cache stampedes on new releases.

### Q4. How do you build a music recommendation system?

Collect interaction signals (plays, skips, likes, radio starts) into Kafka, then
batch-process them into embeddings and candidate pools.

- Collaborative filtering with matrix factorization (ALS) captures "users who
  liked this" patterns, while content-based features (audio embeddings, genres)
  cover cold-start items.
- Candidate generation retrieves a few hundred tracks per request using
  approximate nearest neighbor search (Annoy/FAISS) over embeddings, then a
  ranking model scores and personalizes them, blended with editorial and
  new-release boosts.
- A recommendation service serves cached per-user lists.

Considerations:

- Novelty and diversity to avoid feedback loops.
- Evaluation via engagement and skip-rate A/B tests.
- Offline/online consistency between trained models and production scoring.

### Q5. How do you serve billions of playlist lookups?

Treat playlists as a read-heavy workload.

- The playlist service keeps a denormalized mapping of `playlist_id` to an
  ordered list of track ids in Redis, with the source of truth persisted in a
  DB.
- Reads hit the cache first with write-through or invalidation on edit; heavily
  edited collaborative playlists enqueue updates to a queue and accept eventual
  consistency.
- Shard cache and DB by playlist id and add read replicas.
- For the playlist detail page, batch-fetch the track ids' metadata with
  pipelined cache gets and merge in one response.

Considerations:

- Protect against cache stampedes on viral playlists.
- Handle per-user playlist copies.
- Keep the ordering guarantee consistent between cache and DB.

## Source

```text
title: Spotify Music Streaming
node client: Player [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node stream: Streaming Service [icon=compute]
node recs: Recommendations [icon=cache]
node playlists: Playlists Service [icon=file]
node search: Search Service [icon=search]
node drm: DRM / License [icon=shield]
node analytics: Analytics [icon=worker]
node db: Catalog DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]
node storage: Audio Storage [cylinder, icon=file]

edge client -> api: browse
edge api -> catalog: metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> stream: request track
edge stream -> drm: license
edge stream -> cdn: stream audio
edge cdn -> storage: fetch
edge client -> api: search
edge api -> search: query
edge client -> api: create playlist
edge api -> playlists: save
edge playlists -> db: persist
edge api -> recs: personalize
edge recs -> analytics: signals
edge api -> analytics: metrics
```
