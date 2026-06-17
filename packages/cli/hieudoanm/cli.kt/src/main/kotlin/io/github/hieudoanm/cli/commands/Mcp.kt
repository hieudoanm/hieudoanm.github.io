package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import io.github.hieudoanm.cli.services.HistoryEntry
import io.github.hieudoanm.cli.services.HistoryService
import io.github.hieudoanm.cli.services.McpServer
import io.github.hieudoanm.cli.services.PropertySchema
import io.github.hieudoanm.cli.services.Schema
import io.github.hieudoanm.cli.services.newToolResultError
import io.github.hieudoanm.cli.services.newToolResultText
import java.time.Duration
import java.time.Instant

class McpCommand : CliktCommand(name = "mcp", help = "MCP server exposing CLI tools to AI agents") {
    init {
        subcommands(McpServe())
    }
    override fun run() = Unit
}

class McpServe : CliktCommand(name = "serve", help = "Start the MCP server over stdio") {
    override fun run() {
        val server = McpServer()
        registerTools(server)
        System.err.println("[mcp] tools registered")
        server.run()
    }
}

data class MModule(
    val name: String,
    val description: String
)

private val modules = listOf(
    MModule("calc", "Calculation and conversion tools"),
    MModule("casino", "Casino and gambling games"),
    MModule("chess", "Chess analysis and tools"),
    MModule("colors", "Color conversion and manipulation"),
    MModule("convert", "Text and data conversion"),
    MModule("crypto", "Cryptographic operations"),
    MModule("data", "Data processing utilities"),
    MModule("docsify", "Codebase analysis and documentation"),
    MModule("doi", "DOI resolution and citation"),
    MModule("english", "English dictionary tools"),
    MModule("file", "File introspection and manipulation"),
    MModule("gemini", "Google Gemini AI chat"),
    MModule("gh", "GitHub utilities"),
    MModule("image", "Image processing tools"),
    MModule("net", "Network utilities"),
    MModule("openapi", "OpenAPI specification tools"),
    MModule("openrouter", "OpenRouter AI chat"),
    MModule("port", "Port scanning and utilities"),
    MModule("search", "Universal search tools"),
    MModule("semver", "Semantic versioning tools"),
    MModule("system", "System monitoring and utilities"),
    MModule("telegram", "Telegram messaging"),
    MModule("time", "Time and scheduling tools"),
    MModule("version", "Version information"),
    MModule("web", "Web scraping and utilities"),
)

fun registerTools(server: McpServer) {
    System.err.println("[mcp] discovering tools...")
    for (mod in modules) {
        val schema = Schema(
            type = "object",
            properties = mapOf(
                "_args" to PropertySchema(
                    type = "array",
                    description = "Command and arguments (e.g., [\"bmi\", \"--height\", \"175\"])",
                    items = PropertySchema(type = "string")
                )
            )
        )

        val modName = mod.name
        server.addTool(modName, mod.description, schema) { jsonArgs ->
            executeTool(modName, jsonArgs)
        }
        System.err.println("[mcp]   $modName")
    }
}

fun executeTool(toolName: String, jsonArgs: JsonElement?): JsonObject {
    val start = Instant.now()
    val cliArgs = jsonToCliArgs(toolName, jsonArgs)

    val javaBin = System.getProperty("java.home") + "/bin/java"
    val classPath = System.getProperty("java.class.path")
    val mainClass = "io.github.hieudoanm.cli.MainKt"

    val pbArgs = mutableListOf(javaBin, "-cp", classPath, mainClass)
    pbArgs.addAll(cliArgs.drop(1))

    return try {
        val pb = ProcessBuilder(pbArgs)
        pb.redirectErrorStream(false)
        val process = pb.start()
        val stdout = process.inputStream.bufferedReader().readText()
        val stderr = process.errorStream.bufferedReader().readText()
        val exitCode = process.waitFor()

        val elapsed = Duration.between(start, Instant.now()).toMillis()
        HistoryService.append(HistoryEntry(
            timestamp = start.toString(),
            source = "mcp",
            command = toolName.replace('.', ' '),
            cwd = System.getProperty("user.dir"),
            durationMs = elapsed,
            error = if (exitCode != 0) stderr.takeIf { it.isNotEmpty() } else null
        ))

        if (exitCode == 0) {
            newToolResultText(stdout.trim())
        } else {
            val text = if (stdout.isNotBlank()) stdout else stderr
            newToolResultError(text.trim())
        }
    } catch (e: Exception) {
        newToolResultError("exec error: ${e.message}")
    }
}

fun jsonToCliArgs(toolName: String, jsonArgs: JsonElement?): List<String> {
    val args = mutableListOf("hieudoanm")
    for (part in toolName.split(".")) {
        args.add(part)
    }

    if (jsonArgs != null && jsonArgs.isJsonObject) {
        val obj = jsonArgs.asJsonObject
        for ((key, value) in obj.entrySet()) {
            if (key == "_args") {
                if (value.isJsonArray) {
                    for (item in value.asJsonArray) {
                        args.add(item.asString)
                    }
                }
            } else {
                when {
                    value.isJsonPrimitive && value.asJsonPrimitive.isBoolean -> {
                        if (value.asBoolean) args.add("--$key")
                    }
                    value.isJsonPrimitive && value.asJsonPrimitive.isNumber -> {
                        args.add("--$key")
                        args.add(value.asNumber.toString())
                    }
                    value.isJsonPrimitive && value.asJsonPrimitive.isString -> {
                        args.add("--$key")
                        args.add(value.asString)
                    }
                    value.isJsonArray -> {
                        for (item in value.asJsonArray) {
                            args.add("--$key")
                            args.add(item.asString)
                        }
                    }
                    else -> {}
                }
            }
        }
    }

    return args
}
