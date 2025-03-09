# [Hieu Doan](https://hieudoanm.github.io)

## Table of Content

- [Hieu Doan](#hieu-doan)
  - [Table of Content](#table-of-content)
  - [Downloads](#downloads)
  - [Favourites](#favourites)
  - [Tech Stack](#tech-stack)
    - [Languages](#languages)
    - [Main](#main)
      - [Front-end](#front-end)
      - [Back-end](#back-end)
    - [Options](#options)
  - [Todo](#todo)

## Downloads

- CLI
  - [x] `hieudoanm.bash` - Download [here](./packages/cli/bash/dist/hieudoanm.bash)
  - [x] `hieudoanm.binary` - Download [here](./packages/cli/go/cobra/bin/hieudoanm)
  - [x] [GitHub CLI - Extensions](https://cli.github.com/manual/gh_extension)
    - [x] `gh-coc` - Download [here](./packages/cli/go/github/extensions/gh-coc/bin/gh-coc)
    - [x] `gh-ignore` - Download [here](./packages/cli/go/github/extensions/gh-ignore/bin/gh-ignore)
    - [x] `gh-license` - Download [here](./packages/cli/go/github/extensions/gh-license/bin/gh-license)
- Desktop
  - [ ] `linux.AppImage`
  - [ ] `linux.deb`
  - [x] `macos.dmg`- Download [here](./packages/frontend/web/src-tauri/dist/dmg/nothing_0.0.1_aarch64.dmg)
  - [x] `windows.exe` - Download [here](./packages/frontend/web/src-tauri/dist/exe/nothing_0.0.1_x64-setup.exe)
- Mobile
  - [ ] `android.apk`

## Favourites

- ⭐ [Apps](https://hieudoanm.github.io/apps)
  - ⭐ [Chess](https://hieudoanm.github.io/apps/chess)
    - ⭐ [Chess960](https://hieudoanm.github.io/apps/chess/books/chess960)
    - ⭐ [Openings](https://hieudoanm.github.io/apps/chess/books/openings)
  - ⭐ [Instagram](https://hieudoanm.github.io/apps/instagram)

## Tech Stack

### Languages

| Prerequisite               | IDE                              | Languages                | Docker                       | Note                                                             |
| -------------------------- | -------------------------------- | ------------------------ | ---------------------------- |
|                            | [Android Studio][android-studio] | [Kotlin][kotlin]         |                              | For `Front-end` - `Android` & `ChromeOS` (Google) Development    |
|                            | [XCode][xcode]                   | [Swift][swift]           |                              | For `Front-end` - `iOS` & `iPadOS` & `macOS` (Apple) Development |
| [.NET][dotnet]             | [Visual Studio][vs]              | [C#][csharp]             |                              | For `Front-end` - `Windows` (Microsoft) Development              |
| [Node.js][node.js]         | [Visual Studio][vsc]             | [TypeScript][typescript] | [Docker][docker-hub-node]    | For `Front-end` - `Web` Development                              |
| JDK (Java Development Kit) | [IDEA][jetbrains-idea]           | [Java][java]             | [Docker][docker-hub-openjdk] | For `Back-end` Development                                       |
|                            | [Jupyter][jupyter]               | [Python][python]         | [Docker][docker-hub-python]  | For `Back-end` Development and `Machine Learning`                |
|                            | [Visual Studio][vsc]             | [Go][go]                 | [Docker][docker-hub-golang]  | For `Back-end` Development and `CLI` Development                 |

### Main

| No  | Supergroup | Group                | Subgroup             | Technology                       |
| --- | ---------- | -------------------- | -------------------- | -------------------------------- |
| 01  | CLI        | Libraries            |                      | [Cobra](https://cobra.dev/)      |
| 02  | CLI        | Libraries            |                      | [GitHub CLI][gh-cli]             |
| 11  | DevOps     | Container            |                      | [Docker][docker]                 |
| 12  | DevOps     | Container Management |                      | [Docker Compose][docker-compose] |
| 13  | DevOps     | Version Control      |                      | [GitHub][gh]                     |
| 14  | DevOps     | CI/CD                |                      | [GitHub Actions][gh-actions]     |
| 15  | DevOps     | IaC                  |                      | [Terraform][terraform]           |
| 11  | DevOps     | Database             | NoSQL - (Key-Value)  | [Redis][redis]                   |
| 12  | DevOps     | Database             | NoSQL - (Documental) | [MongoDB][mongodb]               |
| 13  | DevOps     | Database             | SQL (Relational)     | [PostgreSQL][postgresql]         |
| 14  | DevOps     | Hosting              | Static               | [GitHub Pages][gh-pages]         |
| 15  | DevOps     | Hosting              | Serverless           | [Vercel][vercel]                 |
| 16  | DevOps     | Hosting              | Compute              | [Render][render]                 |

#### Front-end

| No  | Supergroup | Group     | Subgroup        | Technology                                  |
| --- | ---------- | --------- | --------------- | ------------------------------------------- |
| 01  | C#         | Styling   | UI Components   | [WinUI][winui]                              |
| 02  | Kotlin     | Styling   | UI Components   | [Material][material]                        |
| 03  | Swift      | Styling   | UI Components   | [SwiftUI][swiftui]                          |
| 04  | TypeScript | Dev Tools | Linting         | [ESLint][eslint]                            |
| 05  | TypeScript | Dev Tools | Formatting      | [Prettier][prettier]                        |
| 06  | TypeScript | Styling   | CSS Utilities   | [TailwindCSS][tailwindcss]                  |
| 07  | TypeScript | Styling   | UI Components   | [DaisyUI][daisyui]                          |
| 08  | TypeScript | Framework | Web             | [Next.js][next.js] - [React][react]         |
| 09  | TypeScript | Framework | Mobile (Hybrid) | [Expo][expo] - [React Native][react-native] |
| 10  | TypeScript | Framework | Desktop         | [Tauri][tauri]                              |
| 11  | TypeScript | Libraries | Authentication  | [NextAuth][next-auth]                       |
| 12  | TypeScript | SaaS      | Authentication  | [Clerk][clerk]                              |

#### Back-end

| No  | Supergroup         | Group            | Subgroup   | Technology                                |
| --- | ------------------ | ---------------- | ---------- | ----------------------------------------- |
| 01  | Golang             | Framework        |            | [net/http](https://pkg.go.dev/net/http)   |
| 02  | [Node.js][node.js] | Framework        |            | [HTTP](https://nodejs.org/api/http.html)  |
| 03  | [Node.js][node.js] | Web Scraping     |            | [Puppeteer][puppeteer]                    |
| 04  | [Node.js][node.js] | Database         | ORM        | [Prisma][prisma]                          |
| 05  | Python             | Dev Tools        | Linting    | [Ruff][ruff]                              |
| 06  | Python             | Dev Tools        | Formatting | [Black][black]                            |
| 07  | Python             | Framework        |            | [FastAPI][fastapi]                        |
| 08  | Python             | Database         | ORM        | [SQLAlchemy](https://www.sqlalchemy.org/) |
| 09  | Python             | Machine Learning |            | [scikit-learn][scikit-learn]              |
| 10  | Python             | Machine Learning |            | [TensorFlow][tensorflow]                  |
| 11  | Python             | Machine Learning |            | [HuggingFace](https://huggingface.co/)    |

### Options

| No  | Supergroup | Group                   | Subgroup                  | Technology                                    | Docker                             | Mantainer        | Chosen     |
| --- | ---------- | ----------------------- | ------------------------- | --------------------------------------------- | ---------------------------------- | ---------------- | ---------- |
| 01  | Front-end  | Libraries               | Authentication            | [BetterAuth][better-auth]                     |                                    |                  |            |
| 02  | Front-end  | Libraries               | Authentication            | [NextAuth][next-auth]                         |                                    |                  | **Chosen** |
| 03  | DevOps     | Operating System        | Linux                     | [Alpine][alpine]                              | [Docker][docker-hub-alpine]        |                  | **Chosen** |
| 04  | DevOps     | Operating System        | Linux                     | [Arch](https://archlinux.org/)                |                                    |                  |            |
| 05  | DevOps     | Operating System        | Linux                     | [Debian](https://www.debian.org/)             |                                    |                  |            |
| 06  | DevOps     | Operating System        | Linux                     | [Fedora](https://fedoraproject.org/)          |                                    |                  |            |
| 07  | DevOps     | Operating System        | Linux                     | [Kali](https://www.kali.org/)                 |                                    |                  |            |
| 08  | DevOps     | Operating System        | Linux                     | RHEL (Red Hat Enterprise Linux)               |                                    |                  |            |
| 09  | DevOps     | Operating System        | Linux                     | [Mint](https://linuxmint.com/)                |                                    |                  |            |
| 10  | DevOps     | Operating System        | Linux                     | [Ubuntu][ubuntu]                              | [Docker][docker-hub-ubuntu]        |                  |            |
| 11  | DevOps     | Server                  |                           | [httpd](https://httpd.apache.org/)            | [Docker][docker-hub-httpd]         |                  |            |
| 12  | DevOps     | Server                  |                           | [nginx](https://nginx.org/)                   | [Docker][docker-hub-nginx]         |                  |            |
| 13  | DevOps     | SaaS                    | Authentication            | [Auth0][auth0]                                |                                    |                  |            |
| 14  | DevOps     | SaaS                    | Authentication            | [Clerk][clerk]                                |                                    |                  | **Chosen** |
| 15  | DevOps     | SaaS                    | Authentication            | [Keycloak][keycloak]                          |                                    |                  |            |
| 16  | DevOps     | SaaS                    | Authentication            | [Okta][okta]                                  |                                    |                  |            |
| 17  | DevOps     | SaaS                    | Authentication            | [OneLogin][onelogin]                          |                                    |                  |            |
| 18  | DevOps     | Container               |                           | [containerd](https://containerd.io/)          |                                    |                  |            |
| 19  | DevOps     | Container               |                           | [Docker](https://www.docker.com/)             |                                    |                  | **Chosen** |
| 20  | DevOps     | Container               |                           | [Podman](https://podman.io/)                  |                                    |                  |            |
| 21  | DevOps     | Container Management    |                           | [Docker Compose][docker-compose]              |                                    |                  | **Chosen** |
| 22  | DevOps     | Container Management    |                           | [Docker Swarm][docker-swarm]                  |                                    |                  |            |
| 23  | DevOps     | Container Orchestration |                           | [Kubernetes](https://kubernetes.io/)          |                                    |                  |            |
| 24  | DevOps     | Container Orchestration |                           | [Nomad](https://www.nomadproject.io/)         |                                    |                  |            |
| 25  | DevOps     | Container Orchestration |                           | [Rancher](https://www.rancher.com/)           |                                    |                  |            |
| 26  | DevOps     | Database                | NoSQL - (Key-Value)       | [Memcached](https://memcached.org/)           | [Docker][docker-hub-memcached]     |                  |            |
| 27  | DevOps     | Database                | NoSQL - (Key-Value)       | [Redis](https://redis.io/)                    | [Docker][docker-hub-redis]         |                  |            |
| 28  | DevOps     | Database                | NoSQL - (Wide Column)     | [Cassandra](https://cassandra.apache.org/)    | [Docker][docker-hub-cassandra]     | [Apache][apache] |            |
| 29  | DevOps     | Database                | NoSQL - (Documental)      | [Couchbase](https://www.couchbase.com/)       |                                    |                  |            |
| 30  | DevOps     | Database                | NoSQL - (Documental)      | [CouchDB](https://couchdb.apache.org/)        | [Docker][docker-hub-couchdb]       | [Apache][apache] |            |
| 31  | DevOps     | Database                | NoSQL - (Documental)      | [MongoDB](https://www.mongodb.com/)           | [Docker][docker-hub-mongo]         |                  |            |
| 32  | DevOps     | Database                | SQL - (Relational)        | [CockroachDB](https://www.cockroachlabs.com/) | [Docker][docker-hub-cockroach]     |                  |            |
| 33  | DevOps     | Database                | SQL - (Relational)        | [MySQL](https://www.mysql.com/)               | [Docker][docker-hub-mysql]         |                  |            |
| 34  | DevOps     | Database                | SQL - (Relational)        | [PostgreSQL](https://www.postgresql.org/)     | [Docker][docker-hub-postgres]      |                  |            |
| 35  | DevOps     | Database                | SQL - (Relational)        | [MariaDB](https://mariadb.org/)               |                                    |                  |            |
| 36  | DevOps     | Database                | SQL - (Relational)        | [SQLite](https://www.sqlite.org/)             |                                    |                  |            |
| 37  | DevOps     | Database                | Graph                     | [Dgraph](https://dgraph.io/)                  | [Docker][docker-hub-dgraph]        |                  |            |
| 38  | DevOps     | Database                | Graph                     | [Neo4j](https://neo4j.com/)                   | [Docker][docker-hub-neo4j]         |                  |            |
| 39  | DevOps     | Database                | Search Engine             | [ElasticSearch][elasticsearch]                | [Docker][docker-hub-elasticsearch] |                  |            |
| 40  | DevOps     | Database                | Search Engine             | [Solr](https://solr.apache.org/)              | [Docker][docker-hub-solr]          | [Apache][apache] |            |
| 41  | DevOps     | Database                | Multi-Model               | [Fauna](https://fauna.com/)                   | [Docker][docker-hub-fauna]         |                  |            |
| 42  | DevOps     | Messages Broker         | Traditional               | ActiveMQ                                      |                                    |                  |            |
| 43  | DevOps     | Messages Broker         | Traditional               | RabbitMQ                                      |                                    |                  |            |
| 44  | DevOps     | Messages Broker         | Distributed & Cloud-Based | NATS (Neural Autonomic Transport System)      |                                    |                  |            |
| 45  | DevOps     | Messages Broker         | Distributed & Cloud-Based | Kafka                                         |                                    | [Apache][apache] | **Chosen** |
| 46  | DevOps     | Messages Broker         | Distributed & Cloud-Based | SQS (Simple Queue Service)                    |                                    | [AWS][aws]       |            |
| 47  | DevOps     | Hosting                 | Static                    | [GitHub Pages][gh-pages]                      |                                    |                  | **Chosen** |
| 48  | DevOps     | Hosting                 | Serverless                | [Cloudflare Pages][cloudflare-pages]          |                                    |                  |            |
| 49  | DevOps     | Hosting                 | Serverless                | [Netlify][netlify]                            |                                    |                  |            |
| 50  | DevOps     | Hosting                 | Serverless                | [Vercel][vercel]                              |                                    |                  | **Chosen** |
| 51  | DevOps     | Hosting                 | Compute                   | [Render][render]                              |                                    |                  | **Chosen** |

## Todo

- [ ] Build Mobile App with [Expo](https://expo.dev)
- [ ] Build Native App with [Lynx](https://lynxjs.org/)
- [ ] Convert Swagger to Postman V2

[alpine]: https://alpinelinux.org/
[android-studio]: https://developer.android.com/studio
[apache]: https://apache.org/
[auth0]: https://auth0.com/
[aws]: https://aws.amazon.com/
[better-auth]: https://www.better-auth.com/
[black]: https://black.readthedocs.io/en/stable/
[clerk]: https://clerk.com/
[cloudflare-pages]: https://pages.cloudflare.com/
[csharp]: https://learn.microsoft.com/en-us/dotnet/csharp/
[daisyui]: https://daisyui.com/
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[docker-hub-alpine]: https://hub.docker.com/_/alpine
[docker-hub-cassandra]: https://hub.docker.com/_/cassandra
[docker-hub-cockroach]: https://hub.docker.com/r/cockroachdb/cockroach
[docker-hub-couchdb]: https://hub.docker.com/_/couchdb
[docker-hub-dgraph]: https://hub.docker.com/r/dgraph/dgraph
[docker-hub-elasticsearch]: https://hub.docker.com/_/elasticsearch
[docker-hub-fauna]: https://hub.docker.com/r/fauna/faunadb
[docker-hub-golang]: https://hub.docker.com/_/golang/
[docker-hub-httpd]: https://hub.docker.com/_/httpd
[docker-hub-node]: https://hub.docker.com/_/node/
[docker-hub-openjdk]: https://hub.docker.com/_/openjdk
[docker-hub-memcached]: https://hub.docker.com/_/memcached
[docker-hub-mongo]: https://hub.docker.com/_/mongo
[docker-hub-mysql]: https://hub.docker.com/_/mysql
[docker-hub-neo4j]: https://hub.docker.com/_/neo4j
[docker-hub-nginx]: https://hub.docker.com/_/nginx
[docker-hub-postgres]: https://hub.docker.com/_/postgres
[docker-hub-python]: https://hub.docker.com/_/python/
[docker-hub-redis]: https://hub.docker.com/_/redis/
[docker-hub-solr]: https://hub.docker.com/_/solr
[docker-hub-ubuntu]: https://hub.docker.com/_/ubuntu/
[docker-swarm]: https://docs.docker.com/engine/swarm/
[dotnet]: https://dotnet.microsoft.com/en-us/
[elasticsearch]: https://www.elastic.co/elasticsearch
[eslint]: https://eslint.org/
[expo]: https://expo.dev/
[fastapi]: https://fastapi.tiangolo.com/
[gh]: https://github.com/
[gh-actions]: https://github.com/features/actions
[gh-cli]: https://docs.github.com/en/github-cli
[gh-pages]: https://pages.github.com/
[go]: https://go.dev/
[java]: https://www.java.com/
[jetbrains-idea]: https://www.jetbrains.com/idea/
[jupyter]: https://jupyter.org/
[keycloak]: https://www.keycloak.org/
[kotlin]: https://kotlinlang.org/
[material]: https://m3.material.io/
[mongodb]: https://www.mongodb.com/
[next-auth]: https://next-auth.js.org/
[next.js]: https://nextjs.org/
[netlify]: https://www.netlify.com/
[node.js]: https://nodejs.org/en
[onelogin]: https://www.onelogin.com/
[okta]: https://www.okta.com/
[postgresql]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[prisma]: https://www.prisma.io/
[puppeteer]: https://pptr.dev/
[python]: https://www.python.org/
[react]: https://react.dev/
[react-native]: https://reactnative.dev/
[redis]: https://redis.io/
[render]: https://render.com/
[ruff]: https://docs.astral.sh/ruff/
[scikit-learn]: https://scikit-learn.org/
[swift]: https://www.swift.org/
[swiftui]: https://developer.apple.com/xcode/swiftui/
[tailwindcss]: https://tailwindcss.com/
[tensorflow]: https://www.tensorflow.org/
[tauri]: https://v2.tauri.app/
[terraform]: https://www.terraform.io
[typescript]: https://www.typescriptlang.org/
[ubuntu]: https://ubuntu.com/
[vercel]: https://vercel.com/
[vs]: https://visualstudio.microsoft.com/
[vsc]: https://code.visualstudio.com/
[xcode]: https://developer.apple.com/xcode/
[winui]: https://learn.microsoft.com/vi-vn/windows/apps/winui/
