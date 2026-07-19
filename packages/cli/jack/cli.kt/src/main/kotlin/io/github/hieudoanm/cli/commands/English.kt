package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.required
import com.google.gson.GsonBuilder
import io.github.hieudoanm.cli.services.Requests

class EnglishCommand : CliktCommand(name = "english", help = "English dictionary tools") {
    init {
        subcommands(EnglishDefine())
    }
    override fun run() = Unit
}

data class EnglishResult(
    val definition: String = "",
    val partOfSpeech: String = "",
    val synonyms: List<String> = emptyList(),
    val anonyms: List<String> = emptyList(),
    val usageOf: List<String> = emptyList(),
    val typeOf: List<String> = emptyList()
)

data class EnglishWord(
    val word: String = "",
    val results: List<EnglishResult> = emptyList()
)

class EnglishDefine : CliktCommand(name = "define", help = "Look up the definition of an English word") {
    private val word: String by option("--word", "-w", help = "Word to define").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val w = word.trim().lowercase()
        if (w.isEmpty()) {
            echo("word cannot be empty", err = true)
            return
        }
        val url = "https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/packages/data/english/words/$w.json"
        val result = Requests.get(url)
        if (result.isFailure) {
            echo("fetch error: ${result.exceptionOrNull()?.message}", err = true)
            return
        }
        val gson = GsonBuilder().setPrettyPrinting().create()
        val data = try {
            gson.fromJson(result.getOrNull(), EnglishWord::class.java)
        } catch (e: Exception) {
            echo("json error: ${e.message}", err = true)
            return
        }

        if (jsonOutput) {
            echo(gson.toJson(data))
            return
        }

        echo("\nWORD: ${data.word}\n")
        data.results.forEachIndexed { i, r ->
            echo("${i + 1}) ${r.partOfSpeech}")
            echo("   Definition: ${r.definition}")
            if (r.synonyms.isNotEmpty()) {
                echo("   Synonyms: ${r.synonyms.joinToString(", ")}")
            }
            if (r.anonyms.isNotEmpty()) {
                echo("   Antonyms: ${r.anonyms.joinToString(", ")}")
            }
            echo()
        }
    }
}
