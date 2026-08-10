# Netflix — Streaming

Video-on-demand, encoding pipeline, CDN delivery, catalog, watch history.

## Interview Questions

- Design Netflix / a video streaming service
- Why are CDNs essential for streaming? How do you pick edge servers?
- How do you encode and store videos at scale (transcoding pipeline)?
- Design a recommendation engine for movies
- How do you resume playback across devices?

## Source

```text
title: Netflix Streaming

node client: Player [round, icon=browser]
node cdn: CDN [ellipse, icon=cloud]
node api: API Gateway [icon=server]
node catalog: Catalog Service [icon=search]
node drm: DRM / Auth [icon=shield]
node encode: Encoding Pipeline [icon=compute]
node recommend: Recommendations [icon=cache]
node history: Watch History [icon=file]
node analytics: Analytics [icon=worker]
node storage: Video Storage [cylinder, icon=file]
node db: Catalog DB [cylinder, icon=database]
node cache: Metadata Cache [cylinder, icon=cache]

edge client -> api: browse
edge api -> catalog: title metadata
edge catalog -> db: read
edge catalog -> cache: read / write
edge client -> drm: license
edge client -> cdn: stream segments
edge upload: Studio -> encode: raw video
edge encode -> storage: encoded chunks
edge cdn -> storage: fetch
edge client -> api: playback start
edge api -> history: log
edge history -> recommend: personalize
edge api -> analytics: metrics
```
