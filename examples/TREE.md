# TREE

```text
├── ci/
│   ├── github-actions/
│   │   ├── js/
│   │   │   ├── [ci-bun.yaml](./ci/github-actions/js/ci-bun.yaml)
│   │   │   ├── [ci-deno.yaml](./ci/github-actions/js/ci-deno.yaml)
│   │   │   └── [ci-node.yaml](./ci/github-actions/js/ci-node.yaml)
│   │   ├── [ci-go.yaml](./ci/github-actions/ci-go.yaml)
│   │   ├── [ci-python.yaml](./ci/github-actions/ci-python.yaml)
│   │   └── [ci-rust.yaml](./ci/github-actions/ci-rust.yaml)
│   ├── jenkins/
│   │   ├── js/
│   │   │   ├── [bun.jenkinsfile](./ci/jenkins/js/bun.jenkinsfile)
│   │   │   ├── [deno.jenkinsfile](./ci/jenkins/js/deno.jenkinsfile)
│   │   │   └── [node.jenkinsfile](./ci/jenkins/js/node.jenkinsfile)
│   │   ├── [go.jenkinsfile](./ci/jenkins/go.jenkinsfile)
│   │   ├── [python.jenkinsfile](./ci/jenkins/python.jenkinsfile)
│   │   └── [rust.jenkinsfile](./ci/jenkins/rust.jenkinsfile)
│   └── [README.md](./ci/README.md)
├── docker/
│   ├── compose/
│   │   ├── aws/
│   │   │   ├── localstack/
│   │   │   │   ├── [Makefile](./docker/compose/aws/localstack/Makefile)
│   │   │   │   └── [docker-compose.yaml](./docker/compose/aws/localstack/docker-compose.yaml)
│   │   │   └── [README.md](./docker/compose/aws/README.md)
│   │   ├── databases/
│   │   │   ├── cache/
│   │   │   │   ├── memcached/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/cache/memcached/docker-compose.yaml)
│   │   │   │   └── redis/
│   │   │   │       └── [docker-compose.yaml](./docker/compose/databases/cache/redis/docker-compose.yaml)
│   │   │   ├── columns/
│   │   │   │   ├── apache-cassandra/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/columns/apache-cassandra/docker-compose.yaml)
│   │   │   │   └── apache-hbase/
│   │   │   │       └── [docker-compose.yaml](./docker/compose/databases/columns/apache-hbase/docker-compose.yaml)
│   │   │   ├── documental/
│   │   │   │   ├── couchbase/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/documental/couchbase/docker-compose.yaml)
│   │   │   │   ├── couchdb/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/documental/couchdb/docker-compose.yaml)
│   │   │   │   └── mongodb/
│   │   │   │       └── [docker-compose.yaml](./docker/compose/databases/documental/mongodb/docker-compose.yaml)
│   │   │   ├── relational/
│   │   │   │   ├── cockroachdb/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/relational/cockroachdb/docker-compose.yaml)
│   │   │   │   ├── mariadb/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/relational/mariadb/docker-compose.yaml)
│   │   │   │   ├── mysql/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/relational/mysql/docker-compose.yaml)
│   │   │   │   ├── postgresql/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/relational/postgresql/docker-compose.yaml)
│   │   │   │   └── sqlite/
│   │   │   │       └── [docker-compose.yaml](./docker/compose/databases/relational/sqlite/docker-compose.yaml)
│   │   │   ├── search/
│   │   │   │   ├── elasticsearch/
│   │   │   │   │   └── [docker-compose.yaml](./docker/compose/databases/search/elasticsearch/docker-compose.yaml)
│   │   │   │   └── opensearch/
│   │   │   │       └── [docker-compose.yaml](./docker/compose/databases/search/opensearch/docker-compose.yaml)
│   │   │   └── [README.md](./docker/compose/databases/README.md)
│   │   ├── messages/
│   │   │   ├── activemq/
│   │   │   │   └── [docker-compose.yaml](./docker/compose/messages/activemq/docker-compose.yaml)
│   │   │   ├── aws-sqs/
│   │   │   │   └── [docker-compose.yaml](./docker/compose/messages/aws-sqs/docker-compose.yaml)
│   │   │   ├── kafka/
│   │   │   │   └── [docker-compose.yaml](./docker/compose/messages/kafka/docker-compose.yaml)
│   │   │   ├── nats/
│   │   │   │   └── [docker-compose.yaml](./docker/compose/messages/nats/docker-compose.yaml)
│   │   │   ├── rabbitmq/
│   │   │   │   └── [docker-compose.yaml](./docker/compose/messages/rabbitmq/docker-compose.yaml)
│   │   │   └── [README.md](./docker/compose/messages/README.md)
│   │   └── secrets/
│   │       └── vault/
│   │           └── [docker-compose.yaml](./docker/compose/secrets/vault/docker-compose.yaml)
│   └── file/
│       ├── languages/
│       │   ├── go/
│       │   │   ├── backend/
│       │   │   │   └── gin/
│       │   │   │       └── [Dockerfile](./docker/file/languages/go/backend/gin/Dockerfile)
│       │   │   └── [Dockerfile](./docker/file/languages/go/Dockerfile)
│       │   ├── java/
│       │   │   ├── backend/
│       │   │   │   └── spring/
│       │   │   │       └── [Dockerfile](./docker/file/languages/java/backend/spring/Dockerfile)
│       │   │   └── [Dockerfile](./docker/file/languages/java/Dockerfile)
│       │   ├── javascript/
│       │   │   ├── frontend/
│       │   │   │   ├── client/
│       │   │   │   │   ├── angular/
│       │   │   │   │   │   └── [Dockerfile](./docker/file/languages/javascript/frontend/client/angular/Dockerfile)
│       │   │   │   │   ├── react.js/
│       │   │   │   │   │   └── [Dockerfile](./docker/file/languages/javascript/frontend/client/react.js/Dockerfile)
│       │   │   │   │   ├── solid.js/
│       │   │   │   │   │   └── [Dockerfile](./docker/file/languages/javascript/frontend/client/solid.js/Dockerfile)
│       │   │   │   │   ├── svelte.js/
│       │   │   │   │   │   └── [Dockerfile](./docker/file/languages/javascript/frontend/client/svelte.js/Dockerfile)
│       │   │   │   │   └── vue.js/
│       │   │   │   │       └── [Dockerfile](./docker/file/languages/javascript/frontend/client/vue.js/Dockerfile)
│       │   │   │   └── meta/
│       │   │   │       ├── angular.ssr/
│       │   │   │       │   └── [Dockerfile](./docker/file/languages/javascript/frontend/meta/angular.ssr/Dockerfile)
│       │   │   │       ├── next.js/
│       │   │   │       │   └── [Dockerfile](./docker/file/languages/javascript/frontend/meta/next.js/Dockerfile)
│       │   │   │       ├── nuxt.js/
│       │   │   │       │   └── [Dockerfile](./docker/file/languages/javascript/frontend/meta/nuxt.js/Dockerfile)
│       │   │   │       ├── solid.start/
│       │   │   │       │   └── [Dockerfile](./docker/file/languages/javascript/frontend/meta/solid.start/Dockerfile)
│       │   │   │       └── svelte.kit/
│       │   │   │           └── [Dockerfile](./docker/file/languages/javascript/frontend/meta/svelte.kit/Dockerfile)
│       │   │   └── runtimes/
│       │   │       ├── bun/
│       │   │       │   └── [Dockerfile](./docker/file/languages/javascript/runtimes/bun/Dockerfile)
│       │   │       ├── deno/
│       │   │       │   └── [Dockerfile](./docker/file/languages/javascript/runtimes/deno/Dockerfile)
│       │   │       └── node/
│       │   │           └── [Dockerfile](./docker/file/languages/javascript/runtimes/node/Dockerfile)
│       │   ├── python/
│       │   │   ├── backend/
│       │   │   │   ├── django/
│       │   │   │   │   └── [Dockerfile](./docker/file/languages/python/backend/django/Dockerfile)
│       │   │   │   ├── fastapi/
│       │   │   │   │   └── [Dockerfile](./docker/file/languages/python/backend/fastapi/Dockerfile)
│       │   │   │   └── flask/
│       │   │   │       └── [Dockerfile](./docker/file/languages/python/backend/flask/Dockerfile)
│       │   │   └── [Dockerfile](./docker/file/languages/python/Dockerfile)
│       │   └── rust/
│       │       └── [Dockerfile](./docker/file/languages/rust/Dockerfile)
│       └── server/
│           ├── apache-http-server/
│           │   ├── [Dockerfile](./docker/file/server/apache-http-server/Dockerfile)
│           │   └── [httpd.conf](./docker/file/server/apache-http-server/httpd.conf)
│           ├── haproxy/
│           │   ├── [Dockerfile](./docker/file/server/haproxy/Dockerfile)
│           │   └── [haproxy.cfg](./docker/file/server/haproxy/haproxy.cfg)
│           ├── nginx/
│           │   ├── [Dockerfile](./docker/file/server/nginx/Dockerfile)
│           │   └── [nginx.conf](./docker/file/server/nginx/nginx.conf)
│           └── pocket-base/
│               └── [Dockerfile](./docker/file/server/pocket-base/Dockerfile)
└── [TREE.md](./TREE.md)
```

74 directories, 68 files
