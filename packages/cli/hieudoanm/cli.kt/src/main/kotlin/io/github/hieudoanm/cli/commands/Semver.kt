package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.google.gson.GsonBuilder

data class SemverVersion(val major: Int, val minor: Int, val patch: Int, val prerelease: String = "") {
    fun compare(other: SemverVersion): Int {
        major.compareTo(other.major).let { if (it != 0) return it }
        minor.compareTo(other.minor).let { if (it != 0) return it }
        patch.compareTo(other.patch).let { if (it != 0) return it }
        if (prerelease != other.prerelease) {
            if (prerelease.isEmpty()) return 1
            if (other.prerelease.isEmpty()) return -1
            return prerelease.compareTo(other.prerelease)
        }
        return 0
    }

    fun bump(part: String): SemverVersion = when (part) {
        "major" -> SemverVersion(major + 1, 0, 0)
        "minor" -> SemverVersion(major, minor + 1, 0)
        "patch" -> SemverVersion(major, minor, patch + 1)
        else -> this
    }

    override fun toString(): String {
        val s = "$major.$minor.$patch"
        return if (prerelease.isNotEmpty()) "$s-$prerelease" else s
    }
}

fun parseSemver(s: String): SemverVersion {
    var sv = s.trimStart('v')
    val parts = sv.split(".", limit = 3)
    require(parts.size >= 3) { "invalid semver: $s (need major.minor.patch)" }
    val major = parts[0].toIntOrNull() ?: throw IllegalArgumentException("invalid major version: ${parts[0]}")
    val minor = parts[1].toIntOrNull() ?: throw IllegalArgumentException("invalid minor version: ${parts[1]}")
    var patchStr = parts[2]
    var prerelease = ""
    val idx = patchStr.indexOf("-")
    if (idx >= 0) {
        prerelease = patchStr.substring(idx + 1)
        patchStr = patchStr.substring(0, idx)
    }
    val patch = patchStr.toIntOrNull() ?: throw IllegalArgumentException("invalid patch version: $patchStr")
    return SemverVersion(major, minor, patch, prerelease)
}

fun checkRange(v: SemverVersion, rangeExpr: String): Boolean {
    val parts = rangeExpr.split("\\s+".toRegex())
    require(parts.isNotEmpty()) { "empty range expression" }
    var i = 0
    while (i < parts.size) {
        val op = parts[i]
        require(i + 1 < parts.size) { "incomplete range: missing version after $op" }
        val ver = parseSemver(parts[i + 1])
        val cmp = v.compare(ver)
        val matches = when (op) {
            ">" -> cmp > 0
            ">=" -> cmp >= 0
            "<" -> cmp < 0
            "<=" -> cmp <= 0
            "=", "==" -> cmp == 0
            else -> throw IllegalArgumentException("unknown operator: $op")
        }
        if (!matches) return false
        i += 2
    }
    return true
}

class SemverCommand : CliktCommand(name = "semver", help = "Parse, compare, sort, and bump semver strings") {
    init {
        subcommands(SemverBump(), SemverCompare(), SemverRange(), SemverSort(), SemverValidate())
    }
    override fun run() = Unit
}

class SemverBump : CliktCommand(name = "bump", help = "Bump a semver version") {
    private val ver by option("--version", help = "Version to bump").required()
    private val major by option("--major", help = "Bump major version").flag()
    private val minor by option("--minor", help = "Bump minor version").flag()
    private val patch by option("--patch", help = "Bump patch version").flag()
    private val pre by option("--pre", help = "Set prerelease label").default("")
    private val build by option("--build", help = "Set build metadata").default("")
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val v = parseSemver(ver)
        val part = when {
            major -> "major"
            minor -> "minor"
            patch -> "patch"
            else -> "patch"
        }
        var result = v.bump(part)
        if (pre.isNotEmpty()) result = result.copy(prerelease = pre)
        val extra = if (build.isNotEmpty()) "+$build" else ""
        val outStr = result.toString() + extra
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("input" to ver, "result" to outStr, "bump" to part, "prerelease" to pre)))
        } else {
            echo(outStr)
        }
    }
}

class SemverCompare : CliktCommand(name = "compare", help = "Compare two semver strings") {
    private val aVer by option("--a", help = "First version").required()
    private val bVer by option("--b", help = "Second version").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val a = parseSemver(aVer)
        val b = parseSemver(bVer)
        val cmp = a.compare(b)
        val rel = when {
            cmp < 0 -> "<"
            cmp > 0 -> ">"
            else -> "=="
        }
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("a" to a.toString(), "b" to b.toString(), "relation" to rel)))
        } else {
            echo("${a} $rel ${b}")
        }
    }
}

class SemverRange : CliktCommand(name = "range", help = "Check if a version satisfies a range constraint") {
    private val ver by option("--version", help = "Version to check").required()
    private val rangeExpr by option("--range", help = "Range constraint (e.g. '>=1.0.0 <2.0.0')").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val v = parseSemver(ver)
        val matches = checkRange(v, rangeExpr)
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("version" to ver, "range" to rangeExpr, "matches" to matches)))
        } else {
            if (matches) echo("$v matches range $rangeExpr")
            else echo("$v does NOT match range $rangeExpr")
        }
    }
}

class SemverSort : CliktCommand(name = "sort", help = "Sort semver strings") {
    private val versions by option("--versions", help = "Comma-separated versions").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val versionList = versions.split(",").map { it.trim() }
        val parsed = versionList.map { parseSemver(it) }
        val sorted = parsed.sortedWith { a, b -> a.compare(b) }
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("sorted" to sorted.map { it.toString() })))
        } else {
            sorted.forEach { echo(it.toString()) }
        }
    }
}

class SemverValidate : CliktCommand(name = "validate", help = "Validate semver strings") {
    private val versions by option("--versions", help = "Comma-separated versions").required()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val versionList = versions.split(",").map { it.trim() }
        if (json) {
            val results = versionList.map { s ->
                val valid = try { parseSemver(s); true } catch (e: Exception) { false }
                mapOf("version" to s, "valid" to valid)
            }
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(results))
        } else {
            versionList.forEach { s ->
                try {
                    parseSemver(s)
                    echo("$s: valid")
                } catch (e: Exception) {
                    echo("$s: invalid (${e.message})")
                }
            }
        }
    }
}
