# Database

Crawl the Crossref citation network for a DOI and export it as CSV files and an
SVG citation graph.

## Pipeline

```bash
crawl.py (doi.db)
├─ to_csv.py (csv/)
├─ analyse.py (stdout)
└─ visualise.py (images/)
```

1. `crawl` — BFS from a single DOI through `reference[].DOI`, storing `works`
   and `references` tables in `doi.db` (SQLite).
2. `csv` — convert every table in each `.db` to `csv/{stem}.{table}.csv`.
3. `analyse` — print citation stats (most cited/citing, authors, year
   distribution).
4. `visualise` — render citation links between dated works to `images/graph.svg`
   (pure stdlib, no third-party libraries).

## Usage

```sh
make help          # list targets
make crawl         # crawl from DOI (default 10.1038/nature12373) into doi.db
make csv           # convert every *.db to csv/ (convert only, no crawl)
make analyse       # print citation statistics from doi.db
make visualise     # render images/graph.svg from doi.db
make analyse QUERY=thermometry   # stats limited to works matching the query
make visualise QUERY=thermometry # graph limited to works matching the query
make all           # crawl, then csv, then visualise
make clean         # remove *.db, csv/, images/
```

Override defaults: `make crawl DOI=10.1016/j.bspc.2026.111034`,
`make crawl LEVEL=3`, `make analyse DB=other.db`, or
`make visualise DB=other.db MAX_NODES=500`.

Search (`analyse`/`visualise` only): pass `QUERY=term` to restrict results to
works whose `title`, `author`, `abstract`, or `doi` matches the term
(case-insensitive substring).

## Database schema

Mirrors `education/doi/prisma/schema.prisma`:

- `works` — `doi` (PK), `title`, `author`, `year`, `abstract`, `type`.
- `"references"` — `workId`, `referencedId` (both FKs to `works.doi`); the name
  needs quoting in SQL as `references` is a reserved word.

Crawl behaviour:

- The BFS is bounded by `--level` depth (0 = starting work + its references, ...
  max 10).
- `references` edges are deduplicated and self-references are skipped.
- Both foreign keys are enforced (`PRAGMA foreign_keys = ON`).

## Scripts

| Script                 | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `scripts/crawl.py`     | BFS crawler via `https://api.crossref.org/works/{doi}`.                     |
| `scripts/to_csv.py`    | Export every table to `csv/doi.{table}.csv`.                                |
| `scripts/analyse.py`   | Print citation statistics from a `.db` (`-q` searches).                     |
| `scripts/visualise.py` | Draw citation-link graph (SVG) using force-directed layout (`-q` searches). |
