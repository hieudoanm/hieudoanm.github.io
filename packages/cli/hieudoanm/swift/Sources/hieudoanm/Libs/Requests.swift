import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif


struct RequestsOptions {
    var headers: [String: String] = [:]
    var query: [String: String] = [:]
    var body: Data?
    var debug = false
    var timeout: TimeInterval = 30
    var retries = 3
}

func requestsFetch(
    method: String,
    url: String,
    options: RequestsOptions = RequestsOptions()
) async throws -> Data {
    var lastError: Error?

    for attempt in 0...options.retries {
        do {
            return try await performRequest(method: method, url: url, options: options)
        } catch {
            lastError = error
            if attempt < options.retries {
                let delay = pow(2.0, Double(attempt))
                if options.debug {
                    print("\(yellow(""))Request failed (attempt \(attempt + 1)/\(options.retries + 1)), retrying in \(Int(delay))s...\(yellow(""))")
                }
                try await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
            }
        }
    }

    throw lastError ?? RequestsError.failed
}

private func performRequest(
    method: String,
    url: String,
    options: RequestsOptions
) async throws -> Data {
    guard var components = URLComponents(string: url) else {
        throw RequestsError.invalidURL
    }

    if !options.query.isEmpty {
        components.queryItems = options.query.map { URLQueryItem(name: $0.key, value: $0.value) }
    }

    guard let finalURL = components.url else {
        throw RequestsError.invalidURL
    }

    var request = URLRequest(url: finalURL)
    request.httpMethod = method
    request.httpBody = options.body
    request.timeoutInterval = options.timeout

    for (key, value) in options.headers {
        request.setValue(value, forHTTPHeaderField: key)
    }

    if options.debug {
        print("\(blue(""))===== HTTP Request Debug =====\(blue(""))")
        print("Method: \(method)")
        print("URL: \(finalURL.absoluteString)")
        print("Headers: \(options.headers)")
    }

    let (data, response) = try await URLSession.shared.data(for: request)

    guard let httpResponse = response as? HTTPURLResponse else {
        throw RequestsError.invalidResponse
    }

    let status = httpResponse.statusCode

    if options.debug {
        let statusColor: (String) -> String = status >= 500 ? red : (status >= 400 ? yellow : green)
        print("Status: \(statusColor("\(status)"))")
        print("Body: \(String(data: data, encoding: .utf8) ?? "<binary>")")
        print("\(blue(""))===============================\(blue(""))")
    }

    if status >= 500 {
        throw RequestsError.serverError(status)
    }

    return data
}

enum RequestsError: LocalizedError {
    case invalidURL
    case invalidResponse
    case serverError(Int)
    case failed

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "invalid URL"
        case .invalidResponse: return "invalid response"
        case .serverError(let code): return "server error: \(code)"
        case .failed: return "request failed"
        }
    }
}
