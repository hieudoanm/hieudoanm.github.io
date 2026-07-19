import Foundation
import ArgumentParser

struct GeminiCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "gemini",
        abstract: "Google Gemini AI tools",
        subcommands: [GeminiCode.self]
    )

    mutating func run() {}
}

struct GeminiCode: AsyncParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "code",
        abstract: "Interactive coding assistant using GenAI"
    )

    @Option(name: .shortAndLong, help: "Model to use")
    var model: String = "gemini-2.0-flash"

    @Option(name: .shortAndLong, help: "System prompt")
    var system: String = "You are hieudoanm, a helpful CLI coding assistant. Provide concise, accurate answers with code examples."

    mutating func run() async throws {
        let url = "https://hieudoanm-chat.vercel.app/api/genai"
        var messages: [[String: String]] = [
            ["role": "system", "content": system]
        ]

        let warmUpBody: [String: Any] = ["model": model, "messages": messages + [["role": "user", "content": "Say 'Ready' to confirm."]]]
        let warmUpData = try JSONSerialization.data(withJSONObject: warmUpBody)
        if let warmUpResp = try? await Requests.fetch(url, method: .post, headers: ["Content-Type": "application/json"], body: warmUpData, timeout: 30),
           let json = try? JSONSerialization.jsonObject(with: warmUpResp.data) as? [String: Any],
           let choices = json["choices"] as? [[String: Any]],
           let first = choices.first,
           let message = first["message"] as? [String: Any],
           let content = message["content"] as? String {
            messages.append(["role": "assistant", "content": content])
        }

        print(green("Gemini coding assistant ready (model: \(model))"))
        print(gray("Type 'exit' or 'quit' to end\n"))

        while true {
            print(cyan("> "), terminator: "")
            guard let input = readLine() else { break }
            let trimmed = input.trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.isEmpty { continue }
            if trimmed.lowercased() == "exit" || trimmed.lowercased() == "quit" { break }

            messages.append(["role": "user", "content": trimmed])

            do {
                let body: [String: Any] = ["model": model, "messages": messages]
                let jsonData = try JSONSerialization.data(withJSONObject: body)
                let response = try await Requests.fetch(
                    url, method: .post,
                    headers: ["Content-Type": "application/json"],
                    body: jsonData, timeout: 120
                )

                if let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any],
                   let choices = json["choices"] as? [[String: Any]],
                   let first = choices.first,
                   let message = first["message"] as? [String: Any],
                   let content = message["content"] as? String {
                    print()
                    print(content)
                    print()
                    messages.append(["role": "assistant", "content": content])
                } else {
                    let bodyStr = String(data: response.data, encoding: .utf8) ?? "unknown"
                    print(red("Error: Unexpected response: \(bodyStr)"))
                }
            } catch {
                print(red("Error: \(error.localizedDescription)"))
            }
        }
    }
}
