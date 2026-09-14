package io.github.hieudoanm.backbone.models

import kotlinx.serialization.Serializable

@Serializable
data class NotificationRequest(
    val title: String,
    val body: String = "",
    val type: String = "info",
)

val validNotificationTypes = setOf("info", "success", "warning", "error")
