package io.github.hieudoanm.backbone.openapi

val openApiSpec = mapOf(
    "openapi" to "3.0.3",
    "info" to mapOf(
        "title" to "BackboneServer API",
        "version" to "0.0.1",
        "description" to "Back-end as a Service (BaaS) API",
    ),
    "servers" to listOf(mapOf("url" to "/", "description" to "Local server")),
    "paths" to mapOf(
        "/api/health" to mapOf("get" to mapOf("summary" to "Health check", "responses" to mapOf("200" to mapOf("description" to "OK")))),
        "/api/auth/register" to mapOf("post" to mapOf("summary" to "Register user", "responses" to mapOf("201" to mapOf("description" to "Created"), "409" to mapOf("description" to "Duplicate email")))),
        "/api/auth/login" to mapOf("post" to mapOf("summary" to "Login", "responses" to mapOf("200" to mapOf("description" to "OK"), "401" to mapOf("description" to "Invalid credentials")))),
        "/api/collections" to mapOf("get" to mapOf("summary" to "List collections"), "post" to mapOf("summary" to "Create collection")),
        "/api/buckets" to mapOf("get" to mapOf("summary" to "List buckets"), "post" to mapOf("summary" to "Create bucket")),
    ),
)
