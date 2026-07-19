package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import java.io.File
import java.util.regex.Pattern

class OpenapiCommand : CliktCommand(name = "openapi", help = "OpenAPI related tools") {
    init {
        subcommands(OpenapiPostman(), OpenapiValidate())
    }
    override fun run() = Unit
}

// ─── Postman Converter ───────────────────────────────────────────────────────

class OpenapiPostman : CliktCommand(name = "openapi2postman", help = "Convert OpenAPI to Postman collection") {
    private val input by option("--input", "-i")
    private val output by option("--output", "-o")
    override fun run() {
        val file = input ?: error("input file required (-i)")
        val data = File(file).readBytes()
        val spec = parseOpenApi(data)
        val postman = convertToPostman(spec)
        val out = GsonBuilder().setPrettyPrinting().create().toJson(postman)
        if (output != null) File(output).writeText(out) else echo(out)
    }
}

@Suppress("UNCHECKED_CAST")
private fun parseOpenApi(data: ByteArray): Map<String, Any?> {
    val text = data.decodeToString().trim()
    return try {
        GsonBuilder().create().fromJson(text, object : TypeToken<Map<String, Any?>>() {}.type) as Map<String, Any?>
    } catch (_: Exception) {
        // Simple YAML-like parsing fallback
        parseSimpleYaml(text)
    }
}

@Suppress("UNCHECKED_CAST")
private fun parseSimpleYaml(text: String): Map<String, Any?> {
    val result = mutableMapOf<String, Any?>()
    val lines = text.lines()
    for (line in lines) {
        val trimmed = line.trim()
        if (trimmed.contains(":")) {
            val parts = trimmed.split(":", limit = 2)
            result[parts[0].trim()] = parts[1].trim().trim('"')
        }
    }
    return result
}

@Suppress("UNCHECKED_CAST")
private fun convertToPostman(spec: Map<String, Any?>): Map<String, Any?> {
    val info = spec["info"] as? Map<String, Any?> ?: emptyMap()
    val infoName = (info["title"] as? String) ?: "Imported Collection"
    val infoDesc = (info["description"] as? String) ?: ""

    val servers = spec["servers"] as? List<Map<String, Any?>> ?: emptyList()
    val baseURL = (servers.firstOrNull()?.get("url") as? String) ?: ""

    val paths = spec["paths"] as? Map<String, Any?> ?: emptyMap()
    val tagMap = mutableMapOf<String, MutableList<Map<String, Any?>>>()

    for ((path, methodsRaw) in paths) {
        val methods = methodsRaw as? Map<String, Any?> ?: continue
        for ((method, opRaw) in methods) {
            if (method.startsWith("x-")) continue
            val op = opRaw as? Map<String, Any?> ?: continue

            val opTags = op["tags"] as? List<String>
            val tag = opTags?.firstOrNull() ?: "default"

            val name = (op["summary"] as? String) ?: "${method.uppercase()} $path"

            val parameters = op["parameters"] as? List<Map<String, Any?>> ?: emptyList()
            val query = mutableListOf<Map<String, Any?>>()
            val pathVars = mutableListOf<Map<String, Any?>>()
            val headers = mutableListOf<Map<String, Any?>>()

            for (p in parameters) {
                val paramIn = p["in"] as? String ?: continue
                val param = mutableMapOf<String, Any?>("key" to (p["name"] ?: ""), "value" to "", "description" to (p["description"] ?: ""))
                if (p["example"] != null) param["value"] = "${p["example"]}"
                when (paramIn) {
                    "query" -> query.add(param)
                    "path" -> pathVars.add(param)
                    "header" -> headers.add(param)
                }
            }

            var body: Map<String, Any?>? = null
            val requestBody = op["requestBody"] as? Map<String, Any?>
            val content = requestBody?.get("content") as? Map<String, Any?>
            val jsonContent = content?.get("application/json") as? Map<String, Any?>
            if (jsonContent != null) {
                var ex = jsonContent["example"]
                if (ex == null) {
                    val examples = jsonContent["examples"] as? Map<String, Any?>
                    if (examples != null) {
                        ex = (examples.values.firstOrNull() as? Map<String, Any?>)?.get("value")
                    }
                }
                if (ex == null) {
                    val schema = jsonContent["schema"] as? Map<String, Any?>
                    ex = schemaToExample(schema)
                }
                val raw = GsonBuilder().setPrettyPrinting().create().toJson(ex)
                body = mapOf("mode" to "raw", "raw" to raw, "options" to mapOf("raw" to mapOf("language" to "json")))
                headers.add(mapOf("key" to "Content-Type", "value" to "application/json"))
            }

            val rawURL = baseURL + path
            val req = mutableMapOf<String, Any?>(
                "method" to method.uppercase(),
                "header" to headers,
                "url" to mapOf(
                    "raw" to rawURL,
                    "path" to path.trim('/').split("/"),
                    "query" to query,
                    "variable" to pathVars
                ),
                "description" to (op["description"] ?: "")
            )
            if (body != null) req["body"] = body

            val item = mapOf<String, Any?>("name" to name, "request" to req, "response" to emptyList<Any>())
            tagMap.getOrPut(tag) { mutableListOf() }.add(item)
        }
    }

    val folders = tagMap.map { (tag, items) -> mapOf("name" to tag, "item" to items) }
    return mapOf(
        "info" to mapOf("name" to infoName, "_postman_id" to "auto-generated", "description" to infoDesc, "schema" to "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"),
        "item" to folders,
        "variable" to listOf(mapOf("key" to "baseUrl", "value" to baseURL, "type" to "string"))
    )
}

@Suppress("UNCHECKED_CAST")
private fun schemaToExample(schema: Map<String, Any?>?): Any? {
    if (schema == null) return null
    schema["example"]?.let { return it }
    schema["default"]?.let { return it }
    return when ((schema["type"] as? String) ?: "") {
        "string" -> {
            val enums = schema["enum"] as? List<Any?>
            enums?.firstOrNull() ?: "string"
        }
        "integer", "number" -> 0
        "boolean" -> true
        "array" -> {
            val items = schema["items"] as? Map<String, Any?>
            listOf(schemaToExample(items))
        }
        "object" -> {
            val props = schema["properties"] as? Map<String, Any?> ?: return null
            props.mapValues { (_, v) -> schemaToExample(v as? Map<String, Any?>) }
        }
        else -> null
    }
}

// ─── Validate ────────────────────────────────────────────────────────────────

private val validMethods = setOf("get", "put", "post", "delete", "options", "head", "patch", "trace")
private val semverPattern = Pattern.compile("^\\d+\\.\\d+\\.\\d+$")

class OpenapiValidate : CliktCommand(name = "validate", help = "Validate an OpenAPI specification") {
    private val file by option("--file", "-f")
    override fun run() {
        val f = file ?: error("--file required")
        val data = File(f).readBytes()
        val spec = parseOpenApi(data)
        val issues = validateSpec(spec)
        if (issues.isEmpty()) {
            echo("valid openapi spec")
            return
        }
        issues.forEach { echo(it) }
        error("${issues.size} validation issue(s) found")
    }
}

@Suppress("UNCHECKED_CAST")
private fun validateSpec(spec: Map<String, Any?>): List<String> {
    val issues = mutableListOf<String>()
    val ver = spec["openapi"] as? String
    if (ver.isNullOrEmpty()) {
        issues.add("missing required field: openapi")
    } else if (!semverPattern.matcher(ver).matches()) {
        issues.add("invalid openapi version: \"$ver\" (expected semver)")
    }
    val info = spec["info"] as? Map<String, Any?>
    if (info == null) {
        issues.add("missing required object: info")
    } else {
        if ((info["title"] as? String).isNullOrEmpty()) issues.add("info.title is required")
        if ((info["version"] as? String).isNullOrEmpty()) issues.add("info.version is required")
    }
    val paths = spec["paths"] as? Map<String, Any?>
    if (paths == null) {
        issues.add("missing required object: paths")
    } else {
        issues.addAll(validatePaths(paths))
    }
    return issues
}

@Suppress("UNCHECKED_CAST")
private fun validatePaths(paths: Map<String, Any?>): List<String> {
    val issues = mutableListOf<String>()
    val seenOpIds = mutableMapOf<String, String>()
    for ((path, methodsRaw) in paths) {
        if (path.startsWith("x-")) continue
        if (!path.startsWith("/")) issues.add("path \"$path\" should start with /")
        val methods = methodsRaw as? Map<String, Any?> ?: continue
        for ((method, opRaw) in methods) {
            if (method.startsWith("x-")) continue
            if (method.lowercase() !in validMethods) {
                issues.add("path \"$path\": invalid method \"$method\"")
                continue
            }
            val op = opRaw as? Map<String, Any?>
            if (op == null) {
                issues.add("${method.uppercase()} $path: operation must be an object")
                continue
            }
            val responses = op["responses"] as? Map<*, *>
            if (responses.isNullOrEmpty()) {
                issues.add("${method.uppercase()} $path: missing responses")
            }
            val opId = op["operationId"] as? String
            if (!opId.isNullOrEmpty()) {
                val existing = seenOpIds[opId]
                if (existing != null) {
                    issues.add("duplicate operationId \"$opId\" ($existing and ${method.uppercase()} $path)")
                } else {
                    seenOpIds[opId] = "${method.uppercase()} $path"
                }
            }
        }
    }
    return issues
}
