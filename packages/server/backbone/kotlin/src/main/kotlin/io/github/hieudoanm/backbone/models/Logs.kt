package io.github.hieudoanm.backbone.models

import kotlinx.serialization.Serializable

@Serializable
data class LogRequest(
    val level: String = "info",
    val message: String,
    val meta: String = "{}",
)

val validLogLevels = setOf("debug", "info", "warn", "error")
