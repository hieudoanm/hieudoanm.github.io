import Foundation
import ArgumentParser

struct TelegramCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "telegram",
        abstract: "Telegram bot tools",
        subcommands: [
            TelegramMessage.self,
            TelegramWebhook.self,
        ]
    )
}

struct TelegramMessage: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "message",
        abstract: "Send messages",
        subcommands: [TelegramMessageSend.self]
    )
}

struct TelegramMessageSend: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "send", abstract: "Send a message via Telegram Bot API")

    @Option(name: .long, help: "Bot token")
    var token: String?

    @Option(name: .long, help: "Chat ID")
    var chatID: String?

    @Argument(help: "Message text")
    var text: String

    mutating func run() async throws {
        let t = token ?? prompt("Bot token: ")
        let c = chatID ?? prompt("Chat ID: ")
        try await telegramSendMessage(token: t, chatID: c, text: text)
        print("Message sent")
    }
}

struct TelegramWebhook: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "webhook",
        abstract: "Manage webhooks",
        subcommands: [TelegramWebhookSet.self, TelegramWebhookInfo.self, TelegramWebhookDelete.self]
    )
}

struct TelegramWebhookSet: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "set", abstract: "Set webhook")

    @Option(name: .long, help: "Bot token")
    var token: String?

    @Option(name: .long, help: "Webhook URL")
    var url: String?

    mutating func run() async throws {
        let t = token ?? prompt("Bot token: ")
        let u = url ?? prompt("Webhook URL: ")
        try await telegramSetWebhook(token: t, url: u)
        print("Webhook set")
    }
}

struct TelegramWebhookInfo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "info", abstract: "Get webhook info")

    @Option(name: .long, help: "Bot token")
    var token: String?

    mutating func run() async throws {
        let t = token ?? prompt("Bot token: ")
        let info = try await telegramGetWebhookInfo(token: t)
        print(info)
    }
}

struct TelegramWebhookDelete: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "delete", abstract: "Delete webhook")

    @Option(name: .long, help: "Bot token")
    var token: String?

    mutating func run() async throws {
        let t = token ?? prompt("Bot token: ")
        try await telegramDeleteWebhook(token: t)
        print("Webhook deleted")
    }
}

private func prompt(_ msg: String) -> String {
    print(msg, terminator: "")
    return readLine() ?? ""
}

private func telegramSendMessage(token: String, chatID: String, text: String) async throws {
    let url = "https://api.telegram.org/bot\(token)/sendMessage"
    let body: [String: Any] = ["chat_id": chatID, "text": text]
    let data = try JSONSerialization.data(withJSONObject: body)
    let resp = try await Requests.fetch(url, method: .post, headers: ["Content-Type": "application/json"], body: data)
    if resp.statusCode != 200 {
        throw RequestError(message: "Telegram API error", statusCode: resp.statusCode)
    }
}

private func telegramSetWebhook(token: String, url: String) async throws {
    let apiURL = "https://api.telegram.org/bot\(token)/setWebhook"
    let body: [String: Any] = ["url": url]
    let data = try JSONSerialization.data(withJSONObject: body)
    let resp = try await Requests.fetch(apiURL, method: .post, headers: ["Content-Type": "application/json"], body: data)
    if resp.statusCode != 200 {
        throw RequestError(message: "Telegram API error", statusCode: resp.statusCode)
    }
}

private func telegramGetWebhookInfo(token: String) async throws -> String {
    let url = "https://api.telegram.org/bot\(token)/getWebhookInfo"
    let resp = try await Requests.fetch(url)
    let json = try JSONSerialization.jsonObject(with: resp.data) as? [String: Any]
    let result = json?["result"] as? [String: Any] ?? [:]
    let data = try JSONSerialization.data(withJSONObject: result, options: .prettyPrinted)
    return String(data: data, encoding: .utf8) ?? "{}"
}

private func telegramDeleteWebhook(token: String) async throws {
    let url = "https://api.telegram.org/bot\(token)/deleteWebhook"
    let resp = try await Requests.fetch(url)
    if resp.statusCode != 200 {
        throw RequestError(message: "Telegram API error", statusCode: resp.statusCode)
    }
}
