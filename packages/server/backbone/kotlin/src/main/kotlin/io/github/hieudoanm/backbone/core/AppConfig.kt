package io.github.hieudoanm.backbone.core

data class AppConfig(
    val port: Int = System.getenv("PORT")?.toIntOrNull() ?: 8080,
    val jwtSecret: String = System.getenv("JWT_SECRET") ?: "dev-secret-change-in-production",
    val backboneData: String = System.getenv("BACKBONE_DATA") ?: "${System.getProperty("user.home")}/.backbone",
    val secretsKeyHex: String? = System.getenv("BACKBONE_SECRETS_KEY"),
)
