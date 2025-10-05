---
title: 'DevStack'
date: '2025-10-06'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Language Iceberg](#language-iceberg)
- [Levels](#levels)
- [DevStack](#devstack)
- [Databases](#databases)
  - [ORM](#orm)
    - [Drizzle](#drizzle)
    - [Prisma](#prisma)
    - [Supported](#supported)
- [SaaS](#saas)
  - [SaaS - Authentication](#saas---authentication)
  - [SaaS - Email](#saas---email)
  - [SaaS - Payment](#saas---payment)
- [Serverless](#serverless)
- [PaaS - Platform as a Service](#paas---platform-as-a-service)
- [BaaS - Back-end as a Service](#baas---back-end-as-a-service)
- [IaaS - Infrastructure as a Service](#iaas---infrastructure-as-a-service)
- [API](#api)
  - [GenAI](#genai)
  - [Social](#social)
  - [Other](#other)

## Language Iceberg

| #   | Language                                 | Maintainer             | Group        | Development                                                      | Docker / UI                  | Note                          |
| --- | ---------------------------------------- | ---------------------- | ------------ | ---------------------------------------------------------------- | ---------------------------- | ----------------------------- |
| 01  | C / C++                                  |                        | Low-level    | OS                                                               |                              | Most Popular                  |
| 02  | [Rust][rust]                             |                        | Low-level    | OS                                                               |                              | Best for Memory               |
| 03  | [Go][go]                                 | [Google][google]       | Low-level    | CLI / Terminal                                                   | [Docker][docker-hub-golang]  | Easiest to Use                |
| 04  | [Swift][apple-swift]                     | [Apple][apple]         | Front-end    | [iOS][apple-ios] / [iPadOS][apple-ipados] / [macOS][apple-macos] | [SwiftUI][apple-swiftui]     | Closed EcoSytem               |
| 05  | [Kotlin][jetbrains-kotlin]               | [JetBrains][jetbrains] | Front-end    | [Android][google-android] (Mobile / Tablet)                      | [Material][google-material]  | Most Popular for Mobile       |
| 06  | [C#][ms-csharp]                          | [Microsoft][ms]        | Front-end    | [Windows][ms-windows]                                            | [WinUI][ms-winui]            | Most Popular for Desktop      |
| 07  | [Dart][dart]                             | [Google][google]       | Front-end    | Cross Platform                                                   | [Flutter][flutter]           |                               |
| 08  | JavaScript / [TypeScript][ms-typescript] | [Microsoft][ms]        | Front-end    | Web / [ChromeOS][google-chromeos]                                | [Docker][docker-hub-node]    | Most Accessible               |
| 09  | PHP                                      |                        | Front-end    | Web                                                              | [Docker][docker-hub-php]     |                               |
| 10  | Ruby                                     |                        | Front-end    | Web                                                              | [Docker][docker-hub-ruby]    |                               |
| 11  | [Java][oracle-java]                      | [Oracle][oracle]       | Back-end     |                                                                  | [Docker][docker-hub-openjdk] | Best for Enterprise           |
| 12  | [Scala][scala]                           |                        | Back-end     |                                                                  |                              |                               |
| 13  | MATLAB                                   | MathWorks              | Data Science |                                                                  |                              |                               |
| 14  | [Python][python]                         |                        | Data Science | Machine Learning with [Jupyter][jupyter]                         | [Docker][docker-hub-python]  | Best for Machine Learning     |
| 15  | [R][r]                                   |                        | Data Science | Mathematics                                                      |                              | Best for Statistics           |
| 16  | [Docker][docker]                         |                        | DevOps       | Containerization                                                 |                              | Best for Deployment           |
| 17  | [Terraform][terraform]                   |                        | DevOps       | Infrastructure as Code                                           |                              | Best for Cloud Infrastructure |

## Levels

| Level | Group     | Subgroup                         | Note                                                    | Language                                 |
| ----- | --------- | -------------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| 1     | OS        | [Kernel][kernel]                 | OS Functionalities                                      | C / C++ / Rust                           |
| 2     | OS        | APIs                             | OS Functionalities                                      | **Go**                                   |
| 3     | Front-end | Native (Apple, Android, Windows) | Native Software Development (Hardware - Camera, Sensor) | Swift / Kotlin / C#                      |
| 4     | Front-end | Web - Browser                    | Web Software Development                                | **JavaScript (TypeScript)** / PHP / Ruby |
| 5     | Back-end  | APIs                             | Datbase Connection through RESTful API, GraphQL, tRPC   | Java / Scala                             |
| 6     | Back-end  | Data Science                     | Build Machine Learning Model                            | **Python** / R                           |

## DevStack

| No  | Group        | Technology       | Beginner (TypeScript)          | Immediate (Typscript and Python)  | Advanced Languages | Advanced Framework         | Advanced IDE                                      |
| --- | ------------ | ---------------- | ------------------------------ | --------------------------------- | ------------------ | -------------------------- | ------------------------------------------------- |
| 01  | Front-end    | CLI              | [oclif][oclif]                 | TS - [oclif][oclif]               | Golang             | [Cobra][cobra]             | [GoLand][jetbrains-goland]                        |
| 02  | Front-end    | Web              | [Next.js][next.js]             | TS - [Next.js][next.js]           | TypeScript         | [Next.js][next.js]         | [VS Code][vsc]                                    |
| 03  | Front-end    | iOS              | [React Native][react-native]   | TS - [React Native][react-native] | Swift              | [SwiftUI][swiftui]         | [XCode][xcode]                                    |
| 04  | Front-end    | Android          | [React Native][react-native]   | TS - [React Native][react-native] | Kotlin             | [Material 3][material]     | [Android Studio][android-studio]                  |
| 05  | Front-end    | Windows          | [Tauri][tauri]                 | TS - [Tauri][tauri]               | C#                 | [.NET][dotnet]             | [Visual Studio][vs]                               |
| 06  | Front-end    | Back-end         | [tRPC][trpc]                   | TS - [tRPC][trpc]                 | TypeScript         | [GraphQL][graphql]         | [VS Code][vsc]                                    |
| 07  | Back-end     | Framework        | [Nest.js][nest.js]             | PY - [FastAPI][fastapi]           | Java               | [Spring Boot][spring-boot] | [IDEA][jetbrains-idea]                            |
| 08  | Back-end     | Database (ORM)   | [Prisma][prisma]               | PY - [SQLAlchemy][sqlalchemy]     | Java               | [Spring][spring]           | [IDEA][jetbrains-idea]                            |
| 09  | Data Science | Machine Learning | [Tensorflow.js][tensorflow.js] | PY - [Tensorflow][tensorflow]     | Python             | [Tensorflow][tensorflow]   | [PyCharm][jetbrains-pycharm] x [Jupyter][jupyter] |

## Databases

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

### ORM

#### [Drizzle][drizzle]

```typescript
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

#### [Prisma][prisma]

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

#### Supported

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

## SaaS

### SaaS - Authentication

| Supersector | Sector | Subsector      | Technology           | Open Source           | Maintainer | Language     | Recommended |
| ----------- | ------ | -------------- | -------------------- | --------------------- | ---------- | ------------ | ----------- |
| Application | SaaS   | Authentication | [Auth0][auth0]       | [GitHub][gh-auth0]    |            | [TS][ts]     | Recommended |
| Application | SaaS   | Authentication | [Clerk][clerk]       | [GitHub][gh-clerk]    |            | [TS][ts]     |             |
| Application | SaaS   | Authentication | [Keycloak][keycloak] | [GitHub][gh-keycloak] |            | [Java][java] |             |
| Application | SaaS   | Authentication | [OneLogin][onelogin] | [GitHub][gh-onelogin] |            | [TS][ts]     |             |
| Application | SaaS   | Authentication | [OSSO][osso]         | [GitHub][gh-osso]     |            | [TS][ts]     |             |
| Application | SaaS   | Authentication | [Zitadel][zitadel]   | [GitHub][gh-zitadel]  |            | [Go][go]     |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### SaaS - Email

| Supersector | Sector | Subsector | Technology             | Open Source            | Maintainer | Language | Recommended |
| ----------- | ------ | --------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| Application | SaaS   | Email     | [SendGrid][sendgrid]   | [GitHub][gh-sendgrid]  |            | [JS][js] | Recommended |
| Application | SaaS   | Email     | [Mailgun][mailgun]     | [GitHub][gh-mailgun]   |            | [Go][go] |             |
| Application | SaaS   | Email     | [Postmark][postmark]   | [GitHub][gh-postmark]  |            | [TS][ts] |             |
| Application | SaaS   | Email     | [MailChimp][mailchimp] | [GitHub][gh-mailchimp] |            | [JS][js] |             |
| Application | SaaS   | Email     | [Resend][resend]       | [GitHub][gh-resend]    |            | [TS][ts] |             |

### SaaS - Payment

| Supersector | Sector | Subsector | Technology             | Open Source            | Maintainer | Language | Recommended |
| ----------- | ------ | --------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| Application | SaaS   | Payment   | [Braintree][braintree] | [GitHub][gh-braintree] |            | [JS][js] |             |
| Application | SaaS   | Payment   | [Paddle][paddle]       | [GitHub][gh-paddle]    |            | [TS][ts] |             |
| Application | SaaS   | Payment   | [Paypal][paypal]       | [GitHub][gh-paypal]    |            | [TS][ts] |             |
| Application | SaaS   | Payment   | [Square][square]       | [GitHub][gh-square]    |            | [TS][ts] |             |
| Application | SaaS   | Payment   | [Stripe][stripe]       | [GitHub][gh-stripe]    |            | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

## Serverless

| Supersector | Sector     | Subsector | Technology                               | Open Source          | Maintainer               | Language | Recommended |
| ----------- | ---------- | --------- | ---------------------------------------- | -------------------- | ------------------------ | -------- | ----------- |
| Application | Serverless |           | [Cloudflare Workers][cloudflare-workers] |                      | [Cloudflare][cloudflare] |          |             |
| Application | Serverless |           | [Deno Deploy][deno-deploy]               |                      |                          |          |             |
| Application | Serverless |           | [Fly][fly]                               | [GitHub][gh-fly]     | [Fly][fly]               |          |             |
| Application | Serverless |           | [Netlify][netlify]                       | [GitHub][gh-netlify] | [Netlify][netlify]       |          |             |
| Application | Serverless |           | [Vercel][vercel]                         | [GitHub][gh-vercel]  | [Vercel][vercel]         |          | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

## PaaS - Platform as a Service

| Supersector | Sector | Subsector | Technology                      | Open Source             | Maintainer             | Language | Recommended |
| ----------- | ------ | --------- | ------------------------------- | ----------------------- | ---------------------- | -------- | ----------- |
| Application | PaaS   |           | [App Engine][google-app-engine] | [GitHub][gh-app-engine] | [Alphabet][alphabet]   | [TS][ts] |             |
| Application | PaaS   |           | [Heroku][heroku]                | [GitHub][gh-heroku]     | [Heroku][heroku]       |          |             |
| Application | PaaS   |           | [OpenShift][openshift]          | [GitHub][gh-openshift]  | [OpenShift][openshift] |          |             |
| Application | PaaS   |           | [Railway][railway]              | [GitHub][gh-railway]    | [Railway][railway]     |          |             |
| Application | PaaS   |           | [Render][render]                | [GitHub][gh-render]     | [Render][render]       |          | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

## BaaS - Back-end as a Service

| Supersector | Sector | Subsector | Technology               | Open Source             | Maintainer           | Language | Recommended |
| ----------- | ------ | --------- | ------------------------ | ----------------------- | -------------------- | -------- | ----------- |
| Application | BaaS   |           | [AppWrite][appwrite]     | [GitHub][gh-appwrite]   |                      | [TS][ts] |             |
| Application | BaaS   |           | [Firebase][firebase]     | [GitHub][gh-firebase]   | [Alphabet][alphabet] | [TS][ts] |             |
| Application | BaaS   |           | [NHost][nhost]           | [GitHub][gh-nhost]      |                      | [TS][ts] |             |
| Application | BaaS   |           | [PocketBase][pocketbase] | [GitHub][gh-pocketbase] |                      | [Go][go] |             |
| Application | BaaS   |           | [SupaBase][supabase]     | [GitHub][gh-supabase]   |                      | [TS][ts] | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

## IaaS - Infrastructure as a Service

| Supersector | Sector | Subsector | Technology                     | Open Source                | Maintainer           | Language | Recommended |
| ----------- | ------ | --------- | ------------------------------ | -------------------------- | -------------------- | -------- | ----------- |
| Application | IaaS   |           | [Azure][ms-azure]              | [GitHub][gh-azure]         | [Microsoft][ms]      |          |             |
| Application | IaaS   |           | [AWS][aws]                     | [GitHub][gh-aws]           | [Amazon][amazon]     |          | Recommended |
| Application | IaaS   |           | [Digital Ocean][digital-ocean] | [GitHub][gh-digital-ocean] |                      |          |             |
| Application | IaaS   |           | [Google Cloud][google-cloud]   | [GitHub][gh-google-cloud]  | [Alphabet][alphabet] |          |             |
| Application | IaaS   |           | [IBM Cloud][ibm-cloud]         | [GitHub][gh-ibm-cloud]     |                      |          |             |

[⬆️ Back to Table of Contents](#table-of-contents)

| Supersector     | Sector                  | Subsector      | Technology                               | Open Source                | Maintainer               | Language         | Recommended |
| --------------- | ----------------------- | -------------- | ---------------------------------------- | -------------------------- | ------------------------ | ---------------- | ----------- |
| Server          |                         |                | [HTTPD][apache-httpd]                    |                            |                          |                  |             |
| Server          |                         |                | [nginx][nginx]                           |                            |                          |                  |             |
| Version Control | System                  | [Git][git]     | [BitBucket][bitbucket]                   |                            |                          |                  |             |
| Version Control | System                  | [Git][git]     | [GitHub][github]                         |                            |                          |                  |             |
| Version Control | System                  | [Git][git]     | [GitLab][gitlab]                         |                            |                          |                  |             |
| Version Control | System                  | [Git][git]     | [Launchpad][launchpad]                   |                            |                          |                  |             |
| CI/CD           |                         |                | [CircleCI][circleci]                     |                            |                          |                  |             |
| CI/CD           |                         |                | [GitHub Actions][github-actions]         |                            |                          |                  |             |
| CI/CD           |                         |                | [GitLab CI][gitlab-ci]                   |                            |                          |                  |             |
| CI/CD           |                         |                | [Harness][harness]                       |                            |                          |                  |             |
| CI/CD           |                         |                | [Jenkins][jenkins]                       |                            |                          |                  |             |
| CI/CD           |                         |                | [Travis][travis-ci]                      |                            |                          |                  |             |
| Application     | Container               |                | [containerd](https://containerd.io/)     |                            |                          |                  |             |
| Application     | Container               |                | [Docker][docker]                         | [GitHub][gh-docker]        |                          |                  |             |
| Application     | Container               |                | [Podman](https://podman.io/)             |                            |                          |                  |             |
| Application     | Container               |                | [Docker Compose][docker-compose]         |                            |                          |                  |             |
| Application     | Container               |                | [Docker Swarm][docker-swarm]             |                            |                          |                  |             |
| Application     | Container Orchestration |                | [Kubernetes][kubernetes]                 | [GitHub][gh-kubernetes]    |                          | [Go][go]         |             |
| Application     | Container Orchestration |                | [Nomad](https://www.nomadproject.io/)    |                            |                          |                  |             |
| Application     | Container Orchestration |                | [Rancher](https://www.rancher.com/)      |                            |                          |                  |             |
| Application     | Secrets                 |                | [Vault][vault]                           | [GitHub][gh-vault]         | [HashiCorp][hashicorp]   |                  |             |
| Application     | IaC                     |                | [Terraform][terraform]                   | [GitHub][gh-terraform]     | [HashiCorp][hashicorp]   |                  |             |
| Application     | Static                  |                | [Cloudflare Pages][cloudflare-pages]     |                            |                          |                  |             |
| Application     | Static                  |                | [GitHub Pages][github-pages]             |                            |                          |                  |             |
| Application     | Serverless              |                | [Cloudflare Workers][cloudflare-workers] |                            | [Cloudflare][cloudflare] |                  |             |
| Application     | Serverless              |                | [Deno Deploy][deno-deploy]               |                            |                          |                  |             |
| Application     | Serverless              |                | [Fly][fly]                               | [GitHub][gh-fly]           | [Fly][fly]               |                  |             |
| Application     | Serverless              |                | [Netlify][netlify]                       | [GitHub][gh-netlify]       | [Netlify][netlify]       |                  |             |
| Application     | Serverless              |                | [Vercel][vercel]                         | [GitHub][gh-vercel]        | [Vercel][vercel]         |                  | Recommended |
| Application     | SaaS                    | Authentication | [Auth0][auth0]                           | [GitHub][gh-auth0]         |                          | [TS][ts]         | Recommended |
| Application     | SaaS                    | Authentication | [Clerk][clerk]                           | [GitHub][gh-clerk]         |                          | [TS][ts]         |             |
| Application     | SaaS                    | Authentication | [Keycloak][keycloak]                     | [GitHub][gh-keycloak]      |                          | [Java][java]     |             |
| Application     | SaaS                    | Authentication | [Okta][okta]                             |                            |                          |                  |             |
| Application     | SaaS                    | Authentication | [OneLogin][onelogin]                     | [GitHub][gh-onelogin]      |                          | [TS][ts]         |             |
| Application     | SaaS                    | Authentication | [OSSO][osso]                             | [GitHub][gh-osso]          |                          | [TS][ts]         |             |
| Application     | SaaS                    | Authentication | [Zitadel][zitadel]                       | [GitHub][gh-zitadel]       |                          | [Go][go]         |             |
| Application     | SaaS                    | Email          | [SendGrid][sendgrid]                     | [GitHub][gh-sendgrid]      |                          | [JS][js]         | Recommended |
| Application     | SaaS                    | Email          | [Mailgun][mailgun]                       | [GitHub][gh-mailgun]       |                          | [Go][go]         |             |
| Application     | SaaS                    | Email          | [Postmark][postmark]                     | [GitHub][gh-postmark]      |                          | [TS][ts]         |             |
| Application     | SaaS                    | Email          | [MailChimp][mailchimp]                   | [GitHub][gh-mailchimp]     |                          | [JS][js]         |             |
| Application     | SaaS                    | Email          | [Resend][resend]                         | [GitHub][gh-resend]        |                          | [TS][ts]         |             |
| Application     | SaaS                    | Payment        | [Braintree][braintree]                   | [GitHub][gh-braintree]     |                          | [JS][js]         |             |
| Application     | SaaS                    | Payment        | [Paddle][paddle]                         | [GitHub][gh-paddle]        |                          | [TS][ts]         |             |
| Application     | SaaS                    | Payment        | [Paypal][paypal]                         | [GitHub][gh-paypal]        |                          | [TS][ts]         |             |
| Application     | SaaS                    | Payment        | [Square][square]                         | [GitHub][gh-square]        |                          | [TS][ts]         |             |
| Application     | SaaS                    | Payment        | [Stripe][stripe]                         | [GitHub][gh-stripe]        |                          | [TS][ts]         |             |
| Application     | SaaS                    | Monitor        | [Grafana][grafana]                       | [GitHub][gh-grafana]       |                          | [TS][ts]         |             |
| Application     | SaaS                    | Monitor        | [Splunk][splunk]                         | [GitHub][gh-splunk]        |                          | [Python][python] |             |
| Application     | PaaS                    |                | [App Engine][google-app-engine]          | [GitHub][gh-app-engine]    | [Alphabet][alphabet]     | [TS][ts]         |             |
| Application     | PaaS                    |                | [Heroku][heroku]                         | [GitHub][gh-heroku]        | [Heroku][heroku]         |                  |             |
| Application     | PaaS                    |                | [OpenShift][openshift]                   | [GitHub][gh-openshift]     | [OpenShift][openshift]   |                  |             |
| Application     | PaaS                    |                | [Railway][railway]                       | [GitHub][gh-railway]       | [Railway][railway]       |                  |             |
| Application     | PaaS                    |                | [Render][render]                         | [GitHub][gh-render]        | [Render][render]         |                  | Recommended |
| Application     | BaaS                    |                | [AppWrite][appwrite]                     | [GitHub][gh-appwrite]      |                          | [TS][ts]         |             |
| Application     | BaaS                    |                | [Firebase][firebase]                     | [GitHub][gh-firebase]      | [Alphabet][alphabet]     | [TS][ts]         |             |
| Application     | BaaS                    |                | [NHost][nhost]                           | [GitHub][gh-nhost]         |                          | [TS][ts]         |             |
| Application     | BaaS                    |                | [PocketBase][pocketbase]                 | [GitHub][gh-pocketbase]    |                          | [Go][go]         |             |
| Application     | BaaS                    |                | [SupaBase][supabase]                     | [GitHub][gh-supabase]      |                          | [TS][ts]         | Recommended |
| Application     | IaaS                    |                | [AWS][aws]                               | [GitHub][gh-aws]           | [Amazon][amazon]         |                  | Recommended |
| Application     | IaaS                    |                | [Azure][ms-azure]                        | [GitHub][gh-azure]         | [Microsoft][ms]          |                  |             |
| Application     | IaaS                    |                | [Google Cloud][google-cloud]             | [GitHub][gh-google-cloud]  | [Alphabet][alphabet]     |                  |             |
| Application     | IaaS                    |                | [Digital Ocean][digital-ocean]           | [GitHub][gh-digital-ocean] |                          |                  |             |
| Application     | IaaS                    |                | [IBM Cloud][ibm-cloud]                   | [GitHub][gh-ibm-cloud]     |                          |                  |             |
| DaaS            | Serverless              | PostgreSQL     | [Neon][neon]                             | [GitHub][gh-neon]          |                          | [Rust][rs]       |             |
| DaaS            | Serverless              | MySQL          | [PlanetScale][planetscale]               | [GitHub][gh-planetscale]   |                          | [Go][go]         |             |

## API

### GenAI

| No  | Type  | Name                                      | Maintainer                           |
| --- | ----- | ----------------------------------------- | ------------------------------------ |
| 01  | Image | [Midjourney](https://www.midjourney.com)  |                                      |
| 02  | Text  | [Perplexity](https://www.perplexity.ai/)  |                                      |
| 03  | Text  | [Grok](https://grok.com/)                 | [X.Ai](https://x.ai/)                |
| 04  | Text  | [Poe](https://www.poe.com/)               | [Quora](https://www.quora.com/)      |
| 05  | Text  | [Claude](https://claude.ai/)              | [Anthropic](https://anthropic.com/)  |
| 06  | Text  | [Deepseek](https://chat.deepseek.com/)    | [DeepSeek AI](https://deepseek.ai/)  |
| 07  | Text  | [Gemini](https://gemini.google.com/)      | [Google](https://google.com/)        |
| 08  | Text  | [Copilot](https://copilot.microsoft.com/) | [Microsoft](https://microsoft.com/)  |
| 09  | Text  | [ChatGPT](https://chatgpt.com/)           | [OpenAI](https://openai.com/)        |
| 10  | Text  | [Llama](https://www.llama.com/)           | [Meta](https://developers.meta.com/) |

### Social

| No  | Company | Category  | API                                                                   |
| --- | ------- | --------- | --------------------------------------------------------------------- |
| 01  | Google  | Videos    | [YouTube](https://developers.google.com/youtube/v3)                   |
| 02  | Meta    | Posts     | [Facebook](https://developers.facebook.com/docs/graph-api/)           |
| 03  | Meta    | Images    | [Instagram](https://developers.facebook.com/products/instagram/apis/) |
| 04  | Meta    | Messaging | [Messenger](https://developers.facebook.com/docs/messenger-platform/) |
| 05  | Meta    | Posts     | [Threads](https://developers.facebook.com/docs/threads/)              |
| 06  | Reddit  | Posts     | [Reddit](https://www.reddit.com/dev/api/)                             |
| 07  | Tiktok  | Videos    | [Tiktok](https://developers.tiktok.com/)                              |
| 08  | X       | Posts     | [Twitter](https://developer.x.com/en/docs/x-api)                      |

### Other

| No  | Category  | API                                             |
| --- | --------- | ----------------------------------------------- |
| 01  | Forex     | [Fixer](https://fixer.io/)                      |
| 02  | Forex     | [Frankfurter](https://frankfurter.dev/)         |
| 03  | Messaging | [Telegram](https://core.telegram.org/)          |
| 04  | News      | [News](https://newsapi.org/)                    |
| 07  | Sports    | [Football Data](https://www.football-data.org/) |
| 08  | Weather   | [Air Visual](https://api-docs.iqair.com/)       |
| 09  | Weather   | [Open Meteo](https://open-meteo.com/)           |
| 10  | Weather   | [Open Weather Map](https://openweathermap.org/) |

[alphabet]: https://abc.xyz
[aws]: https://aws.amazon.com
[git]: https://git-scm.com
[github]: https://github.com
[go]: https://go.dev
[java]: https://www.java.com
[js]: https://www.javascript.com
[ms]: https://www.microsoft.com
[netlify]: https://netlify.com
[rs]: https://www.rust-lang.org
[ts]: https://www.typescriptlang.org
[vercel]: https://vercel.com
[amazon]: https://www.amazon.com
[apache-httpd]: https://httpd.apache.org
[appwrite]: https://appwrite.io
[auth0]: https://auth0.com
[bitbucket]: https://bitbucket.org
[braintree]: https://www.braintreepayments.com
[clerk]: https://clerk.com
[cloudflare]: https://cloudflare.com
[cloudflare-pages]: https://pages.cloudflare.com/
[cloudflare-workers]: https://workers.cloudflare.com
[circleci]: https://circleci.com
[deno-deploy]: https://deno.com/deploy
[digital-ocean]: https://www.digitalocean.com
[docker]: http://docker.com
[docker-compose]: https://docs.docker.com/compose/
[docker-swarm]: https://docs.docker.com/engine/swarm/
[firebase]: https://firebase.google.com
[fly]: https://fly.io
[github-actions]: https://github.com/features/actions
[github-pages]: https://pages.github.com/
[gitlab]: https://gitlab.com
[gitlab-ci]: https://docs.gitlab.com/ee/ci
[google-app-engine]: https://cloud.google.com/appengine
[google-cloud]: https://cloud.google.com
[grafana]: https://grafana.com
[harness]: https://www.harness.io
[hashicorp]: https://www.hashicorp.com
[heroku]: https://www.heroku.com
[ibm-cloud]: https://www.ibm.com/cloud
[jenkins]: https://www.jenkins.io
[keycloak]: https://www.keycloak.org
[kubernetes]: https://kubernetes.io
[launchpad]: https://launchpad.net
[mailchimp]: https://mailchimp.com
[mailgun]: https://www.mailgun.com
[ms-azure]: https://azure.microsoft.com
[neon]: https://neon.tech
[nginx]: https://www.nginx.com
[nhost]: https://nhost.io
[okta]: https://www.okta.com/
[onelogin]: https://developers.onelogin.com
[openshift]: https://www.redhat.com/en/technologies/cloud-computing/openshift
[osso]: https://ossoapp.com
[paddle]: https://www.paddle.com
[paypal]: https://developer.paypal.com
[planetscale]: https://planetscale.com
[pocketbase]: https://pocketbase.io
[postmark]: https://postmarkapp.com
[python]: https://www.python.org
[railway]: https://railway.app
[resend]: https://resend.com
[render]: https://render.com
[sendgrid]: https://sendgrid.com
[splunk]: https://www.splunk.com
[square]: https://developer.squareup.com
[supabase]: https://supabase.com
[stripe]: https://stripe.com
[terraform]: https://www.terraform.io
[travis-ci]: https://www.travis-ci.com
[vault]: https://www.vaultproject.io
[zitadel]: https://zitadel.com
[gh-firebase]: https://github.com/firebase
[gh-pocketbase]: https://github.com/pocketbase/pocketbase
[gh-supabase]: https://github.com/supabase/supabase
[gh-netlify]: https://github.com/netlify
[gh-render]: https://github.com/renderinc
[gh-fly]: https://github.com/superfly
[gh-neon]: https://github.com/neondatabase/neon
[gh-vercel]: https://github.com/vercel
[gh-docker]: https://github.com/docker
[gh-vault]: https://github.com/hashicorp/vault
[gh-terraform]: https://github.com/hashicorp/terraform
[gh-kubernetes]: https://github.com/kubernetes/kubernetes
[gh-aws]: https://github.com/aws
[gh-heroku]: https://github.com/heroku
[gh-nhost]: https://github.com/nhost/nhost
[gh-appwrite]: https://github.com/appwrite/appwrite
[gh-azure]: https://github.com/Azure
[gh-google-cloud]: https://github.com/GoogleCloudPlatform
[gh-digital-ocean]: https://github.com/digitalocean
[gh-ibm-cloud]: https://github.com/IBM-Cloud
[gh-railway]: https://github.com/railwayapp
[gh-planetscale]: https://github.com/planetscale
[gh-braintree]: https://github.com/braintree/braintree-web
[gh-paddle]: https://github.com/PaddleHQ/paddle-node-sdk
[gh-paypal]: https://github.com/paypal/paypal-js
[gh-square]: https://github.com/square/web-sdk
[gh-stripe]: https://github.com/stripe/stripe-js
[gh-auth0]: https://github.com/auth0
[gh-keycloak]: https://github.com/keycloak
[gh-onelogin]: https://github.com/onelogin
[gh-osso]: https://github.com/enterprise-oss/osso
[gh-zitadel]: https://github.com/zitadel/zitadel
[gh-openshift]: https://github.com/openshift
[gh-app-engine]: https://github.com/GoogleCloudPlatform/appengine-cloud-demo-portal
[gh-mailgun]: https://github.com/mailgun
[gh-sendgrid]: https://github.com/sendgrid/sendgrid-nodejs
[gh-postmark]: https://github.com/ActiveCampaign/postmark.js
[gh-mailchimp]: https://github.com/mailchimp
[gh-clerk]: https://github.com/clerk/javascript
[gh-resend]: https://github.com/resend
[gh-grafana]: https://github.com/grafana/grafana
[gh-splunk]: https://github.com/splunk

<!-- Database -->

[apache]: https://apache.org
[apache-cassandra]: https://cassandra.apache.org
[apache-couchdb]: https://couchdb.apache.org
[apache-hbase]: https://hbase.apache.org
[apache-solr]: https://solr.apache.org
[aws-dynamodb]: https://aws.amazon.com/dynamodb/
[cockroachdb]: https://www.cockroachlabs.com
[dgraph]: https://dgraph.io
[drizzle]: https://orm.drizzle.team/
[elasticsearch]: https://www.elastic.co/elasticsearch
[erlang]: https://www.erlang.org
[fauna]: https://fauna.com
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

<!-- DevStack -->

[android-studio]: https://developer.android.com/studio
[cobra]: https://cobra.dev/
[dotnet]: https://learn.microsoft.com/en-us/dotnet/
[fastapi]: https://fastapi.tiangolo.com/
[graphql]: https://graphql.org/
[jetbrains-goland]: https://www.jetbrains.com/go/
[jetbrains-idea]: https://www.jetbrains.com/idea/
[jetbrains-pycharm]: https://www.jetbrains.com/pycharm/
[jupyter]: https://jupyter.org/
[material]: https://m3.material.io/
[nest.js]: https://nestjs.com/
[next.js]: https://nextjs.org/
[oclif]: https://oclif.io/
[react-native]: https://reactnative.dev/
[spring]: https://spring.io/
[spring-boot]: https://spring.io/projects/spring-boot/
[sqlalchemy]: https://www.sqlalchemy.org/
[swiftui]: https://developer.apple.com/tutorials/swiftui/
[tauri]: https://v2.tauri.app/
[tensorflow]: https://www.tensorflow.org
[tensorflow.js]: https://www.tensorflow.org/js
[trpc]: https://trpc.io/
[vs]: https://visualstudio.microsoft.com/
[vsc]: https://code.visualstudio.com/
[xcode]: https://developer.apple.com/xcode/

<!-- Languages -->

[apple]: https://www.apple.com/
[apple-ios]: https://www.apple.com/ios/
[apple-ipados]: https://www.apple.com/ipados/ipados-18/
[apple-macos]: https://www.apple.com/macos/
[apple-swift]: https://www.swift.org/
[apple-swiftui]: https://developer.apple.com/xcode/swiftui/
[dart]: https://dart.dev/
[docker-hub-golang]: https://hub.docker.com/_/golang/
[docker-hub-node]: https://hub.docker.com/_/node/
[docker-hub-openjdk]: https://hub.docker.com/_/openjdk
[docker-hub-php]: https://hub.docker.com/_/php
[docker-hub-python]: https://hub.docker.com/_/python/
[docker-hub-ruby]: https://hub.docker.com/_/ruby
[flutter]: https://flutter.dev/
[google-android]: https://www.android.com/
[google-chromeos]: https://chromeos.google/
[google-material]: https://m3.material.io/
[jetbrains]: https://jetbrains.com/
[jetbrains-kotlin]: https://kotlinlang.org/
[kernel]: https://www.kernel.org/
[ms-csharp]: https://learn.microsoft.com/en-us/dotnet/csharp/
[ms-typescript]: https://www.typescriptlang.org/
[ms-windows]: https://www.microsoft.com/en-us/windows/
[ms-winui]: https://learn.microsoft.com/vi-vn/windows/apps/winui/
[oracle]: https://www.oracle.com/
[oracle-java]: https://www.java.com/
[r]: https://www.r-project.org/
[rust]: https://www.rust-lang.org/
[scala]: https://www.scala-lang.org/
