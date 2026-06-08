import Foundation

struct TelegramBot {
    let token: String

    func sendMessage(chatID: String, text: String) async throws {
        let url = "https://api.telegram.org/bot\(token)/sendMessage"
        var options = RequestsOptions()
        options.headers["Content-Type"] = "application/json"
        let body: [String: Any] = ["chat_id": chatID, "text": text]
        options.body = try JSONSerialization.data(withJSONObject: body)
        _ = try await requestsFetch(method: "POST", url: url, options: options)
    }

    func setWebhook(url: String) async throws {
        let apiURL = "https://api.telegram.org/bot\(token)/setWebhook"
        var options = RequestsOptions()
        options.headers["Content-Type"] = "application/json"
        let body: [String: Any] = ["url": url]
        options.body = try JSONSerialization.data(withJSONObject: body)
        _ = try await requestsFetch(method: "POST", url: apiURL, options: options)
    }

    func getWebhookInfo() async throws -> [String: Any] {
        let url = "https://api.telegram.org/bot\(token)/getWebhookInfo"
        let data = try await requestsFetch(method: "GET", url: url)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        return json?["result"] as? [String: Any] ?? [:]
    }

    func deleteWebhook() async throws {
        let url = "https://api.telegram.org/bot\(token)/deleteWebhook"
        _ = try await requestsFetch(method: "GET", url: url)
    }
}
