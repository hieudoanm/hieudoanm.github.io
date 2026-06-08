import Foundation

enum OpenRouterConfig {
    static func loadAPIKey() -> String? {
        if let key = ProcessInfo.processInfo.environment["OPENROUTER_API_KEY"], !key.isEmpty {
            return key
        }
        let configPath = FileManager.default.homeDirectoryForCurrentUser.appendingPathComponent(".hieudoanm")
        if let data = try? Data(contentsOf: configPath),
           let config = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let key = config["openrouter_api_key"] as? String, !key.isEmpty {
            return key
        }
        return nil
    }
}
