package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.long
import com.google.gson.GsonBuilder
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.security.MessageDigest
import java.util.Locale
import kotlin.io.path.name

private val gson = GsonBuilder().setPrettyPrinting().create()

class FileCommand : CliktCommand(name = "file", help = "File introspection and analysis tools") {
    init {
        subcommands(
            FileChecksum(), FileChmod(), FileCount(), FileDuplicates(),
            FileEdit(), FileGrep(), FileHead(), FileRead(),
            FileSize(), FileStats(), FileTail(), FileType(), FileWrite()
        )
    }
    override fun run() = Unit
}

class FileChecksum : CliktCommand(name = "checksum", help = "Compute file checksum") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val algorithm: String by option("--algorithm", "-a", help = "Hash algorithm: md5, sha1, sha256, sha512").default("sha256")
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        val data = f.readBytes()
        val hash = hexString(
            when (algorithm.lowercase(Locale.ROOT)) {
                "md5" -> MessageDigest.getInstance("MD5").digest(data)
                "sha1" -> MessageDigest.getInstance("SHA-1").digest(data)
                "sha256" -> MessageDigest.getInstance("SHA-256").digest(data)
                "sha512" -> MessageDigest.getInstance("SHA-512").digest(data)
                else -> MessageDigest.getInstance("SHA-256").digest(data)
            }
        )
        if (jsonOutput) {
            echo(gson.toJson(mapOf("file" to file, "algorithm" to algorithm, "hash" to hash)))
        } else {
            echo("$hash  $file")
        }
    }
}

class FileChmod : CliktCommand(name = "chmod", help = "Change file permissions") {
    private val mode: String by option("--mode", "-m", help = "Octal permission mode (e.g. 755)").required()
    private val file: String by option("--file", "-f", help = "File or directory path").required()
    private val recursive: Boolean by option("--recursive", "-r", help = "Change permissions recursively").flag()

    override fun run() {
        val modeVal = mode
        val perm = parseMode(modeVal)
        val path = Paths.get(file)
        if (recursive) {
            Files.walk(path).forEach { p -> Files.setPosixFilePermissions(p, perm) }
        } else {
            Files.setPosixFilePermissions(path, perm)
        }
    }
}

class FileCount : CliktCommand(name = "count", help = "Count lines in a file") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        val text = f.readText()
        val lines = text.count { it == '\n' }
        val words = text.trim().split("\\s+".toRegex()).count { it.isNotEmpty() }
        val bytes = text.toByteArray().size
        if (jsonOutput) {
            echo(gson.toJson(mapOf("file" to file, "lines" to lines, "words" to words, "bytes" to bytes)))
        } else {
            echo("%8d %8d %8d %s".format(lines, words, bytes, file))
        }
    }
}

class FileDuplicates : CliktCommand(name = "duplicates", help = "Find duplicate files") {
    private val dir: String by option("--dir", "-d", help = "Directory to scan").required()
    private val minSize by option("--min-size", "-m", help = "Minimum file size to consider (bytes)").long().default(1L)
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val bySize = mutableMapOf<Long, MutableList<String>>()
        val root = Paths.get(dir)
        Files.walk(root).forEach { p ->
            if (Files.isRegularFile(p)) {
                val sz = Files.size(p)
                if (sz >= minSize) {
                    bySize.getOrPut(sz) { mutableListOf() }.add(p.toString())
                }
            }
        }
        var found = false
        for ((size, paths) in bySize) {
            if (paths.size < 2) continue
            val byHash = mutableMapOf<String, MutableList<String>>()
            for (p in paths) {
                val h = quickHash(p)
                byHash.getOrPut(h) { mutableListOf() }.add(p)
            }
            for ((_, dups) in byHash) {
                if (dups.size < 2) continue
                found = true
                if (jsonOutput) {
                    echo(gson.toJson(mapOf("size" to size, "files" to dups)))
                } else {
                    echo("Duplicates (${formatSize(size)} each):")
                    for (d in dups) echo("  $d")
                    echo()
                }
            }
        }
        if (!found) echo("No duplicates found.")
    }
}

class FileEdit : CliktCommand(name = "edit", help = "Find and replace text in a file") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val old: String by option("--old", "-o", help = "Text or pattern to replace").required()
    private val new: String by option("--new", help = "Replacement text").default("")
    private val regex: Boolean by option("--regex", "-r", help = "Interpret old as a regex pattern").flag()
    private val preview: Boolean by option("--preview", "-p", help = "Preview changes without modifying the file").flag()
    private val count by option("--count", "-n", help = "Number of occurrences to replace (0 = all)").int().default(0)
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        if (f.isDirectory) { echo("\"$file\" is a directory", err = true); return }
        val content = f.readText()
        val (replaced, matchCount) = performEdit(content, old, new, regex, count)
        outputEditResult(f, content, replaced, matchCount, preview, jsonOutput)
    }
}

class FileGrep : CliktCommand(name = "grep", help = "Search file contents using regex") {
    private val pattern: String by option("--pattern", "-p", help = "Regex or fixed string pattern to search for").required()
    private val path: String? by option("--path", "-P", help = "File or directory to search")
    private val include: String? by option("--include", "-i", help = "Glob pattern for file names (e.g. \"*.go\")")
    private val context by option("--context", "-C", help = "Show N lines of context around matches").int().default(0)
    private val fixed: Boolean by option("--fixed", "-F", help = "Fixed string match (not regex)").flag()
    private val ignoreCase: Boolean by option("--ignore-case", "-v", help = "Case-insensitive search").flag()
    private val maxCount by option("--max-count", "-m", help = "Maximum number of matches").int().default(0)
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()
    private val pathArg by argument().default("")

    override fun run() {
        val extraPaths = pathArg.split(Regex("\\s+")).filter { it.isNotEmpty() }
        val pathVal = path
        val searchPaths = if (pathVal != null) listOf(pathVal) else if (extraPaths.isNotEmpty()) extraPaths else listOf(".")
        val re = compileSearchPattern(pattern, fixed, ignoreCase)
        val includeRe = include?.let { globToRegex(it).toRegex() }
        val (matches, totalFiles) = grepFiles(re, searchPaths, includeRe, context, maxCount)
        outputGrepResults(matches, totalFiles, pattern, jsonOutput)
    }
}

class FileHead : CliktCommand(name = "head", help = "Show the first N lines of a file") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val headLines by option("--lines", "-n", help = "Number of lines").int().default(10)

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        f.useLines { l -> l.take(headLines).forEach { echo(it) } }
    }
}

class FileRead : CliktCommand(name = "read", help = "Read file content with line numbers") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val readLinesNum by option("--lines", "-n", help = "Number of lines to show (0 = all)").int().default(0)
    private val readOffset by option("--offset", "-o", help = "Starting line offset (0-based)").int().default(0)
    private val hideNumbers by option("--no-numbers", help = "Hide line numbers").flag()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        val allLines = f.readLines()
        val totalLines = allLines.size
        val start = readOffset.coerceIn(0, totalLines)
        val end = if (readLinesNum == 0) totalLines else (start + readLinesNum).coerceAtMost(totalLines)
        val displayLines = allLines.subList(start, end)

        if (jsonOutput) {
            val content = if (start == 0 && end == totalLines) f.readText() else displayLines.joinToString("\n")
            val info = mapOf(
                "file" to file, "size" to f.length(), "mode" to "",
                "mime" to detectMime(file), "totalLines" to totalLines, "content" to content
            )
            echo(gson.toJson(info))
            return
        }

        echo("── ${f.absolutePath} ──")
        if (displayLines.isEmpty()) { echo("(empty file)"); return }
        val lineWidth = end.toString().length
        for ((i, line) in displayLines.withIndex()) {
            val num = start + i + 1
            if (!hideNumbers) echo("%${lineWidth}d | %s".format(num, line))
            else echo(line)
        }
        if (start > 0 || end < totalLines) {
            echo("── ${end - start}/$totalLines lines (${start + 1}-$end) ──")
        }
    }
}

class FileSize : CliktCommand(name = "size", help = "Show file or directory size") {
    private val path: String by option("--path", "-p", help = "File or directory path").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val p = Paths.get(path)
        val total = if (Files.isDirectory(p)) {
            Files.walk(p).filter { Files.isRegularFile(it) }.mapToLong { Files.size(it) }.sum()
        } else {
            Files.size(p)
        }
        if (jsonOutput) {
            echo(gson.toJson(mapOf("path" to path, "size" to total)))
        } else {
            echo("${formatSize(total)}  $path")
        }
    }
}

class FileStats : CliktCommand(name = "stats", help = "Show file statistics by extension") {
    private val dir: String by option("--dir", "-d", help = "Directory path").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val extStats = mutableMapOf<String, ExtStats>()
        var totalFiles = 0
        var totalSize = 0L
        val root = Paths.get(dir)
        Files.walk(root).forEach { p ->
            if (Files.isRegularFile(p)) {
                totalFiles++
                val sz = Files.size(p)
                totalSize += sz
                var ext = p.name.substringAfterLast('.', "").lowercase(Locale.ROOT)
                if (ext.isEmpty()) ext = "(no extension)"
                val s = extStats.getOrPut(ext) { ExtStats() }
                s.count++
                s.size += sz
            }
        }
        if (jsonOutput) {
            val entries = extStats.entries.map { (ext, s) ->
                mapOf("extension" to ext, "files" to s.count, "size" to s.size)
            }
            echo(gson.toJson(mapOf("path" to dir, "totalFiles" to totalFiles, "totalSize" to totalSize, "byExtension" to entries)))
            return
        }
        echo("Total files : $totalFiles")
        echo("Total size  : ${formatSize(totalSize)}")
        echo()
        val entries = extStats.entries.sortedByDescending { it.value.size }
        echo("%-20s %8s %12s".format("Extension", "Files", "Size"))
        echo("-".repeat(42))
        for ((ext, s) in entries) {
            echo("%-20s %8d %12s".format(ext, s.count, formatSize(s.size)))
        }
    }
}

class FileTail : CliktCommand(name = "tail", help = "Show the last N lines of a file") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val tailLines by option("--lines", "-n", help = "Number of lines").int().default(10)

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        val ring = mutableListOf<String>()
        f.useLines { l ->
            l.forEach { line ->
                if (ring.size >= tailLines) ring.removeFirst()
                ring.add(line)
            }
        }
        ring.forEach { echo(it) }
    }
}

class FileType : CliktCommand(name = "type", help = "Detect file type by extension") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) { echo("file not found: $file", err = true); return }
        val mime = detectMime(file)
        val info = if (jsonOutput) {
            gson.toJson(mapOf("file" to file, "size" to f.length(), "mime" to mime, "mode" to "", "modified" to ""))
        } else {
            val modTime = java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(java.util.Date(f.lastModified()))
            """
File     : $file
Size     : ${formatSize(f.length())}
MIME     : $mime
Mode     : ${if (f.canExecute()) "executable" else ""}
Modified : $modTime
            """.trimIndent()
        }
        echo(info)
    }
}

class FileWrite : CliktCommand(name = "write", help = "Write or append content to a file") {
    private val file: String by option("--file", "-f", help = "File path").required()
    private val content: String? by option("--content", "-c", help = "File content (omit to read from stdin)")
    private val append: Boolean by option("--append", "-a", help = "Append to file instead of overwriting").flag()
    private val mkdir: Boolean by option("--mkdir", "-p", help = "Create parent directories if needed").flag()
    private val mode: String? by option("--mode", "-m", help = "File permissions (octal, e.g. 644)")
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val text = content ?: readStdin()
        if (text == null) { echo("no content provided (pipe content or use --content)", err = true); return }

        val f = File(file)
        if (mkdir) f.parentFile?.mkdirs()
        if (append) {
            f.appendText(text)
        } else {
            f.writeText(text)
        }
        val modeVal = mode
        if (modeVal != null) {
            val p = parseMode(modeVal)
            Files.setPosixFilePermissions(f.toPath(), p)
        }
        if (jsonOutput) {
            echo(gson.toJson(mapOf("file" to file, "bytes" to text.length, "append" to append)))
        } else {
            val verb = if (append) "Appended" else "Written"
            echo("$verb ${text.length} bytes to $file")
        }
    }
}

private data class ExtStats(var count: Int = 0, var size: Long = 0L)

private data class LineMatch(
    val file: String = "",
    val line: Int = 0,
    val content: String = "",
    val before: String = "",
    val after: String = ""
)

private fun hexString(bytes: ByteArray): String {
    return bytes.joinToString("") { "%02x".format(it) }
}

private fun parseMode(s: String): Set<java.nio.file.attribute.PosixFilePermission> {
    val mode = s.toIntOrNull(8) ?: throw IllegalArgumentException("invalid mode \"$s\" (use octal e.g. 755)")
    val perms = mutableSetOf<java.nio.file.attribute.PosixFilePermission>()
    if (mode and 256 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OWNER_READ)
    if (mode and 128 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OWNER_WRITE)
    if (mode and 64 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OWNER_EXECUTE)
    if (mode and 32 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.GROUP_READ)
    if (mode and 16 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.GROUP_WRITE)
    if (mode and 8 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.GROUP_EXECUTE)
    if (mode and 4 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OTHERS_READ)
    if (mode and 2 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OTHERS_WRITE)
    if (mode and 1 != 0) perms.add(java.nio.file.attribute.PosixFilePermission.OTHERS_EXECUTE)
    return perms
}

private fun formatSize(bytes: Long): String {
    val unit = 1024L
    if (bytes < unit) return "$bytes B"
    val sizes = listOf("KB", "MB", "GB", "TB")
    var div = unit
    var exp = 0
    while (bytes / div >= unit && exp < sizes.size - 1) {
        div *= unit
        exp++
    }
    return "%.1f %s".format(bytes.toDouble() / div, sizes[exp])
}

private fun detectMime(path: String): String {
    val ext = path.substringAfterLast('.').lowercase(Locale.ROOT)
    val mimes = mapOf(
        "txt" to "text/plain", "md" to "text/markdown", "html" to "text/html",
        "css" to "text/css", "js" to "text/javascript", "json" to "application/json",
        "xml" to "application/xml", "yml" to "application/x-yaml", "yaml" to "application/x-yaml",
        "toml" to "application/toml", "csv" to "text/csv",
        "jpg" to "image/jpeg", "jpeg" to "image/jpeg", "png" to "image/png",
        "gif" to "image/gif", "svg" to "image/svg+xml", "webp" to "image/webp",
        "pdf" to "application/pdf", "doc" to "application/msword",
        "docx" to "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "xls" to "application/vnd.ms-excel", "xlsx" to "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "zip" to "application/zip", "tar" to "application/x-tar", "gz" to "application/gzip",
        "mp3" to "audio/mpeg", "mp4" to "video/mp4",
        "go" to "text/x-go", "py" to "text/x-python", "rs" to "text/x-rust",
        "sh" to "text/x-shellscript", "swift" to "text/x-swift"
    )
    return mimes[ext] ?: "application/octet-stream"
}

private fun quickHash(path: String): String {
    val data = File(path).readBytes()
    val digest = MessageDigest.getInstance("SHA-256").digest(data)
    return hexString(digest)
}

private fun performEdit(content: String, old: String, newStr: String, useRegex: Boolean, count: Int): Pair<String, Int> {
    if (useRegex) {
        val re = old.toRegex()
        val matchCount = re.findAll(content).count()
        val limit = if (count > 0) count else Int.MAX_VALUE
        var replaced = ""
        var done = 0
        replaced = re.replace(content) {
            if (done < limit) { done++; newStr } else it.value
        }
        return Pair(replaced, if (count > 0) minOf(done, matchCount) else matchCount)
    }
    val matchCount = content.split(old).size - 1
    val replaced = content.replace(old, newStr)
    return Pair(replaced, if (count > 0) minOf(matchCount, count) else matchCount)
}

private fun CliktCommand.outputEditResult(f: File, content: String, replaced: String, matchCount: Int, preview: Boolean, json: Boolean) {
    if (matchCount == 0) {
        if (json) echo(gson.toJson(mapOf("file" to f.path, "matches" to 0)))
        else echo("No matches found in ${f.path}")
        return
    }
    if (preview) {
        echo("── Preview for ${f.path} ($matchCount match${if (matchCount != 1) "es" else ""}) ──")
        showDiff(content, replaced)
        return
    }
    f.writeText(replaced)
    if (json) echo(gson.toJson(mapOf("file" to f.path, "matches" to matchCount)))
    else echo("Replaced $matchCount occurrence${if (matchCount != 1) "s" else ""} in ${f.path}")
}

private fun CliktCommand.showDiff(before: String, after: String) {
    val beforeLines = before.split("\n")
    val afterLines = after.split("\n")
    val maxLen = maxOf(beforeLines.size, afterLines.size)
    for (i in 0 until maxLen) {
        val b = if (i < beforeLines.size) beforeLines[i] else ""
        val a = if (i < afterLines.size) afterLines[i] else ""
        if (b != a) {
            if (b.isNotEmpty()) echo("- $b")
            if (a.isNotEmpty()) echo("+ $a")
        } else {
            echo("  $b")
        }
    }
}

private fun compileSearchPattern(pattern: String, fixed: Boolean, ignoreCase: Boolean): Regex {
    return if (fixed) Regex.escape(pattern).toRegex()
    else if (ignoreCase) Regex(pattern, RegexOption.IGNORE_CASE)
    else pattern.toRegex()
}

private fun globToRegex(pattern: String): String {
    var result = Regex.escape(pattern)
    result = result.replace("\\*", ".*")
    result = result.replace("\\?", ".")
    return "^$result$"
}

private val binaryExtensions = setOf(
    ".exe", ".bin", ".o", ".a", ".so", ".dll", ".dylib",
    ".jpg", ".jpeg", ".png", ".gif", ".ico", ".pdf",
    ".zip", ".tar", ".gz", ".bz2", ".7z",
    ".mp3", ".mp4", ".mov", ".avi", ".webp", ".woff", ".woff2"
)

private fun isBinary(path: String): Boolean {
    val ext = path.substringAfterLast('.').let { if (it.isNotEmpty()) ".$it" else "" }
    return ext in binaryExtensions
}

private fun CliktCommand.grepFiles(re: Regex, searchPaths: List<String>, include: Regex?, context: Int, maxCount: Int): Pair<List<LineMatch>, Int> {
    val matches = mutableListOf<LineMatch>()
    var totalFiles = 0
    for (root in searchPaths) {
        val rootPath = Paths.get(root)
        if (!Files.exists(rootPath)) { echo("error: $root not found", err = true); continue }
        if (!Files.isDirectory(rootPath)) {
            val (m, f) = grepFile(re, rootPath.toString(), context, maxCount)
            matches.addAll(m)
            totalFiles += f
            continue
        }
        Files.walk(rootPath).forEach { p ->
            if (Files.isRegularFile(p)) {
                val name = p.name
                if (include != null && !include.matches(name)) return@forEach
                if (isBinary(p.toString())) return@forEach
                val (m, f) = grepFile(re, p.toString(), context, maxCount)
                matches.addAll(m)
                totalFiles += f
            }
        }
    }
    return Pair(matches, totalFiles)
}

private fun grepFile(re: Regex, path: String, context: Int, maxCount: Int): Pair<List<LineMatch>, Int> {
    val f = File(path)
    if (!f.exists()) return Pair(emptyList(), 0)
    val lines = f.readLines()
    val result = mutableListOf<LineMatch>()
    for ((i, line) in lines.withIndex()) {
        if (re.containsMatchIn(line)) {
            var m = LineMatch(file = path, line = i + 1, content = line)
            if (context > 0) {
                val start = maxOf(0, i - context)
                val end = minOf(lines.size, i + context + 1)
                val ctxLines = (start until end).map { j ->
                    val mark = if (j == i) ">" else " "
                    "$mark%5d| %s".format(j + 1, lines[j])
                }
                m = m.copy(before = ctxLines.take(context).joinToString("\n"), after = ctxLines.joinToString("\n"))
            }
            result.add(m)
            if (maxCount > 0 && result.size >= maxCount) break
        }
    }
    return Pair(result, 1)
}

private fun CliktCommand.outputGrepResults(matches: List<LineMatch>, totalFiles: Int, pattern: String, jsonOut: Boolean) {
    val multiFile = totalFiles > 1
    if (jsonOut) {
        echo(gson.toJson(mapOf("pattern" to pattern, "files" to totalFiles, "matches" to matches.size, "results" to matches)))
        return
    }
    if (matches.isEmpty()) { echo("(no matches)"); return }
    for (m in matches) {
        val prefix = if (multiFile) "${m.file}:" else ""
        if (m.before.isNotEmpty()) echo("$prefix  ${m.before}")
        echo("$prefix${m.line}: ${m.content}")
        if (m.after.isNotEmpty()) echo("$prefix  ${m.after}")
    }
}

private fun readStdin(): String? {
    return try {
        val bytes = System.`in`.readAllBytes()
        if (bytes.isEmpty()) null else bytes.decodeToString()
    } catch (e: Exception) {
        null
    }
}
