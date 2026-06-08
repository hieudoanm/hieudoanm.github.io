import Foundation
import ArgumentParser

struct OpenRouter: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "openrouter",
        abstract: "OpenRouter AI tools",
        subcommands: [
            OpenRouterChat.self, OpenRouterHook.self,
            OpenRouterModels.self, OpenRouterServe.self, OpenRouterStatus.self,
        ]
    )

    mutating func run() {}
}

struct OpenRouterChat: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "chat", abstract: "Interactive LLM chat")

    mutating func run() async throws {
        guard let apiKey = OpenRouterConfig.loadAPIKey() else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }

        let models = try await fetchFreeModels()
        if models.isEmpty {
            print("No free models available")
            return
        }

        print("Available free models:")
        for (i, model) in models.enumerated() {
            print("  [\(i + 1)] \(model.id)")
        }

        print("\nSelect model [1]: ", terminator: "")
        guard let input = readLine(), let idx = Int(input), idx > 0, idx <= models.count else {
            print("Using default model")
            return
        }

        let selectedModel = models[idx - 1]
        print("\nChat with \(selectedModel.id) (type 'exit' to quit)\n")

        var messages: [[String: String]] = [["role": "system", "content": "You are a helpful assistant."]]

        while true {
            print("> ", terminator: "")
            guard let userInput = readLine(), userInput.lowercased() != "exit" else { break }
            messages.append(["role": "user", "content": userInput])

            do {
                var opts = RequestsOptions()
                opts.headers["Authorization"] = "Bearer \(apiKey)"
                opts.headers["Content-Type"] = "application/json"
                let body: [String: Any] = ["model": selectedModel.id, "messages": messages]
                opts.body = try JSONSerialization.data(withJSONObject: body)
                opts.timeout = 60

                let data = try await requestsFetch(method: "POST", url: "https://openrouter.ai/api/v1/chat/completions", options: opts)
                let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                if let choice = (json?["choices"] as? [[String: Any]])?.first,
                   let message = choice["message"] as? [String: Any],
                   let content = message["content"] as? String {
                    print("\n\(content)\n")
                    messages.append(["role": "assistant", "content": content])
                }
            } catch {
                print("Error: \(error)")
            }
        }
    }
}

struct OpenRouterHook: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "hook", abstract: "Webhook server with Telegram integration")

    mutating func run() async throws {
        guard OpenRouterConfig.loadAPIKey() != nil else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }
        print("Webhook server not available in Swift version.")
        print("Run the Go binary for the full webhook + ngrok + Telegram integration.")
    }
}

struct OpenRouterModels: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "models", abstract: "List free OpenRouter models")

    @Option(name: .long, help: "Search filter")
    var search: String?

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() async throws {
        let models = try await fetchFreeModels()
        var filtered = models
        if let search = search {
            let lower = search.lowercased()
            filtered = models.filter { $0.id.lowercased().contains(lower) || ($0.name ?? "").lowercased().contains(lower) }
        }

        if json {
            let encoder = JSONEncoder()
            encoder.outputFormatting = .prettyPrinted
            let data = try encoder.encode(filtered)
            print(String(data: data, encoding: .utf8) ?? "[]")
        } else {
            let grouped = Dictionary(grouping: filtered) { model -> String in
                let parts = model.id.split(separator: "/")
                return parts.count > 1 ? String(parts[0]) : "other"
            }
            for provider in grouped.keys.sorted() {
                print("\n\(green(provider)):")
                for model in grouped[provider]!.sorted(by: { $0.id < $1.id }) {
                    let name = model.name ?? ""
                    print("  \(model.id)\(name.isEmpty ? "" : " (\(name))")")
                }
            }
        }
    }
}

struct OpenRouterServe: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "serve", abstract: "Start HTTP server")

    @Option(name: .long, help: "Port")
    var port: Int = 8080

    mutating func run() async throws {
        guard OpenRouterConfig.loadAPIKey() != nil else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }
        print("Server not available in Swift version.")
        print("Run the Go binary for the HTTP server.")
    }
}

struct OpenRouterStatus: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "status", abstract: "Probe model status")

    @Option(name: .long, help: "Search filter")
    var search: String?

    mutating func run() async throws {
        guard OpenRouterConfig.loadAPIKey() != nil else {
            print("Error: OPENROUTER_API_KEY not set")
            return
        }

        var models = try await fetchFreeModels()
        if let search = search {
            let lower = search.lowercased()
            models = models.filter { $0.id.lowercased().contains(lower) }
        }

        print("Probing \(models.count) models...")

        await withTaskGroup(of: ProbeResult.self) { group in
            for model in models {
                group.addTask {
                    await probeModel(model.id)
                }
            }

            for await result in group {
                let statusChar: String
                let statusColor: (String) -> String
                switch result.status {
                case .ok:
                    statusChar = "✓"
                    statusColor = green
                case .rateLimited:
                    statusChar = "R"
                    statusColor = yellow
                case .restricted:
                    statusChar = "F"
                    statusColor = red
                case .error:
                    statusChar = "✗"
                    statusColor = red
                }
                let latency = result.latency.map { String(format: "%.1fs", $0) } ?? "N/A"
                print("\(statusColor(statusChar)) \(result.model) (\(latency))")
            }
        }
    }
}


