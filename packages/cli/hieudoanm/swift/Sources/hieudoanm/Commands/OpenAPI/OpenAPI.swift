import Foundation
import ArgumentParser

struct OpenAPI: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "openapi",
        abstract: "OpenAPI tools",
        subcommands: [OpenAPIPostman.self]
    )

    mutating func run() {}
}

struct OpenAPIPostman: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "postman",
        abstract: "Convert OpenAPI spec to Postman v2.1 collection"
    )

    @Argument(help: "OpenAPI spec file (JSON or YAML)")
    var file: String

    @Option(name: .shortAndLong, help: "Output file (default: collection.json)")
    var output: String = "collection.json"

    mutating func run() {
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: file)),
              let spec = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            print("Error: could not parse OpenAPI spec")
            return
        }

        let paths = spec["paths"] as? [String: Any] ?? [:]
        let info = spec["info"] as? [String: Any] ?? [:]
        let servers = spec["servers"] as? [[String: Any]] ?? []
        let baseURL = (servers.first?["url"] as? String) ?? "http://localhost"

        var items: [[String: Any]] = []

        for (path, methods) in paths.sorted(by: { $0.key < $1.key }) {
            guard let methodMap = methods as? [String: Any] else { continue }
            for (method, details) in methodMap {
                guard let op = details as? [String: Any] else { continue }
                let httpMethod = method.uppercased()
                guard ["GET", "POST", "PUT", "DELETE", "PATCH"].contains(httpMethod) else { continue }

                var item: [String: Any] = [
                    "name": op["summary"] as? String ?? "\(httpMethod) \(path)",
                    "request": [
                        "method": httpMethod,
                        "header": op["parameters"].map { params in
                            guard let params = params as? [[String: Any]] else { return [] }
                            return params.compactMap { p -> [String: Any]? in
                                guard p["in"] as? String == "header" else { return nil }
                                return ["key": p["name"] as? String ?? "", "value": (p["schema"].map { ($0 as? [String: Any])?["default"] as? String } ?? "") as Any, "type": "text"]
                            }
                        } ?? [],
                        "url": [
                            "raw": "\(baseURL)\(path)",
                            "host": [baseURL.trimmingCharacters(in: CharacterSet(charactersIn: "/"))],
                            "path": path.split(separator: "/").filter { !$0.isEmpty }.map(String.init),
                            "query": op["parameters"].map { params in
                                guard let params = params as? [[String: Any]] else { return [] }
                                return params.compactMap { p -> [String: Any]? in
                                    guard p["in"] as? String == "query" else { return nil }
                                    return ["key": p["name"] as? String ?? "", "value": "", "type": "text"]
                                }
                            } ?? [],
                        ],
                    ] as [String: Any],
                ]

                if let body = op["requestBody"] as? [String: Any],
                   let content = body["content"] as? [String: Any],
                   let jsonContent = content["application/json"] as? [String: Any],
                   let schema = jsonContent["schema"] as? [String: Any] {
                    let bodyMap: [String: Any] = [
                        "mode": "raw",
                        "raw": (try? JSONSerialization.data(withJSONObject: schema, options: .prettyPrinted)).flatMap { String(data: $0, encoding: .utf8) } ?? "",
                    ]
                    var request = item["request"] as? [String: Any] ?? [:]
                    request["body"] = bodyMap
                    item["request"] = request
                }

                items.append(item)
            }
        }

        let collection: [String: Any] = [
            "info": [
                "name": info["title"] as? String ?? "API Collection",
                "description": info["description"] as? String ?? "",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
                "_exporter_id": "hieudoanm",
            ],
            "item": items,
        ]

        if let outputData = try? JSONSerialization.data(withJSONObject: collection, options: .prettyPrinted) {
            try? outputData.write(to: URL(fileURLWithPath: output))
            print("Collection saved to \(output)")
        }
    }
}
