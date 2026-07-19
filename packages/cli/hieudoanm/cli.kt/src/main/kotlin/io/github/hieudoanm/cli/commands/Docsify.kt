package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.google.gson.GsonBuilder
import java.io.File

class DocsifyCommand : CliktCommand(name = "docsify", help = "Codebase documentation and analysis tools") {
    init {
        subcommands(DocsifyTree(), DocsifyScan(), DocsifyObsidian(), DocsifyCobra())
    }
    override fun run() = Unit
}

class DocsifyTree : CliktCommand(name = "tree", help = "Generate directory tree as Markdown") {
    private val dir by option("--dir").default(".")
    private val out by option("--out").default("TREE.md")

    override fun run() {
        val root = File(dir).absoluteFile
        val outputFile = File(out)
        outputFile.parentFile?.mkdirs()
        outputFile.bufferedWriter().use { writer ->
            writer.write("# TREE\n\n```text\n")
            val stats = writeTree(root, root, "", writer)
            writer.write("```\n\n${stats.first} directories, ${stats.second} files\n")
        }
        echo("tree written to ${outputFile.absolutePath}")
    }

    private fun writeTree(root: File, current: File, prefix: String, writer: java.io.BufferedWriter): Pair<Int, Int> {
        val entries = current.listFiles()?.filter { !it.name.startsWith(".") }?.sortedBy { it.name } ?: emptyList()
        val dirs = entries.filter { it.isDirectory }
        val files = entries.filter { it.isFile }
        val ordered = dirs + files
        var dirCount = dirs.size
        var fileCount = files.size

        ordered.forEachIndexed { i, entry ->
            val isLast = i == ordered.size - 1
            val connector = if (isLast) "└── " else "├── "
            val childPrefix = if (isLast) "$prefix    " else "$prefix│   "

            if (entry.isDirectory) {
                writer.write("$prefix$connector${entry.name}/\n")
                val sub = writeTree(root, entry, childPrefix, writer)
                dirCount += sub.first
                fileCount += sub.second
            } else {
                val rel = entry.relativeTo(root).path
                writer.write("$prefix$connector[${entry.name}](./$rel)\n")
            }
        }
        return Pair(dirCount, fileCount)
    }
}

class DocsifyScan : CliktCommand(name = "scan", help = "Scan a codebase and generate a GraphML file") {
    private val dir by option("--dir").default(".")
    private val out by option("--out").default("codebase.graphml")
    private val exclude by option("--exclude").default(".git,node_modules,vendor,dist,.next,__pycache__")
    private val verbose by option("--verbose").flag()

    override fun run() {
        val root = File(dir).absoluteFile
        val excludeSet = exclude.split(",").map { it.trim() }.toSet()

        val sourceFiles = root.walk()
            .filter {
                it.isFile && !it.name.startsWith(".") &&
                    it.parentFile?.name !in excludeSet &&
                    it.extension in setOf("kt", "java", "go", "ts", "tsx", "js", "py", "rs")
            }
            .toList()

        if (verbose) echo("found ${sourceFiles.size} source files", err = true)

        val graph = GraphMLGraph()
        for (f in sourceFiles) {
            val relPath = f.relativeTo(root).path
            if (verbose) echo("  extracting: $relPath", err = true)
            val content = try { f.readText() } catch (e: Exception) { continue }

            val symbols = extractSymbols(content, f.extension)
            val fileNode = "${f.nameWithoutExtension}"
            symbols.forEach { sym ->
                graph.addNode("${fileNode}_$sym", sym, relPath)
            }
        }

        val graphml = buildGraphML(graph)
        File(out).writeText(graphml)
        echo("graph written to $out")
        echo("  nodes: ${graph.nodes.size}  edges: ${graph.edges.size}")
    }

    private fun extractSymbols(content: String, ext: String): List<String> {
        val symbols = mutableListOf<String>()
        val lines = content.lines()
        for ((i, line) in lines.withIndex()) {
            val trimmed = line.trim()
            when (ext) {
                "go" -> {
                    val funcMatch = Regex("^func\\s+(\\w+)\\s*\\(").find(trimmed)
                    if (funcMatch != null) symbols.add(funcMatch.groupValues[1])
                }
                "kt" -> {
                    val funMatch = Regex("^(?:fun|private fun|public fun|internal fun)\\s+(\\w+)\\s*[<(]").find(trimmed)
                    if (funMatch != null) symbols.add(funMatch.groupValues[1])
                }
                "ts", "tsx" -> {
                    val fn = Regex("(?:export\\s+)?(?:async\\s+)?function\\s+(\\w+)\\s*[(<]").find(trimmed)
                    if (fn != null) symbols.add(fn.groupValues[1])
                }
                "py" -> {
                    val fn = Regex("^(?:async\\s+)?def\\s+(\\w+)\\s*\\(").find(trimmed)
                    if (fn != null) symbols.add(fn.groupValues[1])
                }
                "rs" -> {
                    val fn = Regex("(?:pub\\s+)?(?:async\\s+)?fn\\s+(\\w+)\\s*[(<]").find(trimmed)
                    if (fn != null) symbols.add(fn.groupValues[1])
                }
            }
        }
        return symbols
    }
}

class DocsifyObsidian : CliktCommand(name = "obsidian", help = "Build a wiki-link graph from markdown files") {
    private val dir by option("--dir").default(".")
    private val out by option("--out").default("")
    private val format by option("--format").default("dot")
    private val exclude by option("--exclude").default(".git,node_modules,vendor,dist,.next,__pycache__")

    override fun run() {
        val root = File(dir).absoluteFile
        val excludeSet = exclude.split(",").map { it.trim() }.toSet()
        val wikiLinkRe = Regex("\\[\\[([^\\]|]+)(?:\\|[^\\]|]+)?]]")

        val nodes = mutableListOf<ObsidianNode>()
        val edges = mutableListOf<ObsidianEdge>()
        val fileNames = mutableMapOf<String, String>()
        val linkMap = mutableMapOf<String, List<String>>()

        root.walk().forEach { f ->
            val name = f.name
            if (f.isDirectory) {
                if (name in excludeSet || (name.startsWith(".") && name != ".")) {
                    return@forEach
                }
                return@forEach
            }
            if (f.extension.lowercase() != "md") return@forEach

            val displayName = f.nameWithoutExtension
            fileNames[f.absolutePath] = displayName
            val links = f.readLines().flatMap { line ->
                wikiLinkRe.findAll(line).map { it.groupValues[1] }
            }
            if (links.isNotEmpty()) linkMap[f.absolutePath] = links
        }

        val sortedPaths = fileNames.entries.sortedBy { it.key }
        val nodeIndex = mutableMapOf<String, Int>()
        sortedPaths.forEachIndexed { i, (path, name) ->
            val rel = path.removePrefix(root.absolutePath).trimStart('/')
            nodeIndex[path] = i
            nodes.add(ObsidianNode(id = rel, name = name, path = path))
        }

        val lookup = fileNames.mapValues { (_, v) -> v.lowercase() }
        val reverseLookup = lookup.entries.groupBy({ it.value }, { it.key })
            .mapValues { (_, v) -> v.first() }

        for ((sourcePath, targets) in linkMap) {
            val srcIdx = nodeIndex[sourcePath] ?: continue
            for (target in targets) {
                val targetPath = fileNames.entries.firstOrNull { it.value.lowercase() == target.lowercase() }?.key ?: continue
                val tgtIdx = nodeIndex[targetPath] ?: continue
                edges.add(ObsidianEdge(source = srcIdx.toString(), target = tgtIdx.toString()))
                nodes[srcIdx] = nodes[srcIdx].copy(links = nodes[srcIdx].links + 1)
            }
        }

        val orphan = nodes.count { it.links == 0 }

        val output = when (format) {
            "json" -> {
                val g = GsonBuilder().setPrettyPrinting().create()
                g.toJson(mapOf("root" to root.absolutePath, "nodes" to nodes, "edges" to edges, "orphan" to orphan))
            }
            "dot" -> {
                val sb = StringBuilder()
                sb.appendLine("digraph obsidian {")
                sb.appendLine("  rankdir=LR;")
                sb.appendLine("  node [shape=box style=rounded];")
                for (n in nodes) {
                    sb.appendLine("  \"${n.id}\" [label=\"${n.name}\"];")
                }
                sb.appendLine()
                for (e in edges) {
                    sb.appendLine("  \"${nodes[e.source.toInt()].id}\" -> \"${nodes[e.target.toInt()].id}\";")
                }
                sb.appendLine("}")
                sb.toString()
            }
            else -> edges.joinToString("\n") { "${nodes[it.source.toInt()].id} -> ${nodes[it.target.toInt()].id}" }
        }

        if (out.isNotEmpty()) {
            File(out).writeText(output)
        } else {
            echo(output)
        }
    }
}

data class ObsidianNode(val id: String, val name: String, val path: String, val links: Int = 0)
data class ObsidianEdge(val source: String, val target: String)

class DocsifyCobra : CliktCommand(name = "cobra", help = "Show all registered CLI commands") {
    private val file by option("--file", "-f").default(".")
    private val output by option("--output", "-o").default("")

    override fun run() {
        val sb = StringBuilder()
        sb.appendLine("# CLI Command Reference")
        sb.appendLine()
        sb.appendLine("This document lists all available CLI commands.")
        sb.appendLine()

        val commands = listOf(
            "calc" to "Calculation tools (tax, loan, BMI, currency, etc.)",
            "casino" to "Casino games (blackjack, poker, baccarat, slots, etc.)",
            "chess" to "Chess analysis (FEN/PGN, stockfish, openings, etc.)",
            "colors" to "Color conversion and palette generation",
            "convert" to "Text conversion tools (base64, morse, braille, case transforms)",
            "crypto" to "Cryptographic tools (hash, JWT, UUID, TOTP, encrypt/decrypt)",
            "data" to "Data tools (CSV, JSON, YAML)",
            "docsify" to "Documentation tools (tree, scan, obsidian, cobra)",
            "doi" to "DOI tools (cite, fetch, ref, validate)",
            "english" to "English word definitions",
            "file" to "File operations (read, write, edit, grep, checksum, etc.)",
            "gemini" to "Google Gemini AI chat",
            "gh" to "GitHub tools (license, gitignore, languages, etc.)",
            "image" to "Image processing (convert, info, dominant color)",
            "net" to "Network tools (DNS, ping, HTTP, WHOIS, cert, WiFi)",
            "openapi" to "OpenAPI tools (validate, postman)",
            "openrouter" to "OpenRouter AI chat",
            "port" to "Port scanning and checking",
            "search" to "Search tools (files, text, web, code)",
            "semver" to "Semantic versioning tools",
            "system" to "System info and monitoring",
            "telegram" to "Telegram bot tools",
            "time" to "Time tools (cron, epoch, timer, world clock)",
            "version" to "Show CLI version",
            "web" to "Web tools (YouTube, Instagram, weather, etc.)"
        )

        for ((name, desc) in commands) {
            sb.appendLine("- **`$name`**: $desc")
        }

        val result = sb.toString()
        if (output.isNotEmpty()) {
            File(output).writeText(result)
        } else {
            echo(result)
        }
    }
}

private class GraphMLGraph {
    val nodes = mutableListOf<GraphMLNode>()
    val edges = mutableListOf<GraphMLEdge>()

    fun addNode(id: String, label: String, file: String) {
        nodes.add(GraphMLNode(id, label, file))
    }
}

private data class GraphMLNode(val id: String, val label: String, val file: String)
private data class GraphMLEdge(val source: String, val target: String)

private fun buildGraphML(graph: GraphMLGraph): String {
    val sb = StringBuilder()
    sb.appendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    sb.appendLine("<graphml xmlns=\"http://graphml.graphdrawing.org/graphml\"")
    sb.appendLine("  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"")
    sb.appendLine("  xsi:schemaLocation=\"http://graphml.graphdrawing.org/graphml")
    sb.appendLine("    http://graphml.graphdrawing.org/graphml/1.0/graphml.xsd\">")
    sb.appendLine("  <graph id=\"codebase\" edgedefault=\"directed\">")
    for (node in graph.nodes) {
        sb.appendLine("    <node id=\"${node.id}\">")
        sb.appendLine("      <data key=\"d_label\">${node.label}</data>")
        sb.appendLine("      <data key=\"d_file\">${node.file}</data>")
        sb.appendLine("    </node>")
    }
    for (edge in graph.edges) {
        sb.appendLine("    <edge source=\"${edge.source}\" target=\"${edge.target}\"/>")
    }
    sb.appendLine("  </graph>")
    sb.appendLine("</graphml>")
    return sb.toString()
}
