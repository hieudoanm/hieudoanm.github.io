---
title: Web Crawler — Search Engine
difficulty: easy
category: search
author: Hieu Doan
tags: cache, crawler, search
---

# Web Crawler — Search Engine

Crawler, URL frontier, indexer, inverted index, ranking, result caching.

## Interview Questions

- Design a web crawler
- How do you manage the URL frontier and politeness?
- How do you detect duplicate pages across the web?
- Design an inverted index for full-text search
- How do you rank and cache query results at scale?

## Answers

### Q1. Design a web crawler

Key components: a URL frontier (a distributed priority queue), fetchers that
download pages, an extractor that parses HTML into clean text and new links, an
indexer that builds an inverted index, a page DB storing raw HTML and content
hashes, and a ranking service. The pipeline: frontier yields URLs, fetchers
download with bounded concurrency, the extractor feeds new links back and hands
content to the indexer and page DB. Scale: partition the frontier by hostname
hash so each domain is pinned to one fetcher (politeness), add fetchers
horizontally, and use bloom filters to avoid re-enqueuing seen URLs. Re-crawling
is scheduled by page importance and change frequency. Monitor crawl rate,
per-domain errors, and queue depth.

### Q2. How do you manage the URL frontier and politeness?

The frontier is a distributed priority queue sharded by hostname, giving each
domain its own FIFO queue so a crawler only has one in-flight request per host
at a time. Politeness rules: parse `robots.txt` and honor `Disallow` and
`Crawl-delay`, enforce a minimum delay (often a few seconds) between requests to
the same host, and rotate through many hosts concurrently to keep aggregate
throughput high. Consistent hashing assigns each domain to a fixed fetcher,
which keeps per-host timing state local and prevents two workers racing the same
site. Frontier priorities weight pages by importance (seed pages, inlink count,
change frequency) so high-value URLs crawl first. Bloom filters dedupe enqueued
URLs to keep queues lean.

### Q3. How do you detect duplicate pages across the web?

First canonicalize each page — normalize the URL (strip tracking params, resolve
redirects) and the content (remove whitespace, boilerplate, and markup). Exact
duplicates are found by hashing normalized content (e.g., SHA-256) and looking
the hash up in a distributed store; a bloom filter in front makes most lookups
cheap without touching storage. Near-duplicates — pages with slight template
differences — need fuzzy techniques: shingling (sets of fixed-size token
windows) with Jaccard similarity, or simhash with a Hamming-distance threshold;
MinHash + LSH scales this to billions of pages. Duplicates are grouped under a
canonical representative so the index stores one version and search results
dedupe. Simhash updates are incremental and efficient.

### Q4. Design an inverted index for full-text search

Tokenize and normalize documents — lowercase, stemming, stopword removal — then
build postings lists of the form term to (docID, term frequency, positions). The
index is sharded, partitioned either by term or by document range; each shard
holds its own segment files plus an in-memory mapping for hot terms. The indexer
batches new documents and writes immutable segments, merging them log-structured
(LSM-style) so lookups stay fast and memory stays bounded. Queries intersect or
union postings lists, using skip pointers for faster intersections. Position
data enables phrase queries; docID-sorted postings enable doc-at-a-time scoring.
Updates go to new segments with tombstones rather than in-place mutation. Cache
the postings of hot terms and top results per query.

### Q5. How do you rank and cache query results at scale?

Ranking blends lexical scores from BM25 (using TF/IDF statistics stored with
each postings list) with popularity signals like PageRank and freshness. At
query time you compute a candidate set, score the top candidates doc-at-a-time,
and return the top-K. To serve high QPS, put a result cache in front: key by
normalized query (plus filters and locale), cache the top-K doc IDs and snippets
with LRU and a short TTL, and pin the hottest queries in memory so they never
touch the index. This absorbs query skew — a small set of queries generates most
traffic. Version cache keys when the index changes significantly, and shard by
query hash across instances.

## Source

```text
title: Web Crawler
node client: Client [round, icon=browser]
node api: Query API [icon=server]
node crawler: Crawler [icon=worker]
node frontier: URL Frontier [icon=queue]
node fetcher: Fetcher [icon=server]
node extractor: Extractor [icon=file]
node indexer: Indexer [icon=compute]
node index: Inverted Index [cylinder, icon=search]
node rank: Ranking Service [icon=sync]
node cache: Result Cache [cylinder, icon=cache]
node db: Page DB [cylinder, icon=database]

edge crawler -> frontier: next urls
edge frontier -> fetcher: fetch
edge fetcher -> extractor: parse html
edge extractor -> frontier: new links
edge extractor -> indexer: content
edge indexer -> index: build
edge indexer -> db: store
edge client -> api: search
edge api -> rank: query
edge rank -> index: lookup
edge rank -> cache: cached results
edge rank -> api: ranked results
```
