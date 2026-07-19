package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.google.gson.GsonBuilder
import com.google.gson.JsonParser
import io.github.hieudoanm.cli.services.Requests

class GeminiCommand : CliktCommand(name = "gemini", help = "Interact with Google Gemini AI models") {
    init {
        subcommands(GeminiCode())
    }
    override fun run() = Unit
}

class GeminiCode : CliktCommand(name = "code", help = "Gemini-powered AI coding assistant") {
    private val prompt by argument()

    override fun run() {
        val apiKey = System.getenv("GEMINI_API_KEY")
        if (apiKey.isNullOrEmpty()) {
            echo("GEMINI_API_KEY environment variable is not set", err = true)
            return
        }

        val url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=$apiKey"
        val requestBody = """{"contents":[{"parts":[{"text":${GsonBuilder().create().toJson(prompt)}}]}]}"""
        val result = Requests.post(url, requestBody, mapOf("Content-Type" to "application/json"))
        if (result.isFailure) {
            echo("API error: ${result.exceptionOrNull()?.message}", err = true)
            return
        }

        val response = result.getOrNull() ?: return
        val json = JsonParser.parseString(response).asJsonObject
        val candidates = json.getAsJsonArray("candidates")
        if (candidates == null || candidates.size() == 0) {
            echo("No response from Gemini", err = true)
            return
        }
        val text = candidates[0].asJsonObject
            .getAsJsonObject("content")
            .getAsJsonArray("parts")[0].asJsonObject
            .get("text")?.asString ?: ""
        echo(text)
    }
}
