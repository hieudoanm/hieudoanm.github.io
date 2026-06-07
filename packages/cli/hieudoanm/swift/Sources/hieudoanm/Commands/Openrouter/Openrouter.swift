import Foundation
import ArgumentParser

struct OpenrouterCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "openrouter",
        abstract: "OpenRouter AI tools",
        subcommands: [
            OpenrouterServe.self, OpenrouterStatus.self,
            OpenrouterModels.self, OpenrouterHook.self, OpenrouterCode.self,
        ]
    )

    mutating func run() {}
}

struct OpenrouterModels: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "models", abstract: "List free OpenRouter models")

    @Option(name: .long, help: "Search filter")
    var search: String?

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() async throws {
        let models = try await fetchOpenRouterModels()

        let freeModels = models.filter { model in
            guard let pricing = model["pricing"] as? [String: String] else { return false }
            let prompt = Double(pricing["prompt"] ?? "0") ?? 0
            let completion = Double(pricing["completion"] ?? "0") ?? 0
            return prompt == 0 && completion == 0
        }

        var filtered = freeModels
        if let search = search {
            let lower = search.lowercased()
            filtered = freeModels.filter {
                ($0["id"] as? String)?.lowercased().contains(lower) ?? false ||
                ($0["name"] as? String)?.lowercased().contains(lower) ?? false
            }
        }

        if json {
            let data = try JSONSerialization.data(withJSONObject: filtered, options: .prettyPrinted)
            print(String(data: data, encoding: .utf8) ?? "[]")
        } else {
            let grouped = Dictionary(grouping: filtered) { model -> String in
                let parts = (model["id"] as? String ?? "").split(separator: "/")
                return parts.count > 1 ? String(parts[0]) : "other"
            }
            for provider in grouped.keys.sorted() {
                print("\n\(green(provider)):")
                for model in grouped[provider]!.sorted(by: { ($0["id"] as? String ?? "") < ($1["id"] as? String ?? "") }) {
                    let id = model["id"] as? String ?? ""
                    let name = model["name"] as? String ?? ""
                    print("  \(id)\(name.isEmpty ? "" : " (\(name))")")
                }
            }
        }
    }
}

private func loadOpenRouterKey() -> String? {
    if let key = ProcessInfo.processInfo.environment["OPENROUTER_API_KEY"] { return key }
    let configPath = FileManager.default.homeDirectoryForCurrentUser.appendingPathComponent(".hieudoanm/config.json").path
    if let data = try? Data(contentsOf: URL(fileURLWithPath: configPath)),
       let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
       let key = json["openrouter_api_key"] as? String { return key }
    if let data = try? Data(contentsOf: URL(fileURLWithPath: "\(FileManager.default.homeDirectoryForCurrentUser.path).fr")),
       let key = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines), !key.isEmpty {
        return key
    }
    return nil
}

struct OpenrouterStatus: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "status", abstract: "Check OpenRouter API health")

    mutating func run() async throws {
        let apiKey = loadOpenRouterKey()
        var headers: [String: String] = [:]
        if let key = apiKey { headers["Authorization"] = "Bearer \(key)" }

        do {
            let resp = try await Requests.fetch("https://openrouter.ai/api/v1/auth/key", headers: headers)
            if resp.statusCode == 200 {
                print("\(green("✓")) OpenRouter API is \(green("healthy"))")
                if let json = try? JSONSerialization.jsonObject(with: resp.data) as? [String: Any] {
                    if let data = json["data"] as? [String: Any] {
                        if let label = data["label"] as? String { print("  Key: \(label)") }
                        if let usage = data["usage"] as? [String: Any] {
                            let limit = usage["limit"] as? Int ?? 0
                            let used = usage["used"] as? Int ?? 0
                            let remaining = limit - used
                            print("  Usage: \(used) / \(limit) (remaining: \(remaining))")
                        }
                    }
                }
            } else {
                print("\(red("✗")) OpenRouter API returned status \(resp.statusCode)")
                let body = String(data: resp.data, encoding: .utf8) ?? ""
                print(body)
            }
        } catch {
            print("\(red("✗")) OpenRouter API is \(red("unreachable")): \(error)")
        }

        let models = try await fetchOpenRouterModels()
        print("\nTotal models available: \(models.count)")
    }
}

struct OpenrouterCode: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "code", abstract: "AI coding assistant using OpenRouter")

    @Argument(help: "Coding task description")
    var prompt: String

    @Option(name: .long, help: "Model to use")
    var model: String = "openai/gpt-4o-mini"

    @Option(name: .shortAndLong, help: "Output file (optional)")
    var output: String?

    mutating func run() async throws {
        guard let apiKey = loadOpenRouterKey() else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }

        let systemPrompt = """
        You are an expert coding assistant. Provide concise, production-quality code.
        Include only the implementation without unnecessary explanation unless asked.
        Use best practices and follow language conventions.
        """

        let messages: [[String: String]] = [
            ["role": "system", "content": systemPrompt],
            ["role": "user", "content": prompt],
        ]

        let body: [String: Any] = [
            "model": model,
            "messages": messages,
            "temperature": 0.3,
            "max_tokens": 4096,
        ]

        let jsonData = try JSONSerialization.data(withJSONObject: body)

        let resp = try await Requests.fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            method: .post,
            headers: [
                "Authorization": "Bearer \(apiKey)",
                "Content-Type": "application/json",
            ],
            body: jsonData
        )

        guard let respJSON = try? JSONSerialization.jsonObject(with: resp.data) as? [String: Any],
              let choices = respJSON["choices"] as? [[String: Any]],
              let first = choices.first,
              let message = first["message"] as? [String: Any],
              let content = message["content"] as? String else {
            print("Error: could not parse response")
            if let parsed = try? JSONSerialization.jsonObject(with: resp.data) as? [String: Any],
               let err = parsed["error"] as? [String: Any] {
                print("API error: \(err["message"] as? String ?? "unknown")")
            }
            return
        }

        if let output = output {
            try content.write(to: URL(fileURLWithPath: output), atomically: true, encoding: String.Encoding.utf8)
            print("Output written to \(output)")
        } else {
            print(content)
        }
    }
}

struct OpenrouterServe: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "serve", abstract: "Serve OpenRouter config")

    @Option(name: .long, help: "Port")
    var port: Int = 8080

    mutating func run() async throws {
        guard loadOpenRouterKey() != nil else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }
        print("Serving OpenRouter config on port \(port)")
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/python3")
        process.arguments = ["-m", "http.server", "\(port)"]
        try process.run()
        process.waitUntilExit()
    }
}

struct OpenrouterHook: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hook", abstract: "Webhook management (stub)")

    @Option(name: .long, help: "Webhook URL")
    var url: String?

    @Option(name: .long, help: "Action: register, list, delete")
    var action: String = "list"

    mutating func run() async throws {
        guard loadOpenRouterKey() != nil else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }
        print("Webhook management is a stub in the Swift version.")
        print("Run the Go binary for full webhook + ngrok + Telegram integration.")
    }
}

private func fetchOpenRouterModels() async throws -> [[String: Any]] {
    let resp = try await Requests.fetch("https://openrouter.ai/api/v1/models")
    guard let json = try? JSONSerialization.jsonObject(with: resp.data) as? [String: Any],
          let data = json["data"] as? [[String: Any]] else {
        return []
    }
    return data
}


