package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParser
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
    init { subcommands(McpServe()) }
    override fun run() = Unit
}

class McpServe : CliktCommand(name = "serve", help = "Start the MCP server over stdio") {
    override fun run() {
        val server = McpServer()
        val root = currentContext.findRoot().command
        registerTools(server, root)
        System.err.println("[mcp] tools registered")
        server.run()
    }
}

fun registerTools(server: McpServer, root: CliktCommand) {
    System.err.println("[mcp] discovering tools...")
    val seen = mutableSetOf<CliktCommand>()
    for (sub in root.registeredSubcommands()) {
        val name = sub.commandName
        if (name in setOf("mcp", "completion", "help")) continue
        walkAndRegister(server, sub, name, seen)
    }
}

private fun walkAndRegister(server: McpServer, cmd: CliktCommand, name: String, seen: MutableSet<CliktCommand>) {
    val children = cmd.registeredSubcommands()
    if (children.isEmpty()) {
        if (cmd in seen) return
        seen.add(cmd)
        val schema = buildSchema(cmd)
        @Suppress("DEPRECATION") val desc = cmd.commandHelp.ifEmpty { cmd.commandName }
        server.addTool(name, desc, schema) { jsonArgs -> executeTool(name, jsonArgs) }
        System.err.println("[mcp]   $name")
    } else {
        for (child in children) {
            val childName = child.commandName
            if (childName == "help") continue
            walkAndRegister(server, child, "$name.$childName", seen)
        }
    }
}

private fun buildSchema(cmd: CliktCommand): Schema {
    val props = mutableMapOf<String, PropertySchema>()
    for (opt in cmd.registeredOptions()) {
        if (opt.names.any { it == "--help" || it == "-h" }) continue
        val optName = opt.names.first().trimStart('-')
        val isFlag = opt.nvalues.contains(0)
        props[optName] = PropertySchema(
            type = if (isFlag) "boolean" else "string",
            description = opt.helpTags["help"] ?: optName
        )
    }
    if (cmd.registeredArguments().isNotEmpty() || props.isEmpty()) {
        props["_args"] = PropertySchema(
            type = "array",
            description = "Positional command-line arguments",
            items = PropertySchema(type = "string")
        )
    }
    return Schema(type = "object", properties = props)
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
        HistoryService.append(HistoryEntry(timestamp = start.toString(), source = "mcp", command = toolName, cwd = System.getProperty("user.dir"), durationMs = elapsed, error = if (exitCode != 0) stderr.takeIf { it.isNotEmpty() } else null))
        if (exitCode == 0) newToolResultText(stdout.trim()) else newToolResultError((if (stdout.isNotBlank()) stdout else stderr).trim())
    } catch (e: Exception) {
        newToolResultError("exec error: ${e.message}")
    }
}

fun jsonToCliArgs(toolName: String, jsonArgs: JsonElement?): List<String> {
    val args = mutableListOf("hieudoanm")
    for (part in toolName.split(".")) args.add(part)
    if (jsonArgs != null && jsonArgs.isJsonObject) {
        val obj = jsonArgs.asJsonObject
        for ((key, value) in obj.entrySet()) {
            if (key == "_args") {
                if (value.isJsonArray) for (item in value.asJsonArray) args.add(item.asString)
            } else {
                when {
                    value.isJsonPrimitive && value.asJsonPrimitive.isBoolean -> { if (value.asBoolean) args.add("--$key") }
                    value.isJsonPrimitive && value.asJsonPrimitive.isNumber -> { args.add("--$key"); args.add(value.asNumber.toString()) }
                    value.isJsonPrimitive && value.asJsonPrimitive.isString -> { args.add("--$key"); args.add(value.asString) }
                    value.isJsonArray -> for (item in value.asJsonArray) { args.add("--$key"); args.add(item.asString) }
                    else -> {}
                }
            }
        }
    }
    return args
}
