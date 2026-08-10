# URL Shortener

Shorten + redirect at scale, ID generation, analytics, caching.

## Interview Questions

- Design a URL shortening service like bit.ly
- How do you generate unique short IDs at scale (base62 vs UUID)?
- How do you handle ~10M redirects/sec?
- How do you track click analytics?
- Design the storage schema and cache strategy

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
