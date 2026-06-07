package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import java.io.File
import java.nio.file.FileSystems
import java.nio.file.Files
import java.nio.file.Paths
import java.util.regex.Pattern

class SearchCommand : CliktCommand(name = "search", help = "Universal search for files, text, code, and the web") {
    init {
        subcommands(SearchCode(), SearchFiles(), SearchText(), SearchWeb())
    }
    override fun run() = Unit
}

// ─── Code ────────────────────────────────────────────────────────────────────

data class CodePattern(val regex: Pattern, val nameGroup: Int, val kind: String)

data class SymbolMatch(val file: String, val line: Int, val symbol: String, val kind: String, val language: String)

private fun codePatternsFor(path: String, langFilter: String?): Triple<String, List<CodePattern>, Boolean> {
    val ext = path.substringAfterLast('.', "")
    return when (ext) {
        "go" -> {
            if (langFilter != null && langFilter != "go") return Triple("", emptyList(), false)
            Triple("go", listOf(
                CodePattern(Pattern.compile("^func\\s+(\\w+)\\s*\\("), 1, "method"),
                CodePattern(Pattern.compile("^func\\s+(\\w+)\\s*"), 1, "function"),
                CodePattern(Pattern.compile("^type\\s+(\\w+)\\s"), 1, "type"),
                CodePattern(Pattern.compile("^var\\s+(\\w+)"), 1, "variable"),
                CodePattern(Pattern.compile("^const\\s+(\\w+)"), 1, "constant"),
            ), true)
        }
        "ts", "tsx", "js", "jsx" -> {
            if (langFilter != null && langFilter != "ts" && langFilter != "js") return Triple("", emptyList(), false)
            Triple("typescript", listOf(
                CodePattern(Pattern.compile("^(?:export\\s+)?(?:async\\s+)?function\\s+(\\w+)"), 1, "function"),
                CodePattern(Pattern.compile("^(?:export\\s+)?class\\s+(\\w+)"), 1, "class"),
                CodePattern(Pattern.compile("^(?:export\\s+)?interface\\s+(\\w+)"), 1, "interface"),
                CodePattern(Pattern.compile("^(?:export\\s+)?type\\s+(\\w+)"), 1, "type"),
                CodePattern(Pattern.compile("^(?:export\\s+)?const\\s+(\\w+)"), 1, "variable"),
                CodePattern(Pattern.compile("^(?:export\\s+)?enum\\s+(\\w+)"), 1, "enum"),
            ), true)
        }
        "py" -> {
            if (langFilter != null && langFilter != "py") return Triple("", emptyList(), false)
            Triple("python", listOf(
                CodePattern(Pattern.compile("^(?:async\\s+)?def\\s+(\\w+)"), 1, "function"),
                CodePattern(Pattern.compile("^class\\s+(\\w+)"), 1, "class"),
                CodePattern(Pattern.compile("^(\\w+)\\s*=(?:\\s*lambda|[{(\\['\"0-9])"), 1, "variable"),
            ), true)
        }
        "rs" -> {
            if (langFilter != null && langFilter != "rs") return Triple("", emptyList(), false)
            Triple("rust", listOf(
                CodePattern(Pattern.compile("^(?:pub\\s+)?fn\\s+(\\w+)"), 1, "function"),
                CodePattern(Pattern.compile("^(?:pub\\s+)?struct\\s+(\\w+)"), 1, "struct"),
                CodePattern(Pattern.compile("^(?:pub\\s+)?trait\\s+(\\w+)"), 1, "trait"),
                CodePattern(Pattern.compile("^(?:pub\\s+)?enum\\s+(\\w+)"), 1, "enum"),
                CodePattern(Pattern.compile("^(?:pub\\s+)?type\\s+(\\w+)"), 1, "type"),
                CodePattern(Pattern.compile("^(?:pub\\s+)?const\\s+(\\w+)"), 1, "constant"),
            ), true)
        }
        else -> Triple("", emptyList(), false)
    }
}

class SearchCode : CliktCommand(name = "code", help = "Search for code symbols (functions, types, variables)") {
    private val symbol by option("--symbol", "-s")
    private val dir by option("--dir", "-d").default(".")
    private val lang by option("--lang", "-l")
    private val kind by option("--kind", "-k")
    private val maxResults by option("--max-results", "-n").int().default(0)
    private val json by option("--json").flag()
    override fun run() {
        val sym = symbol ?: error("--symbol required")
        val symbolRe = Pattern.compile(sym)
        var results = mutableListOf<SymbolMatch>()
        var done = false
        Files.walk(Paths.get(dir)).forEach { path ->
            if (done) return@forEach
            val f = path.toFile()
            if (f.isDirectory) return@forEach
            val (langName, patterns, ok) = codePatternsFor(f.name, lang)
            if (!ok) return@forEach
            if (kind != null && patterns.none { it.kind == kind }) return@forEach
            val fileLines = f.readLines()
            for ((i, line) in fileLines.withIndex()) {
                for (p in patterns) {
                    val m = p.regex.matcher(line.trim())
                    if (!m.find()) continue
                    val name = m.group(p.nameGroup)
                    if (!symbolRe.matcher(name).matches()) continue
                    if (kind != null && p.kind != kind) continue
                    results.add(SymbolMatch(path.toString(), i + 1, name, p.kind, langName))
                    if (maxResults > 0 && results.size >= maxResults) {
                        done = true
                        return@forEach
                    }
                }
            }
        }
        outputCodeResults(results, sym)
    }

    private fun outputCodeResults(results: List<SymbolMatch>, symbol: String) {
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("symbol" to symbol, "results" to results, "count" to results.size)))
        } else {
            if (results.isEmpty()) { echo("(no symbols found)"); return }
            results.forEach { echo("${it.file}:${it.line}: ${it.kind} ${it.symbol}") }
            echo("\n${results.size} symbols found")
        }
    }
}

// ─── Files ───────────────────────────────────────────────────────────────────

class SearchFiles : CliktCommand(name = "files", help = "Find files by glob pattern") {
    private val pattern by option("--pattern", "-p")
    private val dir by option("--dir", "-d").default(".")
    private val maxDepth by option("--max-depth", "-D").int().default(0)
    private val fileType by option("--type", "-t")
    private val hidden by option("--hidden", "-H").flag()
    private val json by option("--json").flag()
    override fun run() {
        val p = pattern ?: error("--pattern required")
        val root = File(dir)
        if (!root.isDirectory) error("\"$dir\" is not a directory")
        val absRoot = root.absoluteFile
        val matcher = FileSystems.getDefault().getPathMatcher("glob:$p")
        val hasGlobStar = p.contains("**")
        val results = mutableListOf<String>()
        Files.walk(Paths.get(dir)).forEach { path ->
            if (maxDepth > 0) {
                val rel = absRoot.toPath().relativize(path).nameCount
                if (rel > maxDepth) return@forEach
            }
            val f = path.toFile()
            if (!hidden && f.name.startsWith(".")) {
                if (f.isDirectory) return@forEach else return@forEach
            }
            if (fileType == "d" && !f.isDirectory) return@forEach
            if (fileType == "f" && f.isDirectory) return@forEach
            if (hasGlobStar) {
                if (matcher.matches(path)) results.add(path.toString())
            } else if (!f.isDirectory) {
                if (matcher.matches(Paths.get(f.name))) results.add(path.toString())
            }
        }
        results.sort()
        outputFileResults(results, p, dir)
    }

    private fun outputFileResults(results: List<String>, pattern: String, root: String) {
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("pattern" to pattern, "root" to root, "files" to results, "count" to results.size)))
        } else {
            if (results.isEmpty()) { echo("(no files found)"); return }
            val absRoot = File(root).absoluteFile
            results.forEach { echo(File(it).relativeToOrNull(absRoot)?.path ?: it) }
            if (results.size > 1) echo("\n${results.size} files found")
        }
    }
}

// ─── Text ────────────────────────────────────────────────────────────────────

data class TextMatch(val file: String, val line: Int, val content: String)

class SearchText : CliktCommand(name = "text", help = "Search file contents using regex") {
    private val pattern by option("--pattern", "-p")
    private val path by option("--path", "-P").default(".")
    private val ignoreCase by option("--ignore-case", "-i").flag()
    private val maxCount by option("--max-count", "-m").int().default(0)
    private val include by option("--include")
    private val maxDepth by option("--max-depth", "-d").int().default(0)
    private val json by option("--json").flag()
    override fun run() {
        val p = pattern ?: error("--pattern required")
        val rePattern = if (ignoreCase) "(?i)$p" else p
        val re = Pattern.compile(rePattern)
        var includeRe: Pattern? = null
        val includeVal = include
        if (includeVal != null) {
            val globRe = includeVal.replace("*", ".*")
            includeRe = Pattern.compile("^$globRe$")
        }
        val results = mutableListOf<TextMatch>()
        val seen = mutableSetOf<String>()
        val rootFile = File(path)
        if (!rootFile.isDirectory) {
            val matches = searchFileText(rootFile, re, maxCount)
            for (m in matches) {
                val key = "${m.file}:${m.content}"
                if (key !in seen) { seen.add(key); results.add(m) }
            }
        } else {
            searchTextRecursive(rootFile, re, includeRe, maxDepth, 0, results, maxCount, seen)
        }
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("pattern" to p, "matches" to results.size, "results" to results)))
        } else {
            if (results.isEmpty()) { echo("(no matches)"); return }
            results.forEach { echo("${it.file}:${it.line}: ${it.content}") }
            if (results.size > 1) echo("\n${results.size} matches")
        }
    }

    private fun searchFileText(file: File, re: Pattern, maxCount: Int): List<TextMatch> {
        if (!file.isFile) return emptyList()
        val bytes = file.readBytes()
        if (bytes.any { it == 0.toByte() }) return emptyList()
        val lines = bytes.decodeToString().lines()
        val matches = mutableListOf<TextMatch>()
        for ((i, line) in lines.withIndex()) {
            if (re.matcher(line).find()) {
                matches.add(TextMatch(file.path, i + 1, line.trim()))
                if (maxCount > 0 && matches.size >= maxCount) break
            }
        }
        return matches
    }

    private fun searchTextRecursive(dir: File, re: Pattern, includeRe: Pattern?, maxDepth: Int, depth: Int, results: MutableList<TextMatch>, maxCount: Int, seen: MutableSet<String>) {
        if (maxDepth > 0 && depth > maxDepth) return
        val files = dir.listFiles() ?: return
        for (f in files) {
            if (f.isDirectory) {
                searchTextRecursive(f, re, includeRe, maxDepth, depth + 1, results, maxCount, seen)
            } else {
                if (includeRe != null && !includeRe.matcher(f.name).matches()) continue
                val matches = searchFileText(f, re, maxCount)
                for (m in matches) {
                    val key = "${m.file}:${m.content}"
                    if (key !in seen) { seen.add(key); results.add(m) }
                    if (maxCount > 0 && results.size >= maxCount) return
                }
            }
        }
    }
}

// ─── Web ─────────────────────────────────────────────────────────────────────

data class WebResult(val title: String = "", val url: String = "", val snippet: String = "")

class SearchWeb : CliktCommand(name = "web", help = "Search the internet") {
    private val query by option("--query", "-q")
    private val maxResults by option("--max-results", "-n").int().default(5)
    private val source by option("--source", "-s").default("duckduckgo")
    private val json by option("--json").flag()
    override fun run() {
        val q = query ?: error("--query required")
        if (source == "duckduckgo" || source.isNullOrEmpty()) {
            val html = fetchDuckDuckGo(q)
            val results = parseDuckDuckGoResults(html, maxResults)
            if (json) {
                echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("query" to q, "results" to results, "count" to results.size)))
            } else {
                if (results.isEmpty()) { echo("(no results)"); return }
                results.forEachIndexed { i, r ->
                    echo("${i + 1}. ${r.title}")
                    echo("   ${r.url}")
                    if (r.snippet.isNotEmpty()) echo("   ${r.snippet}")
                    echo()
                }
                echo("${results.size} results from DuckDuckGo")
            }
        } else {
            error("unsupported search source: $source (use 'duckduckgo')")
        }
    }
}

private fun fetchDuckDuckGo(query: String): String {
    val conn = java.net.URL("https://lite.duckduckgo.com/lite/?q=${java.net.URLEncoder.encode(query, "UTF-8")}")
        .openConnection() as java.net.HttpURLConnection
    conn.setRequestProperty("User-Agent", "Mozilla/5.0 (compatible; hieudoanm-cli/1.0)")
    return conn.inputStream.readAllBytes().decodeToString()
}

private val ddgResultRe = Pattern.compile("<a[^>]*class=\"result-link\"[^>]*href=\"([^\"]*)\"[^>]*>([^<]*)</a>")
private val ddgSnippetRe = Pattern.compile("<td[^>]*class=\"result-snippet\"[^>]*>(.*?)</td>")

private fun parseDuckDuckGoResults(html: String, maxResults: Int): List<WebResult> {
    val linkMatcher = ddgResultRe.matcher(html)
    val snippetMatcher = ddgSnippetRe.matcher(html)
    val linkMatches = mutableListOf<List<String>>()
    while (linkMatcher.find()) linkMatches.add(listOf(linkMatcher.group(0), linkMatcher.group(1), linkMatcher.group(2)))
    val snippetMatches = mutableListOf<String>()
    while (snippetMatcher.find()) snippetMatches.add(snippetMatcher.group(1))
    val n = if (maxResults > 0) maxResults.coerceAtMost(linkMatches.size) else linkMatches.size
    return (0 until n).map { i ->
        val href = linkMatches[i][1]
        val title = cleanHtml(linkMatches[i][2])
        val url = when {
            href.startsWith("//") -> "https:$href"
            href.startsWith("http") -> href
            else -> "https://$href"
        }
        val snippet = if (i < snippetMatches.size) cleanHtml(snippetMatches[i]) else ""
        WebResult(title = title, url = url, snippet = snippet)
    }
}

private val htmlTagRe = Pattern.compile("<[^>]*>")
private val htmlEntityRe = Pattern.compile("&([^;]+);")
private val htmlEntities = mapOf(
    "amp" to "&", "lt" to "<", "gt" to ">",
    "quot" to "\"", "apos" to "'", "nbsp" to " "
)

private fun cleanHtml(s: String): String {
    var result = htmlTagRe.matcher(s).replaceAll("")
    result = htmlEntityRe.matcher(result).replaceAll { m ->
        val key = m.group(1)
        htmlEntities[key] ?: (if (key.startsWith("#")) key.drop(1).toIntOrNull()?.let { Char(it).toString() } ?: m.group() else m.group())
    }
    return result.trim()
}
