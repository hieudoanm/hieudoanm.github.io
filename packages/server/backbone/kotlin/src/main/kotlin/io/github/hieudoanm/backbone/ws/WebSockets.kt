package io.github.hieudoanm.backbone.ws

import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.database.toList
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.util.concurrent.ConcurrentHashMap

class WebSocketHub(private val db: Database) {
    data class WSClient(
        val id: String,
        val session: WebSocketSession,
        val remoteAddr: String,
        val path: String,
        val userAgent: String,
    )

    private val clients = ConcurrentHashMap<String, WSClient>()

    fun register(client: WSClient) {
        clients[client.id] = client
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _ws_connections (id, remote_addr, path, user_agent, connected_at, created_at)
                VALUES ('${client.id}', '${client.remoteAddr.replace("'", "''")}',
                        '${client.path.replace("'", "''")}', '${client.userAgent.replace("'", "''")}',
                        datetime('now'), datetime('now'))
            """)
        }
    }

    fun unregister(id: String) {
        clients.remove(id)
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                UPDATE _ws_connections SET disconnected_at = datetime('now'), is_active = 0
                WHERE id = '$id'
            """)
        }
    }

    fun getAll(): List<Map<String, Any?>> {
        return db.connection().use { conn ->
            conn.createStatement().executeQuery(
                "SELECT * FROM _ws_connections ORDER BY created_at DESC"
            ).toList().map { row ->
                mapOf(
                    "id" to row["id"], "remote_addr" to row["remote_addr"],
                    "path" to row["path"], "user_agent" to row["user_agent"],
                    "is_active" to ((row["is_active"] as? Number)?.toInt() == 1),
                    "connected_at" to row["connected_at"],
                    "disconnected_at" to row["disconnected_at"],
                    "created_at" to row["created_at"],
                )
            }
        }
    }

    fun getById(id: String): Map<String, Any?>? {
        return db.connection().use { conn ->
            val row = conn.createStatement().executeQuery(
                "SELECT * FROM _ws_connections WHERE id = '$id'"
            )
            if (!row.next()) return@use null
            mapOf(
                "id" to row.getString("id"), "remote_addr" to row.getString("remote_addr"),
                "path" to row.getString("path"), "user_agent" to row.getString("user_agent"),
                "is_active" to (row.getInt("is_active") == 1),
                "connected_at" to row.getString("connected_at"),
                "disconnected_at" to row.getString("disconnected_at"),
                "created_at" to row.getString("created_at"),
            )
        }
    }

    fun broadcast(message: String) {
        clients.forEach { (_, client) ->
            GlobalScope.launch {
                client.session.send(Frame.Text(message))
            }
        }
    }

    fun sendTo(id: String, message: String): Boolean {
        val client = clients[id] ?: return false
        GlobalScope.launch {
            client.session.send(Frame.Text(message))
        }
        return true
    }

    fun disconnect(id: String): Boolean {
        val client = clients[id] ?: return false
        GlobalScope.launch {
            client.session.close(CloseReason(CloseReason.Codes.NORMAL, "Closed by admin"))
        }
        unregister(id)
        return true
    }

    fun getMessages(connectionId: String? = null): List<Map<String, Any?>> {
        val where = if (connectionId != null) "WHERE connection_id = '$connectionId'" else ""
        return db.connection().use { conn ->
            conn.createStatement().executeQuery(
                "SELECT * FROM _ws_messages $where ORDER BY created_at DESC LIMIT 100"
            ).toList().map { row ->
                mapOf(
                    "id" to row["id"], "connection_id" to row["connection_id"],
                    "direction" to row["direction"], "content" to row["content"],
                    "created_at" to row["created_at"],
                )
            }
        }
    }
}
