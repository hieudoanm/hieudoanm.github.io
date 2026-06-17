package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import java.io.File

class OpenapiCommandTest {
    private val validSpec = """{
  "openapi": "3.0.0",
  "info": { "title": "Test API", "version": "1.0.0" },
  "paths": { "/users": { "get": { "responses": { "200": { "description": "OK" } } } } }
}"""

    private val invalidSpec = """{
  "info": { "title": "Test API" },
  "paths": {}
}"""

    @Test
    fun testOpenapiValidate() {
        val f = File("/tmp/test-openapi-valid.json")
        f.writeText(validSpec)
        val cmd = OpenapiCommand()
        val result = cmd.test("validate --file /tmp/test-openapi-valid.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "valid")
    }

    @Test
    fun testOpenapiValidateInvalid() {
        val f = File("/tmp/test-openapi-invalid.json")
        f.writeText(invalidSpec)
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-invalid.json")
        }
    }

    @Test
    fun testOpenapiPostman() {
        val f = File("/tmp/test-openapi-postman.json")
        f.writeText(validSpec)
        val cmd = OpenapiCommand()
        val out = "/tmp/test-postman-collection.json"
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-postman.json --output $out")
        assertEquals(0, result.statusCode)
        val content = File(out).readText()
        assertContains(content, "Test API")
        assertContains(content, "GET")
        assertContains(content, "/users")
    }
}
