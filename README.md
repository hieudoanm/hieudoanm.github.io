# [Hieu Doan](https://hieudoanm.github.io)

## Table of Content

- [Hieu Doan](#hieu-doan)
  - [Table of Content](#table-of-content)
  - [Downloads](#downloads)
  - [Favourites](#favourites)
  - [Tech Stack](#tech-stack)
    - [Main](#main)
    - [Options](#options)
  - [Todo](#todo)

## Downloads

| Group  | Subgroup                       | Name             | Documentation                                                             | Download                                                                                |
| ------ | ------------------------------ | ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| CLI    |                                | `hieu.bash`      | [Documentation](./packages/cli/bash/README.md)                            | Download [here](./packages/cli/bash/dist/hieu.bash)                                     |
| CLI    |                                | `hieu.binary`    | [Documentation](./packages/cli/go/cobra/README.md)                        | Download [here](./packages/cli/go/cobra/bin/hieu)                                       |
| CLI    | [GitHub CLI][gh-cli-extension] | `gh-coc`         | [Documentation](./packages/cli/go/github/extensions/gh-coc/README.md)     | Download [here](./packages/cli/go/github/extensions/gh-coc/bin/gh-coc)                  |
| CLI    | [GitHub CLI][gh-cli-extension] | `gh-ignore`      | [Documentation](./packages/cli/go/github/extensions/gh-ignore/README.md)  | Download [here](./packages/cli/go/github/extensions/gh-ignore/bin/gh-ignore)            |
| CLI    | [GitHub CLI][gh-cli-extension] | `gh-license`     | [Documentation](./packages/cli/go/github/extensions/gh-license/README.md) | Download [here](./packages/cli/go/github/extensions/gh-license/bin/gh-license)          |
| Native | Desktop                        | `linux.AppImage` |                                                                           |                                                                                         |
| Native | Desktop                        | `linux.deb`      |                                                                           |                                                                                         |
| Native | Desktop                        | `macos.dmg`      |                                                                           | Download [here](./packages/frontend/web/src-tauri/dist/dmg/nothing_0.0.1_aarch64.dmg)   |
| Native | Desktop                        | `windows.exe`    |                                                                           | Download [here](./packages/frontend/web/src-tauri/dist/exe/nothing_0.0.1_x64-setup.exe) |
| Native | Mobile                         | `android.apk`    |                                                                           |                                                                                         |
| Native | Smart Watch (Garmin)           | `garmin.rpg`     |                                                                           |                                                                                         |

## Favourites

- ⭐ [Apps](https://hieudoanm.github.io/apps)
  - ⭐ [Chess](https://hieudoanm.github.io/apps/chess)
    - ⭐ [Chess960](https://hieudoanm.github.io/apps/chess/books/chess960)
    - ⭐ [Openings](https://hieudoanm.github.io/apps/chess/books/openings)
  - ⭐ [Instagram](https://hieudoanm.github.io/apps/images/instagram)

## Tech Stack

### Main

| No  | Supergroup         | Group                | Subgroup      | Technology                                |
| --- | ------------------ | -------------------- | ------------- | ----------------------------------------- |
| 01  | CLI                | Libraries            |               | [Cobra](https://cobra.dev/)               |
| 02  | CLI                | Libraries            |               | [GitHub CLI][gh-cli]                      |
| 03  | DevOps             | Container Management |               | [Docker Compose][docker-compose]          |
| 04  | DevOps             | Hosting              | Static        | [GitHub Pages][gh-pages]                  |
| 05  | C#                 | Styling              | UI Components | [WinUI][winui]                            |
| 06  | Kotlin             | Styling              | UI Components | [Material][material]                      |
| 07  | Swift              | Styling              | UI Components | [SwiftUI][swiftui]                        |
| 08  | Golang             | Framework            |               | [net/http](https://pkg.go.dev/net/http)   |
| 09  | [Node.js][node.js] | Framework            |               | [HTTP](https://nodejs.org/api/http.html)  |
| 10  | [Node.js][node.js] | Web Scraping         |               | [Puppeteer][puppeteer]                    |
| 11  | [Node.js][node.js] | Database             | ORM           | [Prisma][prisma]                          |
| 12  | Python             | Dev Tools            | Linting       | [Ruff][ruff]                              |
| 13  | Python             | Dev Tools            | Formatting    | [Black][black]                            |
| 14  | Python             | Framework            |               | [FastAPI][fastapi]                        |
| 15  | Python             | Database             | ORM           | [SQLAlchemy](https://www.sqlalchemy.org/) |
| 16  | Python             | Machine Learning     |               | [scikit-learn][scikit-learn]              |
| 17  | Python             | Machine Learning     |               | [TensorFlow][tensorflow]                  |
| 18  | Python             | Machine Learning     |               | [HuggingFace](https://huggingface.co/)    |

### Options

| No  | Supergroup | Group                   | Subgroup                  | Technology                                    | Docker                         | Mantainer        | Chosen     |
| --- | ---------- | ----------------------- | ------------------------- | --------------------------------------------- | ------------------------------ | ---------------- | ---------- |
| 01  | Front-end  | Libraries               | Authentication            | [BetterAuth][better-auth]                     |                                |                  |            |
| 02  | Front-end  | Libraries               | Authentication            | [NextAuth][next-auth]                         |                                |                  | **Chosen** |
| 03  | DevOps     | Operating System        | Linux                     | [Alpine][alpine]                              | [Docker][docker-hub-alpine]    |                  | **Chosen** |
| 04  | DevOps     | Operating System        | Linux                     | [Arch](https://archlinux.org/)                |                                |                  |            |
| 05  | DevOps     | Operating System        | Linux                     | [Debian](https://www.debian.org/)             |                                |                  |            |
| 06  | DevOps     | Operating System        | Linux                     | [Fedora](https://fedoraproject.org/)          |                                |                  |            |
| 07  | DevOps     | Operating System        | Linux                     | [Kali](https://www.kali.org/)                 |                                |                  |            |
| 08  | DevOps     | Operating System        | Linux                     | RHEL (Red Hat Enterprise Linux)               |                                |                  |            |
| 09  | DevOps     | Operating System        | Linux                     | [Mint](https://linuxmint.com/)                |                                |                  |            |
| 10  | DevOps     | Operating System        | Linux                     | [Ubuntu][ubuntu]                              | [Docker][docker-hub-ubuntu]    |                  |            |
| 11  | DevOps     | Server                  |                           | [httpd](https://httpd.apache.org/)            | [Docker][docker-hub-httpd]     |                  |            |
| 12  | DevOps     | Server                  |                           | [nginx](https://nginx.org/)                   | [Docker][docker-hub-nginx]     |                  |            |
| 13  | DevOps     | SaaS                    | Authentication            | [Auth0][auth0]                                |                                |                  |            |
| 14  | DevOps     | SaaS                    | Authentication            | [Clerk][clerk]                                |                                |                  | **Chosen** |
| 15  | DevOps     | SaaS                    | Authentication            | [Keycloak][keycloak]                          |                                |                  |            |
| 16  | DevOps     | SaaS                    | Authentication            | [Okta][okta]                                  |                                |                  |            |
| 17  | DevOps     | SaaS                    | Authentication            | [OneLogin][onelogin]                          |                                |                  |            |
| 18  | DevOps     | Container               |                           | [containerd](https://containerd.io/)          |                                |                  |            |
| 19  | DevOps     | Container               |                           | [Docker](https://www.docker.com/)             |                                |                  | **Chosen** |
| 20  | DevOps     | Container               |                           | [Podman](https://podman.io/)                  |                                |                  |            |
| 21  | DevOps     | Container Management    |                           | [Docker Compose][docker-compose]              |                                |                  | **Chosen** |
| 22  | DevOps     | Container Management    |                           | [Docker Swarm][docker-swarm]                  |                                |                  |            |
| 23  | DevOps     | Container Orchestration |                           | [Kubernetes](https://kubernetes.io/)          |                                |                  |            |
| 24  | DevOps     | Container Orchestration |                           | [Nomad](https://www.nomadproject.io/)         |                                |                  |            |
| 25  | DevOps     | Container Orchestration |                           | [Rancher](https://www.rancher.com/)           |                                |                  |            |
| 26  | DevOps     | Database                | NoSQL - (Key-Value)       | [Memcached](https://memcached.org/)           | [Docker][docker-hub-memcached] |                  |            |
| 27  | DevOps     | Database                | NoSQL - (Key-Value)       | [Redis](https://redis.io/)                    | [Docker][docker-hub-redis]     |                  |            |
| 28  | DevOps     | Database                | NoSQL - (Wide Column)     | [Cassandra](https://cassandra.apache.org/)    | [Docker][docker-hub-cassandra] | [Apache][apache] |            |
| 29  | DevOps     | Database                | NoSQL - (Documental)      | [Couchbase](https://www.couchbase.com/)       |                                |                  |            |
| 30  | DevOps     | Database                | NoSQL - (Documental)      | [CouchDB](https://couchdb.apache.org/)        | [Docker][docker-hub-couchdb]   | [Apache][apache] |            |
| 31  | DevOps     | Database                | NoSQL - (Documental)      | [MongoDB](https://www.mongodb.com/)           | [Docker][docker-hub-mongo]     |                  |            |
| 32  | DevOps     | Database                | SQL - (Relational)        | [CockroachDB](https://www.cockroachlabs.com/) | [Docker][docker-hub-cockroach] |                  |            |
| 33  | DevOps     | Database                | SQL - (Relational)        | [MySQL](https://www.mysql.com/)               | [Docker][docker-hub-mysql]     |                  |            |
| 34  | DevOps     | Database                | SQL - (Relational)        | [PostgreSQL](https://www.postgresql.org/)     | [Docker][docker-hub-postgres]  |                  |            |
| 35  | DevOps     | Database                | SQL - (Relational)        | [MariaDB](https://mariadb.org/)               |                                |                  |            |
| 36  | DevOps     | Database                | SQL - (Relational)        | [SQLite](https://www.sqlite.org/)             |                                |                  |            |
| 46  | DevOps     | Messages Broker         | Distributed & Cloud-Based | SQS (Simple Queue Service)                    |                                | [AWS][aws]       |            |
| 47  | DevOps     | Hosting                 | Static                    | [GitHub Pages][gh-pages]                      |                                |                  | **Chosen** |
| 48  | DevOps     | Hosting                 | Serverless                | [Cloudflare Pages][cloudflare-pages]          |                                |                  |            |

## Todo

- [ ] Technology
  - [ ] Build Mobile App with [Expo](https://expo.dev)
  - [ ] Build Native App with [Lynx](https://lynxjs.org/)

[alpine]: https://alpinelinux.org/
[apache]: https://apache.org/
[auth0]: https://auth0.com/
[aws]: https://aws.amazon.com/
[better-auth]: https://www.better-auth.com/
[black]: https://black.readthedocs.io/en/stable/
[clerk]: https://clerk.com/
[cloudflare-pages]: https://pages.cloudflare.com/
[docker-compose]: https://docs.docker.com/compose/
[docker-hub-alpine]: https://hub.docker.com/_/alpine
[docker-hub-cassandra]: https://hub.docker.com/_/cassandra
[docker-hub-cockroach]: https://hub.docker.com/r/cockroachdb/cockroach
[docker-hub-couchdb]: https://hub.docker.com/_/couchdb
[docker-hub-httpd]: https://hub.docker.com/_/httpd
[docker-hub-memcached]: https://hub.docker.com/_/memcached
[docker-hub-mongo]: https://hub.docker.com/_/mongo
[docker-hub-mysql]: https://hub.docker.com/_/mysql
[docker-hub-nginx]: https://hub.docker.com/_/nginx
[docker-hub-postgres]: https://hub.docker.com/_/postgres
[docker-hub-redis]: https://hub.docker.com/_/redis/
[docker-hub-ubuntu]: https://hub.docker.com/_/ubuntu/
[docker-swarm]: https://docs.docker.com/engine/swarm/
[fastapi]: https://fastapi.tiangolo.com/
[gh-cli]: https://docs.github.com/en/github-cli
[gh-cli-extension]: https://cli.github.com/manual/gh_extension
[gh-pages]: https://pages.github.com/
[keycloak]: https://www.keycloak.org/
[material]: https://m3.material.io/
[next-auth]: https://next-auth.js.org/
[node.js]: https://nodejs.org/en
[onelogin]: https://www.onelogin.com/
[okta]: https://www.okta.com/
[prisma]: https://www.prisma.io/
[puppeteer]: https://pptr.dev/
[ruff]: https://docs.astral.sh/ruff/
[scikit-learn]: https://scikit-learn.org/
[swiftui]: https://developer.apple.com/xcode/swiftui/
[tensorflow]: https://www.tensorflow.org/
[ubuntu]: https://ubuntu.com/
[winui]: https://learn.microsoft.com/vi-vn/windows/apps/winui/
