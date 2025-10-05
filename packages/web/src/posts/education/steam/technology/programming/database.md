---
title: 'Databases'
date: '2025-05-01'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Paradigms](#paradigms)
- [ORM](#orm)
  - [Drizzle](#drizzle)
  - [Prisma](#prisma)
  - [Supported](#supported)

## Paradigms

| #   | Paradigm      | Technology                             | Open Source                 | Maintainer             | Language         | Recommended |
| --- | ------------- | -------------------------------------- | --------------------------- | ---------------------- | ---------------- | ----------- |
| 1   | Key-Value     | [Badger][hypermode-badger]             |                             | [Hypermode][hypermode] | Go               |             |
| 2   | Key-Value     | LevelDB                                | [GitHub][gh-leveldb]        | [Google][google]       | C++              |             |
| 3   | Key-Value     | [Memcached][memcached]                 | [GitHub][gh-memcached]      |                        | C                |             |
| 4   | Key-Value     | [Redis][redis]                         | [GitHub][gh-redis]          |                        | C                | Recommended |
| 5   | Key-Value     | [RocksDB][rocksdb]                     |                             | [Meta][meta]           |                  |             |
| 6   | Key-Value     | [Valkey][valkey]                       | [GitHub][gh-valkey]         |                        | C                |             |
| 7   | Documental    | [CouchDB][apache-couchdb]              | [GitHub][gh-apache-couchdb] | [Apache][apache]       | [Erlang][erlang] |             |
| 8   | Documental    | [Couchbase](https://www.couchbase.com) |                             |                        |                  |             |
| 9   | Documental    | [DynamoDB][aws-dynamodb]               |                             | [AWS][aws]             |                  |             |
| 10  | Documental    | [MongoDB][mongodb]                     | [GitHub][gh-mongodb]        |                        | C++              | Recommended |
| 11  | Documental    | [RethinkDB][rethinkdb]                 | [GitHub][gh-rethinkdb]      |                        | C++              |             |
| 12  | Relational    | [CockroachDB][cockroachdb]             | [GitHub][gh-cockroach]      |                        | [Go][go]         |             |
| 13  | Relational    | libSQL                                 |                             |                        |                  |             |
| 14  | Relational    | [MariaDB][mariadb]                     | [GitHub][gh-mariadb]        |                        | C++              |             |
| 15  | Relational    | MS SQL                                 |                             |                        |                  |             |
| 16  | Relational    | [MySQL][mysql]                         | [GitHub][gh-mysql]          |                        | C++              |             |
| 17  | Relational    | [PostgreSQL][postgresql]               | [GitHub][gh-postgresql]     |                        | C                | Recommended |
| 18  | Relational    | [SQLite][sqlite]                       | [GitHub][gh-sqlite]         |                        | C                |             |
| 19  | Wide Column   | [Cassandra][apache-cassandra]          |                             | [Apache][apache]       |                  |             |
| 20  | Wide Column   | [HBase][apache-hbase]                  |                             | [Apache][apache]       |                  |             |
| 21  | Graph         | [DGraph][dgraph]                       |                             | [Hypermode][hypermode] |                  |             |
| 22  | Graph         | [neo4j][neo4j]                         |                             |                        |                  |             |
| 23  | Search Engine | [ElasticSearch][elasticsearch]         |                             |                        |                  |             |
| 24  | Search Engine | [Solr][apache-solr]                    |                             | [Apache][apache]       |                  |             |
| 25  | Multi Model   | [Fauna][fauna]                         |                             |                        |                  |             |

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
