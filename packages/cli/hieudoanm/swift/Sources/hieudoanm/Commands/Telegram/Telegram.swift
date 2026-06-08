import Foundation
import ArgumentParser

struct Telegram: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "telegram",
        abstract: "Telegram bot tools",
        subcommands: [
            TelegramMessage.self,
            TelegramWebhook.self,
        ]
    )

    mutating func run() {}
}

struct TelegramMessage: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "message",
        abstract: "Send messages",
        subcommands: [TelegramMessageSend.self]
    )

    mutating func run() {}
}

struct TelegramMessageSend: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "send", abstract: "Send a message")

    @Option(name: .long, help: "Bot token")
    var token: String?

    @Option(name: .long, help: "Chat ID")
    var chatID: String?

    @Argument(help: "Message text")
    var text: String

    mutating func run() async throws {
        let token = token ?? prompt("Bot token: ")
        let chatID = chatID ?? prompt("Chat ID: ")

        let bot = TelegramBot(token: token)
        try await bot.sendMessage(chatID: chatID, text: text)
        print("Message sent")
    }
}

struct TelegramWebhook: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "webhook",
        abstract: "Manage webhooks",
        subcommands: [TelegramWebhookSet.self, TelegramWebhookInfo.self, TelegramWebhookDelete.self]
    )

    mutating func run() {}
}

struct TelegramWebhookSet: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "set", abstract: "Set webhook")

    @Option(name: .long, help: "Bot token")
    var token: String?

    @Option(name: .long, help: "Webhook URL")
    var url: String?

    mutating func run() async throws {
        let token = token ?? prompt("Bot token: ")
        let url = url ?? prompt("Webhook URL: ")

        let bot = TelegramBot(token: token)
        try await bot.setWebhook(url: url)
        print("Webhook set")
    }
}

struct TelegramWebhookInfo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "info", abstract: "Get webhook info")

    @Option(name: .long, help: "Bot token")
    var token: String?

    mutating func run() async throws {
        let token = token ?? prompt("Bot token: ")

        let bot = TelegramBot(token: token)
        let info = try await bot.getWebhookInfo()
        print(info)
    }
}

struct TelegramWebhookDelete: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "delete", abstract: "Delete webhook")

    @Option(name: .long, help: "Bot token")
    var token: String?

    mutating func run() async throws {
        let token = token ?? prompt("Bot token: ")

        let bot = TelegramBot(token: token)
        try await bot.deleteWebhook()
        print("Webhook deleted")
    }
}

private func prompt(_ msg: String) -> String {
    print(msg, terminator: "")
    return readLine() ?? ""
}
