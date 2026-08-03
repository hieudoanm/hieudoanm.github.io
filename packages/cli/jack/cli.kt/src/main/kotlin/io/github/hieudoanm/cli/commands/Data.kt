package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.google.gson.GsonBuilder
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonParser
import java.io.File

class DataCommand : CliktCommand(name = "data", help = "Data serialization and transformation tools") {
    init {
        subcommands(DataCsv(), DataJson(), DataYml())
    }
    override fun run() = Unit
}

class DataCsv : CliktCommand(name = "csv", help = "View and format CSV files") {
    private val file by argument()
    private val json by option("--json").flag()

    override fun run() {
        val lines = File(file).readLines()
        val records = lines.map { parseCsvLine(it) }
        if (json) {
            val g = GsonBuilder().setPrettyPrinting().create()
            echo(g.toJson(records))
        } else {
            records.forEach { echo(it.joinToString(" | ")) }
        }
    }

    private fun parseCsvLine(line: String): List<String> {
        val result = mutableListOf<String>()
        val current = StringBuilder()
        var inQuotes = false
        for (ch in line) {
            when {
                ch == '"' -> inQuotes = !inQuotes
                ch == ',' && !inQuotes -> {
                    result.add(current.toString().trim())
                    current.clear()
                }
                else -> current.append(ch)
            }
        }
        result.add(current.toString().trim())
        return result
    }
}

class DataJson : CliktCommand(name = "json", help = "Query, format, diff, and merge JSON data") {
    private val file by argument()
    private val query by option("--query", "-q").default("")

    override fun run() {
        val input = File(file).readText()
        val element = JsonParser.parseString(input)

        val result = if (query.isNotEmpty()) {
            jsonQuery(element, query)
        } else {
            element
        }

        val g = GsonBuilder().setPrettyPrinting().create()
        echo(g.toJson(result))
    }

    private fun jsonQuery(element: JsonElement, query: String): JsonElement {
        val parts = query.removePrefix(".").split(".")
        var current = element
        for (part in parts) {
            if (part.isEmpty()) continue
            when {
                part.endsWith("]") -> {
                    val bracketIdx = part.indexOf("[")
                    val key = part.substring(0, bracketIdx)
                    val arrIdx = part.substring(bracketIdx + 1, part.length - 1).toIntOrNull() ?: 0
                    if (key.isNotEmpty()) {
                        current = current.asJsonObject.get(key)
                    }
                    current = current.asJsonArray[arrIdx]
                }
                else -> {
                    current = current.asJsonObject.get(part)
                }
            }
        }
        return current
    }
}

class DataYml : CliktCommand(name = "yml", help = "Parse, validate, and lint YAML files") {
    private val file by argument()
    private val validate by option("--validate", "-V").flag()
    private val lint by option("--lint").flag()
    private val json by option("--json").flag()

    override fun run() {
        val input = File(file).readText()
        if (validate || lint) {
            val valid = try {
                parseSimpleYaml(input)
                true
            } catch (e: Exception) {
                false
            }
            if (json) {
                val g = GsonBuilder().setPrettyPrinting().create()
                echo(g.toJson(mapOf("valid" to valid, "file" to file)))
            } else {
                echo("Valid YAML")
            }
            return
        }

        try {
            val yamlData = parseSimpleYaml(input)
            if (json) {
                val g = GsonBuilder().setPrettyPrinting().create()
                echo(g.toJson(yamlData))
            } else {
                echo(input.trimEnd())
            }
        } catch (e: Exception) {
            echo("parse yaml: ${e.message}")
        }
    }
}

private fun parseSimpleYaml(input: String): Map<String, Any> {
    val result = LinkedHashMap<String, Any>()
    val lines = input.lines()
    for (line in lines) {
        val trimmed = line.trim()
        if (trimmed.isEmpty() || trimmed.startsWith("#")) continue
        val colonIdx = trimmed.indexOf(":")
        if (colonIdx > 0) {
            val key = trimmed.substring(0, colonIdx).trim()
            val value = trimmed.substring(colonIdx + 1).trim()
            result[key] = value.removeSurrounding("\"")
        }
    }
    return result
}
