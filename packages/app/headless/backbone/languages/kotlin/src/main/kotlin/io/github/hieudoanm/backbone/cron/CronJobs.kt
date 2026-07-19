package io.github.hieudoanm.backbone.cron

import io.github.hieudoanm.backbone.crypto.uuid
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.database.toList
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.http.contentType
import kotlinx.coroutines.*

fun startCronScheduler(scope: CoroutineScope, db: Database, httpClient: HttpClient) {
    scope.launch {
        while (isActive) {
            delay(30_000)
            val now = java.time.LocalDateTime.now()
            val rows = db.connection().use { conn ->
                conn.createStatement().executeQuery(
                    "SELECT * FROM _cronjobs WHERE is_active = 1"
                ).toList()
            }
            for (row in rows) {
                try {
                    val schedule = row["schedule"] as String
                    val lastRunAt = row["last_run_at"] as? String ?: ""
                    val shouldRun = if (lastRunAt.isBlank()) true else {
                        try {
                            val lastRun = java.time.LocalDateTime.parse(lastRunAt.replace(" ", "T"))
                            java.time.Duration.between(lastRun, now).toMinutes() >= parseInterval(schedule)
                        } catch (_: Exception) { true }
                    }
                    if (shouldRun) executeCronJob(db, httpClient, row["id"] as String)
                } catch (_: Exception) { }
            }
        }
    }
}

private fun parseInterval(schedule: String): Long {
    val parts = schedule.split("\\s+".toRegex())
    if (parts.size >= 2 && parts[0].startsWith("*/")) {
        return parts[0].removePrefix("*/").toLongOrNull() ?: 30L
    }
    return 30L
}

suspend fun executeCronJob(db: Database, httpClient: HttpClient, jobId: String) {
    val row = db.connection().use { conn ->
        val rs = conn.createStatement().executeQuery("SELECT * FROM _cronjobs WHERE id = '$jobId'")
        if (!rs.next()) return
        mapOf(
            "id" to rs.getString("id"), "name" to rs.getString("name"),
            "command" to rs.getString("command"), "method" to rs.getString("method"),
            "headers" to rs.getString("headers"), "body" to rs.getString("body"),
        )
    }
    val startedAt = java.time.LocalDateTime.now().toString()
    val logId = uuid()
    try {
        val urlString = row["command"] as String
        val httpMethod = when ((row["method"] as String).uppercase()) {
            "POST" -> HttpMethod.Post
            "PUT" -> HttpMethod.Put
            "PATCH" -> HttpMethod.Patch
            "DELETE" -> HttpMethod.Delete
            else -> HttpMethod.Get
        }
        val headersStr = row["headers"] as? String ?: ""
        val headers = if (headersStr.isNotBlank()) {
            kotlinx.serialization.json.Json.decodeFromString<List<List<String>>>(headersStr)
        } else emptyList()
        val bodyStr = row["body"] as? String ?: ""
        val response = httpClient.request(urlString) {
            method = httpMethod
            for (h in headers) { if (h.size == 2) header(h[0], h[1]) }
            if (bodyStr.isNotBlank() && httpMethod != HttpMethod.Get) {
                setBody(bodyStr)
                contentType(ContentType.Application.Json)
            }
        }
        val finishedAt = java.time.LocalDateTime.now().toString()
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error)
                VALUES ('$logId', '$jobId', '$startedAt', '$finishedAt', 0, 'success', '${response.status.value}', '')
            """)
            conn.createStatement().executeUpdate(
                "UPDATE _cronjobs SET last_run_at = datetime('now'), last_run_status = 'success' WHERE id = '$jobId'"
            )
        }
    } catch (e: Exception) {
        val finishedAt = java.time.LocalDateTime.now().toString()
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error)
                VALUES ('$logId', '$jobId', '$startedAt', '$finishedAt', 0, 'failure', '', '${e.message?.replace("'", "''") ?: ""}')
            """)
            conn.createStatement().executeUpdate(
                "UPDATE _cronjobs SET last_run_at = datetime('now'), last_run_status = 'failure' WHERE id = '$jobId'"
            )
        }
    }
}
