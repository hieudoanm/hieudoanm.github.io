package io.github.hieudoanm.backbone.ws

import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.channels.ProducerScope
import kotlinx.coroutines.runBlocking
import kotlin.test.Test
import kotlin.test.assertEquals

class SSEHubTest {
    @Test
    fun `subscribe and broadcast`() = runBlocking {
        val hub = SSEHub<String>()
        val channel = Channel<String>(Channel.UNLIMITED)
        hub.subscribe(object : ProducerScope<String> {
            override val channel: Channel<String> get() = channel
            override suspend fun send(element: String) { channel.send(element) }
            override fun trySend(element: String) = channel.trySend(element)
            override val isClosedForSend: Boolean get() = channel.isClosedForSend
            override val onSend: kotlinx.coroutines.selects.SelectClause2<String, kotlinx.coroutines.channels.SendChannel<String>> get() = channel.onSend
            override fun invokeOnClose(handler: (Throwable?) -> Unit) { channel.invokeOnClose(handler) }
            override fun close(cause: Throwable?): Boolean = channel.close(cause)
            override val coroutineContext: kotlin.coroutines.CoroutineContext = kotlinx.coroutines.Dispatchers.Default
        })
        assertEquals(1, hub.clientCount)

        hub.broadcast("event-1")
        assertEquals("event-1", channel.receive())

        hub.broadcast("event-2")
        assertEquals("event-2", channel.receive())
    }

    @Test
    fun `multiple subscribers all receive broadcasts`() = runBlocking {
        val hub = SSEHub<String>()
        val ch1 = Channel<String>(Channel.UNLIMITED)
        val ch2 = Channel<String>(Channel.UNLIMITED)
        hub.subscribe(TestProducerScope(ch1))
        hub.subscribe(TestProducerScope(ch2))
        assertEquals(2, hub.clientCount)

        hub.broadcast("hello")
        assertEquals("hello", ch1.receive())
        assertEquals("hello", ch2.receive())
    }

    @Test
    fun `cleanup removes old clients`() {
        val hub = SSEHub<String>()
        val channel = Channel<String>(Channel.UNLIMITED)
        hub.subscribe(TestProducerScope(channel))
        assertEquals(1, hub.clientCount)

        hub.cleanup(-1)
        assertEquals(0, hub.clientCount)
    }
}

private class TestProducerScope(
    override val channel: Channel<String>,
) : ProducerScope<String> {
    override suspend fun send(element: String) { channel.send(element) }
    override fun trySend(element: String) = channel.trySend(element)
    override val isClosedForSend: Boolean get() = channel.isClosedForSend
    override val onSend: kotlinx.coroutines.selects.SelectClause2<String, kotlinx.coroutines.channels.SendChannel<String>> get() = channel.onSend
    override fun invokeOnClose(handler: (Throwable?) -> Unit) { channel.invokeOnClose(handler) }
    override fun close(cause: Throwable?): Boolean = channel.close(cause)
    override val coroutineContext: kotlin.coroutines.CoroutineContext = kotlinx.coroutines.Dispatchers.Default
}
