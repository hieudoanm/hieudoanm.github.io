import Foundation

func chatSend(model: String, messages: [[String: String]]) async throws -> String {
    let url = "https://hieudoanm-chat.vercel.app/api/genai"
    var reqOptions = RequestsOptions()
    reqOptions.headers["Content-Type"] = "application/json"
    let body: [String: Any] = ["model": model, "messages": messages]
    reqOptions.body = try JSONSerialization.data(withJSONObject: body)

    let data = try await requestsFetch(method: "POST", url: url, options: reqOptions)
    let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
    return json?["output"] as? String ?? "No response"
}
