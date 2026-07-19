# TREE

```text
├── languages/
│   ├── go/
│   │   ├── docs/
│   │   │   ├── [ARCHITECTURE.md](./languages/go/docs/ARCHITECTURE.md)
│   │   │   ├── [CONTRIBUTING.md](./languages/go/docs/CONTRIBUTING.md)
│   │   │   ├── [DOWNLOADS.md](./languages/go/docs/DOWNLOADS.md)
│   │   │   ├── [PACKAGING.md](./languages/go/docs/PACKAGING.md)
│   │   │   └── [ROADMAP.md](./languages/go/docs/ROADMAP.md)
│   │   ├── internal/
│   │   │   ├── auth/
│   │   │   │   ├── [auth.go](./languages/go/internal/auth/auth.go)
│   │   │   │   └── [auth_test.go](./languages/go/internal/auth/auth_test.go)
│   │   │   ├── cache/
│   │   │   │   ├── [cache.go](./languages/go/internal/cache/cache.go)
│   │   │   │   └── [cache_test.go](./languages/go/internal/cache/cache_test.go)
│   │   │   ├── cron/
│   │   │   │   ├── [cron.go](./languages/go/internal/cron/cron.go)
│   │   │   │   └── [cron_test.go](./languages/go/internal/cron/cron_test.go)
│   │   │   ├── events/
│   │   │   │   └── [events.go](./languages/go/internal/events/events.go)
│   │   │   ├── httpapi/
│   │   │   │   ├── [auth.go](./languages/go/internal/httpapi/auth.go)
│   │   │   │   ├── [buckets.go](./languages/go/internal/httpapi/buckets.go)
│   │   │   │   ├── [cache.go](./languages/go/internal/httpapi/cache.go)
│   │   │   │   ├── [collections.go](./languages/go/internal/httpapi/collections.go)
│   │   │   │   ├── [cronjobs.go](./languages/go/internal/httpapi/cronjobs.go)
│   │   │   │   ├── [handlers_test.go](./languages/go/internal/httpapi/handlers_test.go)
│   │   │   │   ├── [image.go](./languages/go/internal/httpapi/image.go)
│   │   │   │   ├── [image_test.go](./languages/go/internal/httpapi/image_test.go)
│   │   │   │   ├── [import_export_test.go](./languages/go/internal/httpapi/import_export_test.go)
│   │   │   │   ├── [importexport.go](./languages/go/internal/httpapi/importexport.go)
│   │   │   │   ├── [logs.go](./languages/go/internal/httpapi/logs.go)
│   │   │   │   ├── [main_test.go](./languages/go/internal/httpapi/main_test.go)
│   │   │   │   ├── [middleware.go](./languages/go/internal/httpapi/middleware.go)
│   │   │   │   ├── [notification_test.go](./languages/go/internal/httpapi/notification_test.go)
│   │   │   │   ├── [notifications.go](./languages/go/internal/httpapi/notifications.go)
│   │   │   │   ├── [permissions.go](./languages/go/internal/httpapi/permissions.go)
│   │   │   │   ├── [pubsub.go](./languages/go/internal/httpapi/pubsub.go)
│   │   │   │   ├── [pubsub_test.go](./languages/go/internal/httpapi/pubsub_test.go)
│   │   │   │   ├── [rbac_test.go](./languages/go/internal/httpapi/rbac_test.go)
│   │   │   │   ├── [records.go](./languages/go/internal/httpapi/records.go)
│   │   │   │   ├── [routes.go](./languages/go/internal/httpapi/routes.go)
│   │   │   │   ├── [secrets.go](./languages/go/internal/httpapi/secrets.go)
│   │   │   │   ├── [server.go](./languages/go/internal/httpapi/server.go)
│   │   │   │   ├── [swagger.go](./languages/go/internal/httpapi/swagger.go)
│   │   │   │   ├── [swagger_test.go](./languages/go/internal/httpapi/swagger_test.go)
│   │   │   │   ├── [webhook_test.go](./languages/go/internal/httpapi/webhook_test.go)
│   │   │   │   ├── [webhooks.go](./languages/go/internal/httpapi/webhooks.go)
│   │   │   │   └── [websockets.go](./languages/go/internal/httpapi/websockets.go)
│   │   │   ├── id/
│   │   │   │   ├── [id.go](./languages/go/internal/id/id.go)
│   │   │   │   └── [id_test.go](./languages/go/internal/id/id_test.go)
│   │   │   ├── log/
│   │   │   │   ├── [log.go](./languages/go/internal/log/log.go)
│   │   │   │   └── [log_test.go](./languages/go/internal/log/log_test.go)
│   │   │   ├── notification/
│   │   │   │   ├── [notification.go](./languages/go/internal/notification/notification.go)
│   │   │   │   └── [notification_test.go](./languages/go/internal/notification/notification_test.go)
│   │   │   ├── pubsub/
│   │   │   │   ├── [pubsub.go](./languages/go/internal/pubsub/pubsub.go)
│   │   │   │   └── [pubsub_test.go](./languages/go/internal/pubsub/pubsub_test.go)
│   │   │   ├── rbac/
│   │   │   │   └── [rbac.go](./languages/go/internal/rbac/rbac.go)
│   │   │   ├── realtime/
│   │   │   │   ├── [sse.go](./languages/go/internal/realtime/sse.go)
│   │   │   │   ├── [sse_test.go](./languages/go/internal/realtime/sse_test.go)
│   │   │   │   ├── [ws.go](./languages/go/internal/realtime/ws.go)
│   │   │   │   └── [ws_test.go](./languages/go/internal/realtime/ws_test.go)
│   │   │   ├── secrets/
│   │   │   │   ├── [secrets.go](./languages/go/internal/secrets/secrets.go)
│   │   │   │   └── [secrets_test.go](./languages/go/internal/secrets/secrets_test.go)
│   │   │   ├── store/
│   │   │   │   ├── [models.go](./languages/go/internal/store/models.go)
│   │   │   │   ├── [store.go](./languages/go/internal/store/store.go)
│   │   │   │   └── [store_test.go](./languages/go/internal/store/store_test.go)
│   │   │   ├── validation/
│   │   │   │   ├── [validation.go](./languages/go/internal/validation/validation.go)
│   │   │   │   └── [validation_test.go](./languages/go/internal/validation/validation_test.go)
│   │   │   └── webhook/
│   │   │       ├── [webhook.go](./languages/go/internal/webhook/webhook.go)
│   │   │       └── [webhook_test.go](./languages/go/internal/webhook/webhook_test.go)
│   │   ├── public/
│   │   │   ├── [favicon.ico](./languages/go/public/favicon.ico)
│   │   │   └── [index.html](./languages/go/public/index.html)
│   │   ├── scripts/
│   │   │   └── [install.sh](./languages/go/scripts/install.sh)
│   │   ├── tests/
│   │   │   └── [integration_test.go](./languages/go/tests/integration_test.go)
│   │   ├── [AGENTS.md](./languages/go/AGENTS.md)
│   │   ├── [Dockerfile](./languages/go/Dockerfile)
│   │   ├── [LICENSE](./languages/go/LICENSE)
│   │   ├── [Makefile](./languages/go/Makefile)
│   │   ├── [README.md](./languages/go/README.md)
│   │   ├── [go.mod](./languages/go/go.mod)
│   │   ├── [go.sum](./languages/go/go.sum)
│   │   ├── [main.go](./languages/go/main.go)
│   │   └── [main_test.go](./languages/go/main_test.go)
│   ├── kotlin/
│   │   ├── gradle/
│   │   │   └── wrapper/
│   │   │       ├── [gradle-wrapper.jar](./languages/kotlin/gradle/wrapper/gradle-wrapper.jar)
│   │   │       └── [gradle-wrapper.properties](./languages/kotlin/gradle/wrapper/gradle-wrapper.properties)
│   │   ├── public/
│   │   │   ├── [favicon.ico](./languages/kotlin/public/favicon.ico)
│   │   │   └── [index.html](./languages/kotlin/public/index.html)
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   └── kotlin/
│   │   │   │       └── io/
│   │   │   │           └── github/
│   │   │   │               └── hieudoanm/
│   │   │   │                   └── backbone/
│   │   │   │                       ├── auth/
│   │   │   │                       │   └── [Auth.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/auth/Auth.kt)
│   │   │   │                       ├── cache/
│   │   │   │                       │   └── [Cache.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/cache/Cache.kt)
│   │   │   │                       ├── core/
│   │   │   │                       │   ├── [AppConfig.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/core/AppConfig.kt)
│   │   │   │                       │   ├── [AppState.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/core/AppState.kt)
│   │   │   │                       │   └── [Error.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/core/Error.kt)
│   │   │   │                       ├── cron/
│   │   │   │                       │   └── [CronJobs.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/cron/CronJobs.kt)
│   │   │   │                       ├── crypto/
│   │   │   │                       │   └── [Crypto.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/crypto/Crypto.kt)
│   │   │   │                       ├── database/
│   │   │   │                       │   └── [Database.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/database/Database.kt)
│   │   │   │                       ├── http/
│   │   │   │                       │   └── [HttpClient.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/http/HttpClient.kt)
│   │   │   │                       ├── models/
│   │   │   │                       │   ├── [Logs.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/models/Logs.kt)
│   │   │   │                       │   └── [Notifications.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/models/Notifications.kt)
│   │   │   │                       ├── openapi/
│   │   │   │                       │   └── [OpenApi.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/openapi/OpenApi.kt)
│   │   │   │                       ├── ratelimit/
│   │   │   │                       │   └── [RateLimiter.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/ratelimit/RateLimiter.kt)
│   │   │   │                       ├── routes/
│   │   │   │                       │   └── [Routes.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/routes/Routes.kt)
│   │   │   │                       ├── ws/
│   │   │   │                       │   ├── [SSEHub.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/ws/SSEHub.kt)
│   │   │   │                       │   └── [WebSockets.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/ws/WebSockets.kt)
│   │   │   │                       └── [Main.kt](./languages/kotlin/src/main/kotlin/io/github/hieudoanm/backbone/Main.kt)
│   │   │   └── test/
│   │   │       └── kotlin/
│   │   │           └── io/
│   │   │               └── github/
│   │   │                   └── hieudoanm/
│   │   │                       └── backbone/
│   │   │                           ├── auth/
│   │   │                           │   └── [AuthTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/auth/AuthTest.kt)
│   │   │                           ├── cache/
│   │   │                           │   └── [CacheStoreTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/cache/CacheStoreTest.kt)
│   │   │                           ├── core/
│   │   │                           │   ├── [AppConfigTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/core/AppConfigTest.kt)
│   │   │                           │   └── [ErrorTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/core/ErrorTest.kt)
│   │   │                           ├── cron/
│   │   │                           │   └── [CronJobsTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/cron/CronJobsTest.kt)
│   │   │                           ├── crypto/
│   │   │                           │   └── [CryptoTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/crypto/CryptoTest.kt)
│   │   │                           ├── database/
│   │   │                           │   └── [DatabaseTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/database/DatabaseTest.kt)
│   │   │                           ├── http/
│   │   │                           │   └── [HttpClientTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/http/HttpClientTest.kt)
│   │   │                           ├── models/
│   │   │                           │   └── [ModelsTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/models/ModelsTest.kt)
│   │   │                           ├── openapi/
│   │   │                           │   └── [OpenApiTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/openapi/OpenApiTest.kt)
│   │   │                           ├── ratelimit/
│   │   │                           │   └── [RateLimiterTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/ratelimit/RateLimiterTest.kt)
│   │   │                           ├── routes/
│   │   │                           │   ├── [RoutesTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/routes/RoutesTest.kt)
│   │   │                           │   └── [RoutesTestBase.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/routes/RoutesTestBase.kt)
│   │   │                           └── ws/
│   │   │                               ├── [SSEHubTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/ws/SSEHubTest.kt)
│   │   │                               └── [WebSocketHubTest.kt](./languages/kotlin/src/test/kotlin/io/github/hieudoanm/backbone/ws/WebSocketHubTest.kt)
│   │   ├── [AGENTS.md](./languages/kotlin/AGENTS.md)
│   │   ├── [Dockerfile](./languages/kotlin/Dockerfile)
│   │   ├── [Makefile](./languages/kotlin/Makefile)
│   │   ├── [README.md](./languages/kotlin/README.md)
│   │   ├── [build.gradle.kts](./languages/kotlin/build.gradle.kts)
│   │   ├── [gradle.properties](./languages/kotlin/gradle.properties)
│   │   ├── [gradlew](./languages/kotlin/gradlew)
│   │   ├── [gradlew.bat](./languages/kotlin/gradlew.bat)
│   │   └── [settings.gradle.kts](./languages/kotlin/settings.gradle.kts)
│   ├── prisma/
│   │   └── [schema.prisma](./languages/prisma/schema.prisma)
│   ├── rust/
│   │   ├── public/
│   │   │   ├── [favicon.ico](./languages/rust/public/favicon.ico)
│   │   │   └── [index.html](./languages/rust/public/index.html)
│   │   ├── src/
│   │   │   ├── [auth.rs](./languages/rust/src/auth.rs)
│   │   │   ├── [cache.rs](./languages/rust/src/cache.rs)
│   │   │   ├── [content_type.rs](./languages/rust/src/content_type.rs)
│   │   │   ├── [cronjobs.rs](./languages/rust/src/cronjobs.rs)
│   │   │   ├── [db.rs](./languages/rust/src/db.rs)
│   │   │   ├── [handlers.rs](./languages/rust/src/handlers.rs)
│   │   │   ├── [image.rs](./languages/rust/src/image.rs)
│   │   │   ├── [import_export.rs](./languages/rust/src/import_export.rs)
│   │   │   ├── [log.rs](./languages/rust/src/log.rs)
│   │   │   ├── [main.rs](./languages/rust/src/main.rs)
│   │   │   ├── [models.rs](./languages/rust/src/models.rs)
│   │   │   ├── [notification.rs](./languages/rust/src/notification.rs)
│   │   │   ├── [openapi.rs](./languages/rust/src/openapi.rs)
│   │   │   ├── [pubsub.rs](./languages/rust/src/pubsub.rs)
│   │   │   ├── [rate_limit.rs](./languages/rust/src/rate_limit.rs)
│   │   │   ├── [rbac.rs](./languages/rust/src/rbac.rs)
│   │   │   ├── [secrets.rs](./languages/rust/src/secrets.rs)
│   │   │   ├── [webhook.rs](./languages/rust/src/webhook.rs)
│   │   │   └── [websocket.rs](./languages/rust/src/websocket.rs)
│   │   ├── tests/
│   │   │   └── [api.rs](./languages/rust/tests/api.rs)
│   │   ├── [AGENTS.md](./languages/rust/AGENTS.md)
│   │   ├── [Cargo.lock](./languages/rust/Cargo.lock)
│   │   ├── [Cargo.toml](./languages/rust/Cargo.toml)
│   │   ├── [Dockerfile](./languages/rust/Dockerfile)
│   │   ├── [Makefile](./languages/rust/Makefile)
│   │   └── [README.md](./languages/rust/README.md)
│   └── [README.md](./languages/README.md)
├── public/
│   ├── [demo-en-descriptions.vtt](./public/demo-en-descriptions.vtt)
│   ├── [demo.mp4](./public/demo.mp4)
│   ├── [demo.png](./public/demo.png)
│   ├── [demo.svg](./public/demo.svg)
│   └── [index.html](./public/index.html)
├── [README.md](./README.md)
├── [TREE.md](./TREE.md)
├── [docker-compose.yml](./docker-compose.yml)
└── [landify.yaml](./landify.yaml)
```

69 directories, 159 files
