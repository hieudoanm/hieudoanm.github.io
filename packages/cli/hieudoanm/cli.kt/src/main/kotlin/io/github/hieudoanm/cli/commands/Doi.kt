package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.google.gson.GsonBuilder
import com.google.gson.JsonParser
import io.github.hieudoanm.cli.services.Requests

class DoiCommand : CliktCommand(name = "doi", help = "DOI productivity tools") {
    init {
        subcommands(DoiCite(), DoiFetch(), DoiRef(), DoiValidate())
    }
    override fun run() = Unit
}

class DoiCite : CliktCommand(name = "cite", help = "Generate an APA citation from a DOI") {
    private val doi by argument()
    override fun run() {
        val response = fetchCrossref(doi)
        if (response == null) return
        echo(citationText(response))
    }
}

class DoiFetch : CliktCommand(name = "fetch", help = "Fetch raw metadata for a DOI") {
    private val doi by argument()
    override fun run() {
        val response = fetchCrossref(doi)
        if (response != null) {
            val g = GsonBuilder().setPrettyPrinting().create()
            echo(g.toJson(JsonParser.parseString(response)))
        }
    }
}

class DoiRef : CliktCommand(name = "ref", help = "Generate a formatted reference from a DOI") {
    private val doi by argument()
    override fun run() {
        val response = fetchCrossref(doi)
        if (response == null) return
        echo(referenceText(response))
    }
}

class DoiValidate : CliktCommand(name = "validate", help = "Validate a DOI string format") {
    private val doi by argument()
    override fun run() {
        val matched = Regex("^10\\.\\d{4,}/.+$").matches(doi)
        if (matched) {
            echo("\u2713 $doi is a valid DOI")
        } else {
            echo("\u2717 $doi is not a valid DOI format")
        }
    }
}

private fun fetchCrossref(doi: String): String? {
    val url = "https://api.crossref.org/works/$doi"
    val result = Requests.get(url)
    if (result.isFailure) {
        return null
    }
    return result.getOrNull()
}

private fun citationText(response: String): String {
    val root = JsonParser.parseString(response).asJsonObject
    val message = root.getAsJsonObject("message")

    val authors = message.getAsJsonArray("author")?.map { it.asJsonObject } ?: emptyList()
    val year = try {
        message.getAsJsonObject("published-print")
            ?.getAsJsonArray("date-parts")
            ?.get(0)?.asJsonArray?.get(0)?.asInt?.toString() ?: "n.d."
    } catch (e: Exception) { "n.d." }

    val citation = when {
        authors.isEmpty() -> "(Unknown, $year)"
        authors.size == 1 -> "(${authors[0].get("family")?.asString}, $year)"
        authors.size == 2 -> "(${authors[0].get("family")?.asString} & ${authors[1].get("family")?.asString}, $year)"
        else -> "(${authors[0].get("family")?.asString} et al., $year)"
    }
    return "Cite:\n$citation"
}

private fun referenceText(response: String): String {
    val root = JsonParser.parseString(response).asJsonObject
    val message = root.getAsJsonObject("message")
    val authors = message.getAsJsonArray("author")?.map { it.asJsonObject } ?: emptyList()

    val authorsAPA = authors.mapIndexed { i, a ->
        val given = a.get("given")?.asString ?: ""
        val family = a.get("family")?.asString ?: ""
        val initial = if (given.isNotEmpty()) "${given.first()}." else ""
        when {
            i == 0 -> "$family, $initial"
            i == authors.size - 1 -> " & $family, $initial"
            else -> ", $family, $initial"
        }
    }.joinToString("")

    val year = try {
        message.getAsJsonObject("published-print")
            ?.getAsJsonArray("date-parts")
            ?.get(0)?.asJsonArray?.get(0)?.asInt?.toString() ?: "n.d."
    } catch (e: Exception) { "n.d." }

    val title = message.getAsJsonArray("title")?.get(0)?.asString ?: ""
    val journal = message.getAsJsonArray("container-title")?.get(0)?.asString ?: ""
    val volume = message.get("volume")?.asString ?: ""
    val issue = message.get("issue")?.asString ?: ""
    val pages = message.get("page")?.asString ?: ""

    val apa = "$authorsAPA ($year). $title. $journal, $volume($issue), $pages."
    return "APA:\n$apa"
}
