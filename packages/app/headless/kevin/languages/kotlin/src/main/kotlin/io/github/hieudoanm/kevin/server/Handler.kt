package io.github.hieudoanm.kevin.server

import io.github.hieudoanm.kevin.db.Db
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds

/** A protocol response; [shouldReply] is false for lines that produce no output. */
internal data class Reply(val response: String, val shouldReply: Boolean)

private const val EX_MARKER = " EX "
private const val OK = "OK\n"
private const val INVALID_EXPIRE = "ERR invalid expire time\n"

private fun usage(text: String) = Reply("ERR usage: $text\n", true)

/** Parses one protocol line and returns the response. */
internal fun handleLine(line: String, kv: Db): Reply {
    val trimmed = line.trimEnd('\r', '\n')
    if (trimmed.isBlank()) return Reply("", false)
    val (command, rest) = splitToken(trimmed)
    return when (command.uppercase()) {
        "PING" -> Reply("PONG\n", true)
        "SET" -> handleSet(rest, kv)
        "GET" -> handleGet(rest, kv)
        "DEL" -> handleDel(rest, kv)
        "KEYS" -> Reply(kv.keys().joinToString(" ") + "\n", true)
        "EXISTS" -> handleExists(rest, kv)
        "LEN" -> handleLen(rest, kv)
        "FLUSHALL", "FLUSHDB" -> handleFlush(rest, kv)
        "EXPIRE" -> handleExpire(rest, kv)
        "TTL" -> handleTtl(rest, kv)
        else -> Reply("ERR unknown command\n", true)
    }
}

private fun handleSet(rest: String, kv: Db): Reply {
    val (key, after) = splitToken(rest)
    val value = after.trimStart(' ')
    if (key.isEmpty() || value.isEmpty()) return usage("SET key value [EX seconds]")
    val index = value.uppercase().lastIndexOf(EX_MARKER)
    if (index < 0) {
        kv.set(key, value)
        return Reply(OK, true)
    }
    val seconds = value.substring(index + EX_MARKER.length).trim().toIntOrNull()
    if (seconds == null || seconds <= 0) return Reply(INVALID_EXPIRE, true)
    kv.setWithTtl(key, value.substring(0, index), seconds.seconds)
    return Reply(OK, true)
}

private fun handleGet(rest: String, kv: Db): Reply {
    val (key, after) = splitToken(rest)
    if (key.isEmpty() || after.isNotBlank()) return usage("GET key")
    return Reply((kv.get(key) ?: "(nil)") + "\n", true)
}

private fun handleDel(rest: String, kv: Db): Reply {
    val keys = splitAll(rest)
    if (keys.isEmpty()) return usage("DEL key [key ...]")
    return Reply(kv.delMultiple(keys).toString() + "\n", true)
}

private fun handleExists(rest: String, kv: Db): Reply {
    val (key, after) = splitToken(rest)
    if (key.isEmpty() || after.isNotBlank()) return usage("EXISTS key")
    return Reply(if (kv.exists(key)) "1\n" else "0\n", true)
}

private fun handleLen(rest: String, kv: Db): Reply {
    if (rest.isNotBlank()) return usage("LEN")
    return Reply(kv.len().toString() + "\n", true)
}

private fun handleFlush(rest: String, kv: Db): Reply {
    if (rest.isNotBlank()) return usage("FLUSHALL")
    kv.flush()
    return Reply(OK, true)
}

private fun handleExpire(rest: String, kv: Db): Reply {
    val (key, seconds, ok) = splitTwo(rest)
    if (!ok) return usage("EXPIRE key seconds")
    val ttl = seconds.toIntOrNull()
    if (ttl == null || ttl <= 0) return Reply(INVALID_EXPIRE, true)
    return Reply(if (kv.expire(key, ttl.seconds)) "1\n" else "0\n", true)
}

private fun handleTtl(rest: String, kv: Db): Reply {
    val (key, after) = splitToken(rest)
    if (key.isEmpty() || after.isNotBlank()) return usage("TTL key")
    val ttl = kv.ttl(key)
    if (!ttl.hasExpiry) return Reply(ttl.remaining.inWholeSeconds.toString() + "\n", true)
    val seconds = (ttl.remaining + 999.milliseconds).inWholeSeconds
    return Reply(seconds.toString() + "\n", true)
}
