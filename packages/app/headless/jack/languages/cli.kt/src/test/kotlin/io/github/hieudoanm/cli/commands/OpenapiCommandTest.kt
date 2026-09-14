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
    fun testOpenapiValidateMissingOpenapi() {
        val f = File("/tmp/test-openapi-missing-openapi.json")
        f.writeText("""{ "info": { "title": "x", "version": "1" }, "paths": { "/x": { "get": { "responses": { "200": { "description": "OK" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-missing-openapi.json")
        }
    }

    @Test
    fun testOpenapiValidateInvalidVersion() {
        val f = File("/tmp/test-openapi-bad-version.json")
        f.writeText("""{ "openapi": "3", "info": { "title": "x", "version": "1" }, "paths": { "/x": { "get": { "responses": { "200": { "description": "OK" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-bad-version.json")
        }
    }

    @Test
    fun testOpenapiValidateMissingInfo() {
        val f = File("/tmp/test-openapi-no-info.json")
        f.writeText("""{ "openapi": "3.0.0", "paths": {} }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-no-info.json")
        }
    }

    @Test
    fun testOpenapiValidateInfoMissingTitle() {
        val f = File("/tmp/test-openapi-no-title.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "version": "1" }, "paths": { "/x": { "get": { "responses": { "200": { "description": "OK" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-no-title.json")
        }
    }

    @Test
    fun testOpenapiValidateMissingPaths() {
        val f = File("/tmp/test-openapi-no-paths.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-no-paths.json")
        }
    }

    @Test
    fun testOpenapiValidateInvalidMethod() {
        val f = File("/tmp/test-openapi-bad-method.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" }, "paths": { "/x": { "invalid": { "responses": { "200": { "description": "OK" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-bad-method.json")
        }
    }

    @Test
    fun testOpenapiValidatePathNotStartingWithSlash() {
        val f = File("/tmp/test-openapi-bad-path.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" }, "paths": { "users": { "get": { "responses": { "200": { "description": "OK" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-bad-path.json")
        }
    }

    @Test
    fun testOpenapiValidateOperationNotObject() {
        val f = File("/tmp/test-openapi-op-not-obj.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" }, "paths": { "/x": { "get": "string" } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-op-not-obj.json")
        }
    }

    @Test
    fun testOpenapiValidateMissingResponses() {
        val f = File("/tmp/test-openapi-no-resp.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" }, "paths": { "/x": { "put": { "operationId": "doX" } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-no-resp.json")
        }
    }

    @Test
    fun testOpenapiValidateDuplicateOpId() {
        val f = File("/tmp/test-openapi-dup-opid.json")
        f.writeText("""{ "openapi": "3.0.0", "info": { "title": "x", "version": "1" }, "paths": { "/x": { "get": { "operationId": "doX", "responses": { "200": { "description": "OK" } } } }, "/y": { "post": { "operationId": "doX", "responses": { "201": { "description": "Created" } } } } } }""")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-dup-opid.json")
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

    @Test
    fun testOpenapiPostmanWithServers() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Server Test", "version": "1.0.0" },
  "servers": [{ "url": "https://api.example.com" }],
  "paths": { "/items": { "get": { "summary": "List items", "responses": { "200": { "description": "OK" } } } } }
}"""
        val f = File("/tmp/test-openapi-servers.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-servers.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "api.example.com")
        assertContains(result.stdout, "List items")
    }

    @Test
    fun testOpenapiPostmanWithQueryParams() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Params Test", "version": "1.0.0" },
  "paths": { "/search": { "get": { "parameters": [
    { "name": "q", "in": "query", "description": "query string", "example": "hello" },
    { "name": "id", "in": "path", "description": "item id" },
    { "name": "Authorization", "in": "header", "description": "auth token" }
  ], "responses": { "200": { "description": "OK" } } } } }
}"""
        val f = File("/tmp/test-openapi-params.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-params.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "q")
        assertContains(result.stdout, "hello")
    }

    @Test
    fun testOpenapiPostmanWithRequestBody() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Body Test", "version": "1.0.0" },
  "paths": { "/items": { "post": { "requestBody": {
    "content": { "application/json": {
      "schema": { "type": "object", "properties": { "name": { "type": "string" }, "count": { "type": "integer" } } }
    } }
  }, "responses": { "201": { "description": "Created" } } } } }
}"""
        val f = File("/tmp/test-openapi-body.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-body.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "raw")
        assertContains(result.stdout, "Content-Type")
    }

    @Test
    fun testOpenapiPostmanWithExample() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Ex Test", "version": "1.0.0" },
  "paths": { "/items": { "post": { "requestBody": {
    "content": { "application/json": {
      "schema": { "type": "object", "properties": { "name": { "type": "string" } } },
      "example": { "name": "example-name" }
    } }
  }, "responses": { "201": { "description": "Created" } } } } }
}"""
        val f = File("/tmp/test-openapi-ex.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-ex.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "example-name")
    }

    @Test
    fun testOpenapiPostmanWithExamples() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Exs Test", "version": "1.0.0" },
  "paths": { "/items": { "post": { "requestBody": {
    "content": { "application/json": {
      "schema": { "type": "object", "properties": { "val": { "type": "string" } } },
      "examples": { "ex1": { "value": { "val": "from-examples" } } }
    } }
  }, "responses": { "201": { "description": "Created" } } } } }
}"""
        val f = File("/tmp/test-openapi-exs.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-exs.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "from-examples")
    }

    @Test
    fun testOpenapiPostmanArraySchema() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Arr Test", "version": "1.0.0" },
  "paths": { "/items": { "get": { "responses": { "200": { "description": "OK" } } } } }
}"""
        val f = File("/tmp/test-openapi-arr.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-arr.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "GET")
    }

    @Test
    fun testOpenapiYamlFallback() {
        val f = File("/tmp/test-openapi-yaml.yaml")
        f.writeText("openapi: 3.0.0\ninfo:\n  title: Test\n  version: 1.0.0")
        val cmd = OpenapiCommand()
        assertFailsWith<IllegalStateException> {
            cmd.test("validate --file /tmp/test-openapi-yaml.yaml")
        }
    }

    @Test
    fun testOpenapiPostmanXFields() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "X Test", "version": "1.0.0" },
  "paths": { "/items": { "get": { "responses": { "200": { "description": "OK" } } }, "x-internal": { "foo": "bar" } } }
}"""
        val f = File("/tmp/test-openapi-x.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-x.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "GET")
    }

    @Test
    fun testOpenapiPostmanEnumSchema() {
        val spec = """{
  "openapi": "3.0.0",
  "info": { "title": "Enum Test", "version": "1.0.0" },
  "paths": { "/items": { "post": { "requestBody": {
    "content": { "application/json": {
      "schema": { "type": "string", "enum": ["a", "b", "c"] }
    } }
  }, "responses": { "201": { "description": "Created" } } } } }
}"""
        val f = File("/tmp/test-openapi-enum.json")
        f.writeText(spec)
        val cmd = OpenapiCommand()
        val result = cmd.test("openapi2postman --input /tmp/test-openapi-enum.json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "a")
    }
}
