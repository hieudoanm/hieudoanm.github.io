package io.github.hieudoanm.backbone.ws

import kotlinx.coroutines.channels.ProducerScope
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

class SSEHub<T> {
    private data class Client<T>(
        val id: String = UUID.randomUUID().toString().replace("-", ""),
        val flow: ProducerScope<T>,
        val createdAt: Long = System.currentTimeMillis(),
    )

    private val clients = ConcurrentHashMap<String, Client<T>>()

    fun subscribe(scope: ProducerScope<T>) {
        val client = Client(flow = scope)
        clients[client.id] = client
        scope.invokeOnClose {
            clients.remove(client.id)
        }
    }

    fun broadcast(event: T) {
        clients.values.forEach { client ->
            client.flow.trySend(event)
        }
    }

    fun cleanup(timeoutMs: Long = 3_600_000) {
        val now = System.currentTimeMillis()
        clients.entries.removeIf { (_, c) -> (now - c.createdAt) > timeoutMs }
    }

    val clientCount: Int get() = clients.size
}
