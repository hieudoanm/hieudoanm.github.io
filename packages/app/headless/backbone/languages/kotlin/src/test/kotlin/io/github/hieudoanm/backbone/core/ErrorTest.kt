package io.github.hieudoanm.backbone.core

import io.ktor.http.HttpStatusCode
import kotlin.test.Test
import kotlin.test.assertEquals

class ErrorTest {
    @Test
    fun `BadRequest has correct status`() {
        assertEquals(HttpStatusCode.BadRequest, AppError.BadRequest("msg").status)
    }

    @Test
    fun `Unauthorized has correct status`() {
        assertEquals(HttpStatusCode.Unauthorized, AppError.Unauthorized("msg").status)
    }

    @Test
    fun `Forbidden has correct status`() {
        assertEquals(HttpStatusCode.Forbidden, AppError.Forbidden("msg").status)
    }

    @Test
    fun `NotFound has correct status`() {
        assertEquals(HttpStatusCode.NotFound, AppError.NotFound("msg").status)
    }

    @Test
    fun `Conflict has correct status`() {
        assertEquals(HttpStatusCode.Conflict, AppError.Conflict("msg").status)
    }

    @Test
    fun `TooManyRequests has correct status`() {
        assertEquals(HttpStatusCode.TooManyRequests, AppError.TooManyRequests().status)
    }

    @Test
    fun `Internal has correct status`() {
        assertEquals(HttpStatusCode.InternalServerError, AppError.Internal("msg").status)
    }
}
