package io.github.hieudoanm.backbone.core

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

sealed class AppError(val status: HttpStatusCode, message: String) : RuntimeException(message) {
    class BadRequest(msg: String) : AppError(HttpStatusCode.BadRequest, msg)
    class Unauthorized(msg: String = "Unauthorized") : AppError(HttpStatusCode.Unauthorized, msg)
    class Forbidden(msg: String = "Forbidden") : AppError(HttpStatusCode.Forbidden, msg)
    class NotFound(msg: String = "Not found") : AppError(HttpStatusCode.NotFound, msg)
    class Conflict(msg: String) : AppError(HttpStatusCode.Conflict, msg)
    class TooManyRequests : AppError(HttpStatusCode.TooManyRequests, "Rate limit exceeded")
    class Internal(msg: String = "Internal error") : AppError(HttpStatusCode.InternalServerError, msg)
}

fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<AppError> { call, cause ->
            call.respond(cause.status, mapOf("error" to cause.message))
        }
        exception<Throwable> { call, cause ->
            call.application.log.error("Unhandled exception", cause)
            call.respond(HttpStatusCode.InternalServerError, mapOf("error" to "Internal error"))
        }
    }
}
