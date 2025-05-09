---
title: 'Databases'
date: '2025-05-01'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Paradigms](#paradigms)
  - [Key-Value](#key-value)
  - [Documental](#documental)
  - [Relational](#relational)
  - [Other](#other)
- [ORM](#orm)
  - [Drizzle](#drizzle)
  - [Prisma](#prisma)
  - [Supported](#supported)

## Paradigms

### Key-Value

| #   | Technology                 | Open Source            | Maintainer             | Language | Recommended |
| --- | -------------------------- | ---------------------- | ---------------------- | -------- | ----------- |
| 1   | [Badger][hypermode-badger] |                        | [Hypermode][hypermode] | Go       |             |
| 2   | LevelDB                    | [GitHub][gh-leveldb]   | [Google][google]       | C++      |             |
| 3   | [Memcached][memcached]     | [GitHub][gh-memcached] |                        | C        |             |
| 4   | [Redis][redis]             | [GitHub][gh-redis]     |                        | C        | Recommended |
| 5   | [RocksDB][rocksdb]         |                        | [Meta][meta]           |          |             |
| 6   | [Valkey][valkey]           | [GitHub][gh-valkey]    |                        | C        |             |

### Documental

| #   | Technology                             | Open Source                 | Maintainer       | Language         | Recommended |
| --- | -------------------------------------- | --------------------------- | ---------------- | ---------------- | ----------- |
| 1   | [CouchDB][apache-couchdb]              | [GitHub][gh-apache-couchdb] | [Apache][apache] | [Erlang][erlang] |             |
| 2   | [Couchbase](https://www.couchbase.com) |                             |                  |                  |             |
| 3   | [DynamoDB][aws-dynamodb]               |                             | [AWS][aws]       |                  |             |
| 4   | [MongoDB][mongodb]                     | [GitHub][gh-mongodb]        |                  | C++              | Recommended |
| 5   | [RethinkDB][rethinkdb]                 | [GitHub][gh-rethinkdb]      |                  | C++              |             |

### Relational

| #   | Technology                 | Open Source             | Maintainer | Language | Recommended |
| --- | -------------------------- | ----------------------- | ---------- | -------- | ----------- |
| 1   | [CockroachDB][cockroachdb] | [GitHub][gh-cockroach]  |            | [Go][go] |             |
| 2   | libSQL                     |                         |            |          |             |
| 3   | [MariaDB][mariadb]         | [GitHub][gh-mariadb]    |            | C++      |             |
| 4   | MS SQL                     |                         |            |          |             |
| 5   | [MySQL][mysql]             | [GitHub][gh-mysql]      |            | C++      |             |
| 6   | [PostgreSQL][postgresql]   | [GitHub][gh-postgresql] |            | C        | Recommended |
| 7   | [SQLite][sqlite]           | [GitHub][gh-sqlite]     |            | C        |             |

### Other

| Sector        | Technology                     | Open Source | Maintainer             | Language | Recommended |
| ------------- | ------------------------------ | ----------- | ---------------------- | -------- | ----------- |
| Wide Column   | [Cassandra][apache-cassandra]  |             | [Apache][apache]       |          |             |
| Wide Column   | [HBase][apache-hbase]          |             | [Apache][apache]       |          |             |
| Graph         | [DGraph][dgraph]               |             | [Hypermode][hypermode] |          |             |
| Graph         | [neo4j][neo4j]                 |             |                        |          |             |
| Search Engine | [ElasticSearch][elasticsearch] |             |                        |          |             |
| Search Engine | [Solr][apache-solr]            |             | [Apache][apache]       |          |             |
| Multi Model   | [Fauna][fauna]                 |             |                        |          |             |

## ORM

### [Drizzle][drizzle]

```typescript
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

### [Prisma][prisma]

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String @id @default(uuid()) @map("id") @db.Uuid
  username String @unique @default("") @map("username") @db.Text
  email    String @unique @default("") @map("email") @db.Text

  @@index([id])
  @@map("users")
}
```

### Supported

| No  | Paradigm   | Database    | [Prisma][prisma] | [Drizzle][drizzle] | Hosting          |
| --- | ---------- | ----------- | ---------------- | ------------------ | ---------------- |
| 01  | Documental | DynamoDB    |                  |                    | AWS DynamoDB     |
| 02  | Documental | MongoDB     | `Supported`      |                    | MongoDB Atlas    |
| 03  | Relational | CockroachDB | `Supported`      |                    | CockroachDB Labs |
| 04  | Relational | libSQL      |                  | `Supported`        | Turso            |
| 05  | Relational | MariaDB     | `Supported`      |                    |                  |
| 06  | Relational | MS SQL      | `Supported`      |                    |                  |
| 07  | Relational | MySQL       | `Supported`      | `Supported`        | PlanetScale      |
| 08  | Relational | PostgreSQL  | `Supported`      | `Supported`        | Neon / Supabase  |
| 09  | Relational | SQLite      | `Supported`      | `Supported`        | Cloudflare D1    |

[apache]: https://apache.org
[apache-cassandra]: https://cassandra.apache.org
[apache-couchdb]: https://couchdb.apache.org
[apache-hbase]: https://hbase.apache.org
[apache-solr]: https://solr.apache.org
[aws]: https://aws.amazon.com/
[aws-dynamodb]: https://aws.amazon.com/dynamodb/
[cockroachdb]: https://www.cockroachlabs.com
[dgraph]: https://dgraph.io
[drizzle]: https://orm.drizzle.team/
[elasticsearch]: https://www.elastic.co/elasticsearch
[erlang]: https://www.erlang.org
[fauna]: https://fauna.com
[go]: https://go.dev
[google]: https://developers.google.com/
[hypermode]: https://hypermode.com/
[hypermode-badger]: https://docs.hypermode.com/badger/overview
[mariadb]: https://mariadb.org
[memcached]: https://memcached.org
[meta]: https://opensource.fb.com/
[mongodb]: https://www.mongodb.com
[mysql]: https://www.mysql.com
[neo4j]: https://neo4j.com
[postgresql]: https://postgresql.org
[prisma]: https://www.prisma.io/
[redis]: https://redis.io
[rocksdb]: https://rocksdb.org/
[rethinkdb]: https://rethinkdb.com/
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
[gh-rethinkdb]: https://github.com/rethinkdb
[gh-leveldb]: https://github.com/google/leveldb
