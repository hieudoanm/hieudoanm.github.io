import Foundation

struct ChatMessage: Codable {
    let role: String
    let content: String
}

struct ChatConfig {
    var apiKey: String
    var model: String
    var temperature: Double
    var maxTokens: Int

    static let `default` = ChatConfig(
        apiKey: ProcessInfo.processInfo.environment["OPENROUTER_API_KEY"] ?? "",
        model: "openai/gpt-4o-mini",
        temperature: 0.7,
        maxTokens: 4096
    )
}

actor ChatEngine {
    private var messages: [ChatMessage] = []
    private let config: ChatConfig

    init(config: ChatConfig = .default) {
        self.config = config
        self.messages = [ChatMessage(role: "system", content: "You are hieudoanm, a helpful CLI assistant.")]
    }

    func send(_ message: String) async throws -> String {
        messages.append(ChatMessage(role: "user", content: message))

        let body: [String: Any] = [
            "model": config.model,
            "messages": messages.map { ["role": $0.role, "content": $0.content] },
            "temperature": config.temperature,
            "max_tokens": config.maxTokens,
        ]

        let jsonData = try JSONSerialization.data(withJSONObject: body)
        let response = try await Requests.fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            method: .post,
            headers: [
                "Authorization": "Bearer \(config.apiKey)",
                "Content-Type": "application/json",
            ],
            body: jsonData
        )

        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
        if let choices = json?["choices"] as? [[String: Any]],
           let first = choices.first,
           let message = first["message"] as? [String: Any],
           let content = message["content"] as? String {
            messages.append(ChatMessage(role: "assistant", content: content))
            return content
        }
        throw RequestError(message: "No response from OpenRouter", statusCode: response.statusCode)
    }

    func clear() {
        messages = [ChatMessage(role: "system", content: "You are hieudoanm, a helpful CLI assistant.")]
    }
}
