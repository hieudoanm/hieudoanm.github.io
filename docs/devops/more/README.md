# Configuration

- [Configuration](#configuration)
  - [Docker](#docker)
    - [Theory](#theory)
    - [Database](#database)
    - [Runtimes](#runtimes)
  - [Terraform](#terraform)
  - [Other](#other)

## Docker

### Theory

- Image Layers
  - Each layer is an image itself, just one without a human-assigned tag. They have auto-generated IDs though.
  - Each layer stores the changes compared to the image it's based on.
  - An image can consist of a single layer (that's often the case when the squash command was used).
  - Each instruction in a Dockerfile results in a layer. (Except for multi-stage builds, where usually only the layers in the final image are pushed, or when an image is squashed to a single layer).
  - Layers are used to avoid transferring redundant information and skip build steps which have not changed (according to the Docker cache).
- Cached
  - Its parent image exists in the cache
  - The Dockerfile instruction corresponding to the layer is unchanged (or in case of ADD/COPY, the involved files are exactly the same)
  - Cache Gotcha #1: `RUN apt-get update`
  - Using the Cache Well: it is better to update the package management files (`package.json` & `requirements.txt`), you only have to do it once.

### Database

- Key-Value
  - [redis](https://hub.docker.com/_/redis)
- Wide Column
  - [cassandra](https://hub.docker.com/_/cassandra)
- Document Oriented
  - [mongo](https://hub.docker.com/_/mongo)
- Relational
  - [cockroachdb](https://hub.docker.com/r/cockroachdb/cockroach)
  - [mysql](https://hub.docker.com/_/mysql)
  - [postgres](https://hub.docker.com/_/postgres)
- Graph
  - [neo4j](https://hub.docker.com/_/neo4j)
- Search Engine
  - [elasticsearch](https://hub.docker.com/_/elasticsearch)
- Multi-Model
  - [faunadb](https://hub.docker.com/r/fauna/faunadb)

### Runtimes

- [Golang](https://hub.docker.com/_/golang/)
- [Node.js](https://hub.docker.com/_/node/)
- [OpenJDK](https://hub.docker.com/_/openjdk)
- [Python](https://hub.docker.com/_/python/)

## Terraform

- PaaS
  - Render
  - Vercel
- IaaS
  - Azure
  - AWS
  - Google Cloud

## Other

- Kubernetes
- Server
  - nginx
