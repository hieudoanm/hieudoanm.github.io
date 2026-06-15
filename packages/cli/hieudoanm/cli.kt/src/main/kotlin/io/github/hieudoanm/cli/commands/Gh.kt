package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import io.github.hieudoanm.cli.services.Requests
import java.io.File

class GhCommand : CliktCommand(name = "gh", help = "GitHub CLI tools") {
    init {
        subcommands(GhCoc(), GhIgnore(), GhLanguages(), GhLicenseCmd(), GhOg())
    }
    override fun run() = Unit
}

private val languageColors = mapOf(
    "Go" to "#00ADD8", "TypeScript" to "#3178C6", "JavaScript" to "#F7DF1E",
    "Python" to "#3572A5", "Java" to "#B07219", "Rust" to "#DEA584",
    "C" to "#555555", "C++" to "#F34B7D", "C#" to "#178600",
    "Ruby" to "#701516", "PHP" to "#4F5D95", "Swift" to "#F05138",
    "Kotlin" to "#A97BFF", "Scala" to "#C22D40", "Shell" to "#89E051",
    "HTML" to "#E34F26", "CSS" to "#563D7C", "Vue" to "#41B883",
    "Svelte" to "#FF3E00", "Dart" to "#00B4AB", "Lua" to "#000080",
    "R" to "#198CE7", "Haskell" to "#5E5086", "Elixir" to "#6E4A7E",
    "Clojure" to "#DB5855", "Erlang" to "#B83998", "Zig" to "#EC915C",
    "Nix" to "#7EBAE4", "Solidity" to "#AA6746", "YAML" to "#CB171E",
    "Markdown" to "#083FA1", "Dockerfile" to "#384D54", "Makefile" to "#427819",
    "CMake" to "#DA3434", "TeX" to "#3D6117"
)

private val gson = GsonBuilder().setPrettyPrinting().create()

data class GhLicense(
    val key: String = "",
    val name: String = "",
    val spdx_id: String = "",
    val url: String = "",
    val body: String = ""
)

data class GhCodeOfConduct(
    val key: String = "",
    val name: String = "",
    val url: String = "",
    val body: String = ""
)

data class GitignoreTemplate(
    val name: String = "",
    val source: String = ""
)

data class GhRepo(
    val name: String = "",
    val full_name: String = "",
    val description: String = "",
    val html_url: String = "",
    val stargazers_count: Int = 0,
    val forks_count: Int = 0,
    val language: String = "",
    val owner: GhOwner = GhOwner()
)

data class GhOwner(
    val login: String = "",
    val avatar_url: String = ""
)

class GhLanguages : CliktCommand(name = "languages", help = "Show repository language breakdown") {
    private val repo: String by option("--repo", "-r", help = "Repository (owner/repo)").required()
    private val output: String by option("--output", "-o", help = "Output SVG file path").default("languages.svg")
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val parts = repo.split("/")
        if (parts.size != 2) {
            echo("repo must be in format owner/repo (got \"$repo\")", err = true)
            return
        }
        val url = "https://api.github.com/repos/${parts[0]}/${parts[1]}/languages"
        val result = Requests.get(url, mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (result.isFailure) {
            echo("error fetching languages: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val mapType = object : TypeToken<Map<String, Int>>() {}.type
        val langs: Map<String, Int> = try {
            gson.fromJson(result.getOrNull(), mapType)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }
        if (langs.isEmpty()) {
            echo("No languages found")
            return
        }

        if (!jsonOutput) {
            echo("Languages:")
            for ((lang, bytes) in langs) {
                echo("  $lang: $bytes bytes")
            }
        }

        val svg = generateLanguagesSvg(langs)
        File(output).writeText(svg)
        echo("Languages SVG generated at $output")
    }
}

private fun generateLanguagesSvg(langs: Map<String, Int>): String {
    val entries = langs.entries.sortedByDescending { it.value }
    val total = entries.sumOf { it.value }.toDouble()
    val barHeight = 24
    val gap = 4
    val barWidth = 400
    val height = entries.size * (barHeight + gap) + 40
    val sb = StringBuilder()
    sb.appendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${barWidth + 20}\" height=\"$height\" viewBox=\"0 0 ${barWidth + 20} $height\">")
    sb.appendLine("<rect width=\"${barWidth + 20}\" height=\"$height\" fill=\"#0d1117\" rx=\"6\"/>")
    sb.appendLine("<text x=\"10\" y=\"20\" fill=\"#c9d1d9\" font-family=\"sans-serif\" font-size=\"13\" font-weight=\"600\">Languages</text>")
    var y = 35
    for ((name, bytes) in entries) {
        val pct = bytes.toDouble() / total * 100
        var w = (barWidth * pct / 100).toInt()
        if (w < 1 && pct > 0) w = 1
        val color = languageColors[name] ?: "#6e7681"
        sb.appendLine("<rect x=\"10\" y=\"$y\" width=\"$w\" height=\"$barHeight\" fill=\"$color\" rx=\"3\"/>")
        sb.appendLine("<text x=\"15\" y=\"${y + 16}\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"11\">$name</text>")
        sb.appendLine("<text x=\"${barWidth + 15}\" y=\"${y + 16}\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"end\">${"%.1f".format(pct)}%</text>")
        y += barHeight + gap
    }
    sb.appendLine("</svg>")
    return sb.toString()
}

class GhLicenseCmd : CliktCommand(name = "license", help = "Fetch a license template from GitHub") {
    private val spdxId: String? by option("--spdx-id", help = "SPDX license identifier")
    private val output: String by option("--output", "-o", help = "Output file path").default("LICENSE")

    override fun run() {
        val result = Requests.get("https://api.github.com/licenses", mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (result.isFailure) {
            echo("error fetching licenses: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val listType = object : TypeToken<List<GhLicense>>() {}.type
        val licenses: List<GhLicense> = try {
            gson.fromJson(result.getOrNull(), listType)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }

        val selectedSpdxId = spdxId ?: promptSelection(licenses.map { it.spdx_id }, "Select a license:")
        val detailUrl = "https://api.github.com/licenses/$selectedSpdxId"
        val detailResult = Requests.get(detailUrl, mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (detailResult.isFailure) {
            echo("error fetching license: ${detailResult.exceptionOrNull()?.message}", err = true)
            return
        }
        val lic: GhLicense = try {
            gson.fromJson(detailResult.getOrNull(), GhLicense::class.java)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }
        File(output).writeText(lic.body)
        echo("Written ${lic.name} (${lic.spdx_id}) to $output")
    }
}

class GhCoc : CliktCommand(name = "coc", help = "Fetch a GitHub Code of Conduct") {
    private val key: String? by option("--key", help = "Code of Conduct key")
    private val output: String by option("--output", "-o", help = "Output file path").default("CODE_OF_CONDUCT")

    override fun run() {
        val result = Requests.get("https://api.github.com/codes_of_conduct", mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (result.isFailure) {
            echo("error fetching codes of conduct: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val listType = object : TypeToken<List<GhCodeOfConduct>>() {}.type
        val codes: List<GhCodeOfConduct> = try {
            gson.fromJson(result.getOrNull(), listType)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }

        val selectedKey = key ?: promptSelection(codes.map { it.key }, "Select a Code of Conduct:")
        val detailUrl = "https://api.github.com/codes_of_conduct/$selectedKey"
        val detailResult = Requests.get(detailUrl, mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (detailResult.isFailure) {
            echo("error fetching code of conduct: ${detailResult.exceptionOrNull()?.message}", err = true)
            return
        }
        val coc: GhCodeOfConduct = try {
            gson.fromJson(detailResult.getOrNull(), GhCodeOfConduct::class.java)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }
        File(output).writeText(coc.body)
        echo("Written ${coc.name} ($selectedKey) to $output")
    }
}

class GhIgnore : CliktCommand(name = "ignore", help = "Fetch a .gitignore template from GitHub") {
    private val name: String? by option("--name", help = "Gitignore template name")
    private val output: String by option("--output", "-o", help = "Output file path").default(".gitignore")

    override fun run() {
        val result = Requests.get("https://api.github.com/gitignore/templates", mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (result.isFailure) {
            echo("error fetching templates: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val listType = object : TypeToken<List<String>>() {}.type
        val templates: List<String> = try {
            gson.fromJson(result.getOrNull(), listType)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }

        val selectedName = name ?: promptSelection(templates, "Select a .gitignore template:")
        val detailUrl = "https://api.github.com/gitignore/templates/$selectedName"
        val detailResult = Requests.get(detailUrl, mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (detailResult.isFailure) {
            echo("error fetching template: ${detailResult.exceptionOrNull()?.message}", err = true)
            return
        }
        val tmpl: GitignoreTemplate = try {
            gson.fromJson(detailResult.getOrNull(), GitignoreTemplate::class.java)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }
        File(output).writeText(tmpl.source)
        echo("Written $selectedName .gitignore template to $output")
    }
}

class GhOg : CliktCommand(name = "og", help = "Generate an Open Graph SVG for a GitHub repository") {
    private val url: String by option("--url", "-u", help = "Repository (owner/repo)").required()
    private val output: String by option("--output", "-o", help = "Output SVG file path").default("og.svg")

    override fun run() {
        val parts = url.split("/")
        if (parts.size != 2) {
            echo("repo must be in format owner/repo (got \"$url\")", err = true)
            return
        }
        val apiUrl = "https://api.github.com/repos/${parts[0]}/${parts[1]}"
        val result = Requests.get(apiUrl, mapOf("Accept" to "application/json", "User-Agent" to "hieudoanm-cli"))
        if (result.isFailure) {
            echo("error fetching repository: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val repo: GhRepo = try {
            gson.fromJson(result.getOrNull(), GhRepo::class.java)
        } catch (e: Exception) {
            echo("error parsing response: ${e.message}", err = true)
            return
        }

        val svg = generateOgSvg(repo)
        File(output).writeText(svg)
        echo("OG SVG generated at $output")
    }
}

private fun generateOgSvg(repo: GhRepo): String {
    val width = 1200
    val height = 630
    var desc = repo.description
    if (desc.length > 120) desc = desc.take(120) + "..."
    if (desc.isEmpty()) desc = "No description"

    val langColor = languageColors[repo.language] ?: "#6e7681"
    val sb = StringBuilder()
    sb.appendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"$width\" height=\"$height\" viewBox=\"0 0 $width $height\">")
    sb.appendLine("<defs>")
    sb.appendLine("<linearGradient id=\"bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">")
    sb.appendLine("<stop offset=\"0%\" stop-color=\"#0d1117\"/>")
    sb.appendLine("<stop offset=\"100%\" stop-color=\"#161b22\"/>")
    sb.appendLine("</linearGradient>")
    sb.appendLine("</defs>")
    sb.appendLine("<rect width=\"$width\" height=\"$height\" fill=\"url(#bg)\" rx=\"12\"/>")

    if (repo.owner.avatar_url.isNotEmpty()) {
        sb.appendLine("<image x=\"60\" y=\"60\" width=\"80\" height=\"80\" href=\"${escapeXml(repo.owner.avatar_url)}\" rx=\"40\"/>")
    }
    sb.appendLine("<text x=\"155\" y=\"95\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"18\">${escapeXml(repo.owner.login)}</text>")
    sb.appendLine("<text x=\"60\" y=\"145\" fill=\"#58a6ff\" font-family=\"sans-serif\" font-size=\"36\" font-weight=\"bold\">${escapeXml(repo.name)}</text>")
    sb.appendLine("<text x=\"60\" y=\"195\" fill=\"#c9d1d9\" font-family=\"sans-serif\" font-size=\"20\">${escapeXml(desc)}</text>")

    val statY = 270
    sb.appendLine("<circle cx=\"65\" cy=\"${statY - 6}\" r=\"8\" fill=\"$langColor\"/>")
    sb.appendLine("<text x=\"82\" y=\"$statY\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"18\">${escapeXml(repo.language)}</text>")
    sb.appendLine("<text x=\"200\" y=\"$statY\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"18\">★ ${repo.stargazers_count}</text>")
    sb.appendLine("<text x=\"320\" y=\"$statY\" fill=\"#8b949e\" font-family=\"sans-serif\" font-size=\"18\">⑂ ${repo.forks_count}</text>")
    sb.appendLine("<text x=\"60\" y=\"${height - 30}\" fill=\"#30363d\" font-family=\"sans-serif\" font-size=\"16\">${escapeXml(repo.html_url)}</text>")
    sb.appendLine("</svg>")
    return sb.toString()
}

private fun escapeXml(s: String): String {
    return s
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("'", "&apos;")
        .replace("\"", "&quot;")
}

private fun promptSelection(options: List<String>, message: String): String {
    println(message)
    options.forEachIndexed { i, opt -> println("  ${i + 1}) $opt") }
    while (true) {
        print("Enter number: ")
        val input = readLine()?.trim() ?: continue
        val idx = input.toIntOrNull()?.minus(1) ?: continue
        if (idx in options.indices) return options[idx]
        System.err.println("Invalid selection")
    }
}
