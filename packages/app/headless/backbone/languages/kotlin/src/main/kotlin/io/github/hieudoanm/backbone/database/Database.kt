package io.github.hieudoanm.backbone.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.github.hieudoanm.backbone.core.AppConfig
import java.sql.Connection
import java.sql.ResultSet

class Database(private val config: AppConfig) : AutoCloseable {
    private val ds: HikariDataSource

    init {
        val dbDir = java.io.File(config.backboneData)
        dbDir.mkdirs()
        val dbPath = java.io.File(dbDir, "data.db").absolutePath

        val hikariConfig = HikariConfig().apply {
            jdbcUrl = "jdbc:sqlite:$dbPath"
            driverClassName = "org.sqlite.JDBC"
            maximumPoolSize = 1
            isAutoCommit = true
            connectionTestQuery = "SELECT 1"
            connectionInitSql = "PRAGMA busy_timeout = 5000"
        }
        ds = HikariDataSource(hikariConfig)
        migrate()
    }

    fun connection(): Connection = ds.connection

    private fun migrate() {
        connection().use { conn ->
            conn.createStatement().apply {
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _users (
                        id TEXT PRIMARY KEY,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL,
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _collections (
                        name TEXT PRIMARY KEY,
                        schema TEXT NOT NULL DEFAULT '{}',
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _buckets (
                        name TEXT PRIMARY KEY,
                        is_public INTEGER NOT NULL DEFAULT 0,
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _files (
                        id TEXT PRIMARY KEY,
                        bucket TEXT NOT NULL,
                        filename TEXT NOT NULL,
                        mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
                        size INTEGER NOT NULL DEFAULT 0,
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _webhooks (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        url TEXT NOT NULL,
                        events TEXT NOT NULL DEFAULT '[]',
                        secret TEXT NOT NULL DEFAULT '',
                        is_active INTEGER NOT NULL DEFAULT 1,
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _webhook_logs (
                        id TEXT PRIMARY KEY,
                        webhook_id TEXT NOT NULL,
                        event TEXT NOT NULL,
                        url TEXT NOT NULL,
                        request_body TEXT NOT NULL DEFAULT '',
                        response_status INTEGER NOT NULL DEFAULT 0,
                        response_body TEXT NOT NULL DEFAULT '',
                        error TEXT NOT NULL DEFAULT '',
                        status TEXT NOT NULL DEFAULT '',
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _secrets (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        value TEXT NOT NULL,
                        scope TEXT NOT NULL DEFAULT 'general',
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _cronjobs (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        schedule TEXT NOT NULL,
                        command TEXT NOT NULL,
                        method TEXT NOT NULL DEFAULT 'GET',
                        headers TEXT NOT NULL DEFAULT '',
                        body TEXT NOT NULL DEFAULT '',
                        is_active INTEGER NOT NULL DEFAULT 1,
                        last_run_at TEXT NOT NULL DEFAULT '',
                        last_run_status TEXT NOT NULL DEFAULT '',
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _cronjob_logs (
                        id TEXT PRIMARY KEY,
                        cronjob_id TEXT NOT NULL,
                        started_at TEXT NOT NULL,
                        finished_at TEXT NOT NULL,
                        duration_ms INTEGER NOT NULL DEFAULT 0,
                        status TEXT NOT NULL DEFAULT '',
                        output TEXT NOT NULL DEFAULT '',
                        error TEXT NOT NULL DEFAULT ''
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _ws_connections (
                        id TEXT PRIMARY KEY,
                        remote_addr TEXT NOT NULL,
                        path TEXT NOT NULL DEFAULT '/',
                        user_agent TEXT NOT NULL DEFAULT '',
                        connected_at TEXT NOT NULL,
                        disconnected_at TEXT NOT NULL DEFAULT '',
                        is_active INTEGER NOT NULL DEFAULT 1,
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _ws_messages (
                        id TEXT PRIMARY KEY,
                        connection_id TEXT,
                        direction TEXT NOT NULL,
                        content TEXT NOT NULL,
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _cache (
                        key TEXT PRIMARY KEY,
                        value TEXT NOT NULL,
                        ttl INTEGER NOT NULL DEFAULT 0,
                        expires_at TEXT NOT NULL DEFAULT '',
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _notifications (
                        id TEXT PRIMARY KEY,
                        title TEXT NOT NULL,
                        body TEXT NOT NULL DEFAULT '',
                        type TEXT NOT NULL DEFAULT 'info',
                        is_read INTEGER NOT NULL DEFAULT 0,
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _logs (
                        id TEXT PRIMARY KEY,
                        level TEXT NOT NULL DEFAULT 'info',
                        message TEXT NOT NULL,
                        meta TEXT NOT NULL DEFAULT '{}',
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _pubsub_topics (
                        id TEXT PRIMARY KEY,
                        name TEXT UNIQUE NOT NULL,
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _pubsub_messages (
                        id TEXT PRIMARY KEY,
                        topic_id TEXT NOT NULL REFERENCES _pubsub_topics(id) ON DELETE CASCADE,
                        body TEXT NOT NULL,
                        created_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
                executeUpdate("""
                    CREATE TABLE IF NOT EXISTS _permissions (
                        id TEXT PRIMARY KEY,
                        user_id TEXT NOT NULL,
                        collection TEXT NOT NULL,
                        role TEXT NOT NULL,
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
                        UNIQUE(user_id, collection)
                    )
                """)
                close()
            }
        }
    }

    fun ensureDataTable(collectionName: String) {
        val tableName = "_data_$collectionName"
        connection().use { conn ->
            val exists = conn.metaData.getTables(null, null, tableName, null).next()
            if (!exists) {
                conn.createStatement().executeUpdate("""
                    CREATE TABLE IF NOT EXISTS $tableName (
                        id TEXT PRIMARY KEY,
                        data TEXT NOT NULL DEFAULT '{}',
                        created_at TEXT NOT NULL DEFAULT (datetime('now')),
                        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
                    )
                """)
            }
        }
    }

    fun collectionTableName(name: String): String = "_data_$name"

    override fun close() {
        ds.close()
    }
}

fun ResultSet.toList(): List<Map<String, Any?>> {
    val meta = metaData
    val cols = (1..meta.columnCount).map { meta.getColumnLabel(it) }
    val result = mutableListOf<Map<String, Any?>>()
    while (next()) {
        result.add(cols.associateWith { getObject(it) })
    }
    return result
}
