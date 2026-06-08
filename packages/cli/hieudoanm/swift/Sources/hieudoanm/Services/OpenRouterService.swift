import Foundation

struct OpenRouterModel: Codable {
    let id: String
    let name: String?
    let pricing: PricingInfo?
    let contextLength: Int?
    let architecture: ArchitectureInfo?

    struct PricingInfo: Codable {
        let prompt: String?
        let completion: String?
    }

    struct ArchitectureInfo: Codable {
        let modality: String?
        let tokenizer: String?
        let instructType: String?
    }
}

struct ProbeResult {
    let model: String
    let status: ProbeStatus
    let latency: TimeInterval?
}

enum ProbeStatus: String, Codable {
    case ok, rateLimited, restricted, error
}

func fetchFreeModels() async throws -> [OpenRouterModel] {
    let data = try await requestsFetch(method: "GET", url: "https://openrouter.ai/api/v1/models")
    let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
    let modelsData = try JSONSerialization.data(withJSONObject: json?["data"] ?? [])
    let allModels = try JSONDecoder().decode([OpenRouterModel].self, from: modelsData)
    return allModels.filter { model in
        guard let pricing = model.pricing else { return false }
        let prompt = Double(pricing.prompt ?? "0") ?? 0
        let completion = Double(pricing.completion ?? "0") ?? 0
        return prompt == 0 && completion == 0
    }
}

func resolveModel(_ query: String, models: [OpenRouterModel]) -> OpenRouterModel? {
    let lower = query.lowercased()
    if let exact = models.first(where: { $0.id.lowercased() == lower }) { return exact }
    let matching = models.filter { $0.id.lowercased().contains(lower) }
    return matching.min(by: { $0.id.count < $1.id.count })
}

func probeModel(_ modelID: String) async -> ProbeResult {
    guard let apiKey = OpenRouterConfig.loadAPIKey() else {
        return ProbeResult(model: modelID, status: .error, latency: nil)
    }
    let start = Date()
    do {
        var options = RequestsOptions()
        options.headers["Authorization"] = "Bearer \(apiKey)"
        options.headers["Content-Type"] = "application/json"
        let body: [String: Any] = [
            "model": modelID,
            "messages": [["role": "user", "content": "ping"]],
            "max_tokens": 1,
        ]
        options.body = try JSONSerialization.data(withJSONObject: body)
        options.timeout = 15

        _ = try await requestsFetch(method: "POST", url: "https://openrouter.ai/api/v1/chat/completions", options: options)
        return ProbeResult(model: modelID, status: .ok, latency: Date().timeIntervalSince(start))
    } catch {
        let latency = Date().timeIntervalSince(start)
        let errStr = "\(error)"
        if errStr.contains("429") {
            return ProbeResult(model: modelID, status: .rateLimited, latency: latency)
        }
        if errStr.contains("403") {
            return ProbeResult(model: modelID, status: .restricted, latency: latency)
        }
        return ProbeResult(model: modelID, status: .error, latency: latency)
    }
}
