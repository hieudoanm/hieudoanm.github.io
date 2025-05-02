---
title: 'Databases'
date: '2025-05-01'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Relational](#relational)
- [Other](#other)
- [ORM](#orm)

## Relational

| #   | Technology                 | Open Source             | Maintainer | Language | Recommended |
| --- | -------------------------- | ----------------------- | ---------- | -------- | ----------- |
| 1   | [CockroachDB][cockroachdb] | [GitHub][gh-cockroach]  |            | [Go][go] |             |
| 2   | libSQL                     |                         |            |          |             |
| 3   | [MariaDB][mariadb]         | [GitHub][gh-mariadb]    |            | C++      |             |
| 4   | MS SQL                     |                         |            |          |             |
| 5   | [MySQL][mysql]             | [GitHub][gh-mysql]      |            | C++      |             |
| 6   | [PostgreSQL][postgresql]   | [GitHub][gh-postgresql] |            | C        | Recommended |
| 7   | [SQLite][sqlite]           | [GitHub][gh-sqlite]     |            | C        |             |

## Other

| Sector        | Technology                             | Open Source                 | Maintainer       | Language         | Recommended |
| ------------- | -------------------------------------- | --------------------------- | ---------------- | ---------------- | ----------- |
| Key-Value     | [Redis][redis]                         | [GitHub][gh-redis]          |                  | C                | Recommended |
| Key-Value     | [Memcached][memcached]                 | [GitHub][gh-memcached]      |                  | C                |             |
| Key-Value     | [Valkey][valkey]                       | [GitHub][gh-valkey]         |                  | C                |             |
| Wide Column   | [Cassandra][apache-cassandra]          |                             |                  |                  |             |
| Wide Column   | [HBase][apache-hbase]                  |                             |                  |                  |             |
| Documental    | [CouchDB][apache-couchdb]              | [GitHub][gh-apache-couchdb] | [Apache][apache] | [Erlang][erlang] |             |
| Documental    | [Couchbase](https://www.couchbase.com) |                             |                  |                  |             |
| Documental    | [MongoDB][mongodb]                     | [GitHub][gh-mongodb]        |                  | C++              |             |
| Graph         | [DGraph][dgraph]                       |                             |                  |                  |             |
| Graph         | [neo4j][neo4j]                         |                             |                  |                  |             |
| Search Engine | [ElasticSearch][elasticsearch]         |                             |                  |                  |             |
| Search Engine | [Solr][apache-solr]                    |                             | [Apache][apache] |                  |             |
| Multi Model   | [Fauna][fauna]                         |                             |                  |                  |             |

## ORM

| No  | Paradigm   | Database    | Prisma      | Drizzle     | Hosting          |
| --- | ---------- | ----------- | ----------- | ----------- | ---------------- |
| 01  | Documental | DynamoDB    |             |             | AWS DynamoDB     |
| 02  | Documental | MongoDB     | `Supported` |             | MongoDB Atlas    |
| 03  | Relational | CockroachDB | `Supported` |             | CockroachDB Labs |
| 04  | Relational | libSQL      |             | `Supported` | Turso            |
| 05  | Relational | MariaDB     | `Supported` |             |                  |
| 06  | Relational | MS SQL      | `Supported` |             |                  |
| 07  | Relational | MySQL       | `Supported` | `Supported` | PlanetScale      |
| 08  | Relational | PostgreSQL  | `Supported` | `Supported` | Neon / Supabase  |
| 09  | Relational | SQLite      | `Supported` | `Supported` | Cloudflare D1    |

[apache]: https://apache.org
[apache-cassandra]: https://cassandra.apache.org
[apache-couchdb]: https://couchdb.apache.org
[apache-hbase]: https://hbase.apache.org
[apache-solr]: https://solr.apache.org
[cockroachdb]: https://www.cockroachlabs.com
[dgraph]: https://dgraph.io
[elasticsearch]: https://www.elastic.co/elasticsearch
[erlang]: https://www.erlang.org
[fauna]: https://fauna.com
[go]: https://go.dev
[mariadb]: https://mariadb.org
[memcached]: https://memcached.org
[mongodb]: https://www.mongodb.com
[mysql]: https://www.mysql.com
[neo4j]: https://neo4j.com
[postgresql]: https://postgresql.org
[redis]: https://redis.io
[sqlite]: https://www.sqlite.org
[valkey]: https://valkey.io
[gh-redis]: https://github.com/redis/redis
[gh-apache-couchdb]: https://github.com/apache/couchdb
[gh-memcached]: https://github.com/memcached/memcached
[gh-mongodb]: https://github.com/mongodb/mongo
[gh-postgresql]: https://github.com/postgres/postgres
[gh-valkey]: https://github.com/valkey-io/valkey
[gh-cockroach]: https://github.com/cockroachdb/cockroach
[gh-mysql]: https://github.com/mysql/mysql-server
[gh-sqlite]: https://github.com/sqlite/sqlite
[gh-mariadb]: https://github.com/MariaDB/server
