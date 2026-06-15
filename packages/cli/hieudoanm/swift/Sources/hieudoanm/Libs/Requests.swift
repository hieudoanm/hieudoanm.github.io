import Foundation

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}

struct RequestError: Error, CustomStringConvertible {
    let message: String
    let statusCode: Int?

    var description: String {
        if let code = statusCode {
            return "HTTP \(code): \(message)"
        }
        return message
    }
}

struct HTTPResponse {
    let data: Data
    let statusCode: Int
    let headers: [String: String]
}

struct Requests {
    static let defaultTimeout: TimeInterval = 30
    static let userAgent = "hieudoanm/1.0"

    static func fetch(
        _ url: String,
        method: HTTPMethod = .get,
        headers: [String: String] = [:],
        body: Data? = nil,
        timeout: TimeInterval = defaultTimeout
    ) async throws -> HTTPResponse {
        guard let requestURL = URL(string: url) else {
            throw RequestError(message: "Invalid URL: \(url)", statusCode: nil)
        }

        var request = URLRequest(url: requestURL)
        request.httpMethod = method.rawValue
        request.timeoutInterval = timeout
        request.setValue(userAgent, forHTTPHeaderField: "User-Agent")

        for (key, value) in headers {
            request.setValue(value, forHTTPHeaderField: key)
        }

        if let body = body {
            request.httpBody = body
            if headers["Content-Type"] == nil {
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            }
        }

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw RequestError(message: "Invalid response", statusCode: nil)
        }

        var responseHeaders: [String: String] = [:]
        for (key, value) in httpResponse.allHeaderFields {
            responseHeaders["\(key)"] = "\(value)"
        }

        return HTTPResponse(
            data: data,
            statusCode: httpResponse.statusCode,
            headers: responseHeaders
        )
    }

    static func fetchJSON<T: Decodable>(
        _ url: String,
        method: HTTPMethod = .get,
        headers: [String: String] = [:],
        body: Data? = nil,
        timeout: TimeInterval = defaultTimeout
    ) async throws -> T {
        let response = try await fetch(url, method: method, headers: headers, body: body, timeout: timeout)
        return try JSONDecoder().decode(T.self, from: response.data)
    }

    static func fetchString(
        _ url: String,
        method: HTTPMethod = .get,
        headers: [String: String] = [:],
        body: Data? = nil,
        timeout: TimeInterval = defaultTimeout
    ) async throws -> String {
        let response = try await fetch(url, method: method, headers: headers, body: body, timeout: timeout)
        guard let string = String(data: response.data, encoding: .utf8) else {
            throw RequestError(message: "Invalid UTF-8 response", statusCode: nil)
        }
        return string
    }

    static func buildURL(_ base: String, query: [String: String]) -> String {
        guard var components = URLComponents(string: base) else { return base }
        var queryItems = components.queryItems ?? []
        for (key, value) in query {
            queryItems.append(URLQueryItem(name: key, value: value))
        }
        components.queryItems = queryItems.isEmpty ? nil : queryItems
        return components.url?.absoluteString ?? base
    }
}
