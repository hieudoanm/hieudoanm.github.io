package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.default
import io.github.hieudoanm.cli.services.Requests

class TelegramCommand : CliktCommand(name = "telegram", help = "Telegram bot and message tools") {
    init {
        subcommands(TelegramMessage(), TelegramWebhook())
    }
    override fun run() = Unit
}

class TelegramMessage : CliktCommand(name = "message", help = "Send Telegram messages") {
    init {
        subcommands(TelegramMessageSend())
    }
    override fun run() = Unit
}

class TelegramMessageSend : CliktCommand(name = "send", help = "Send a Telegram message") {
    override fun run() {
        echo("Telegram Token: ")
        val token = readLine() ?: ""
        echo("Telegram Chat ID: ")
        val chatId = readLine() ?: ""
        echo("Telegram Message: ")
        val message = readLine() ?: ""
        val url = "https://api.telegram.org/bot${token}/sendMessage"
        val body = """{"chat_id":"$chatId","text":"$message"}"""
        val result = Requests.post(url, body)
        result.onSuccess { echo("Success") }
            .onFailure { echo("Error: ${it.message}") }
    }
}

class TelegramWebhook : CliktCommand(name = "webhook", help = "Manage Telegram webhooks") {
    init {
        subcommands(TelegramWebhookSet(), TelegramWebhookInfo(), TelegramWebhookDelete())
    }
    override fun run() = Unit
}

class TelegramWebhookSet : CliktCommand(name = "set", help = "Set a Telegram webhook URL") {
    override fun run() {
        echo("Telegram Token: ")
        val token = readLine() ?: ""
        echo("Telegram Webhook: ")
        val webhook = readLine() ?: ""
        val url = "https://api.telegram.org/bot${token}/setWebhook"
        val body = """{"url":"$webhook"}"""
        val result = Requests.post(url, body)
        result.onSuccess { echo("Success") }
            .onFailure { echo("Error: ${it.message}") }
    }
}

class TelegramWebhookInfo : CliktCommand(name = "info", help = "Get current webhook info") {
    override fun run() {
        echo("Telegram Token: ")
        val token = readLine() ?: ""
        val url = "https://api.telegram.org/bot${token}/getWebhookInfo"
        val result = Requests.post(url, "{}")
        result.onSuccess { echo("Success") }
            .onFailure { echo("Error: ${it.message}") }
    }
}

class TelegramWebhookDelete : CliktCommand(name = "delete", help = "Delete the Telegram webhook") {
    override fun run() {
        echo("Telegram Token: ")
        val token = readLine() ?: ""
        val url = "https://api.telegram.org/bot${token}/deleteWebhook"
        val result = Requests.post(url, "{}")
        result.onSuccess { echo("Success") }
            .onFailure { echo("Error: ${it.message}") }
    }
}
