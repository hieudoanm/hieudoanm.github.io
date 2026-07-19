package io.github.hieudoanm.backbone.core

import io.github.hieudoanm.backbone.cache.CacheStore
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.ratelimit.RateLimiter
import io.github.hieudoanm.backbone.ws.SSEHub
import io.github.hieudoanm.backbone.ws.WebSocketHub
import io.ktor.client.*
import java.io.File

data class AppState(
    val config: AppConfig,
    val db: Database,
    val cache: CacheStore,
    val rateLimiter: RateLimiter,
    val wsHub: WebSocketHub,
    val notifHub: SSEHub<String>,
    val logHub: SSEHub<String>,
    val pubsubHub: SSEHub<String>,
    val storageDir: File,
    val secretsKey: ByteArray,
    val httpClient: HttpClient,
)
