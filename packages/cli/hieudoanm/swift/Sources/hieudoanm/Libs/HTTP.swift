import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
    case patch = "PATCH"
}

struct HTTPOptions {
    var headers: [String: String] = [:]
    var query: [String: String] = [:]
    var body: Data?
    var debug = false
    var timeout: TimeInterval = 30
}

func httpRequest(
    method: HTTPMethod,
    url: String,
    options: HTTPOptions = HTTPOptions()
) async throws -> (Data, HTTPURLResponse) {
    guard var components = URLComponents(string: url) else {
        throw HTTPError.invalidURL
    }

    if !options.query.isEmpty {
        components.queryItems = options.query.map { URLQueryItem(name: $0.key, value: $0.value) }
    }

    guard let finalURL = components.url else {
        throw HTTPError.invalidURL
    }

    var request = URLRequest(url: finalURL)
    request.httpMethod = method.rawValue
    request.httpBody = options.body
    request.timeoutInterval = options.timeout

    for (key, value) in options.headers {
        request.setValue(value, forHTTPHeaderField: key)
    }

    if options.debug {
        print("\(blue(""))===== HTTP Request Debug =====\(blue(""))")
        print("Method: \(method.rawValue)")
        print("URL: \(finalURL.absoluteString)")
        print("Headers: \(options.headers)")
        if let body = options.body, let bodyStr = String(data: body, encoding: .utf8) {
            print("Body: \(bodyStr)")
        }
    }

    let (data, response) = try await URLSession.shared.data(for: request)

    guard let httpResponse = response as? HTTPURLResponse else {
        throw HTTPError.invalidResponse
    }

    if options.debug {
        print("\(blue(""))===== HTTP Response Debug =====\(blue(""))")
        print("Status: \(httpResponse.statusCode)")
        print("Headers: \(httpResponse.allHeaderFields)")
        print("Body: \(String(data: data, encoding: .utf8) ?? "<binary>")")
        print("\(blue(""))===============================\(blue(""))")
    }

    return (data, httpResponse)
}

enum HTTPError: LocalizedError {
    case invalidURL
    case invalidResponse
    case statusCode(Int, String)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "invalid URL"
        case .invalidResponse: return "invalid response"
        case .statusCode(let code, let body): return "HTTP \(code): \(body)"
        }
    }
}
