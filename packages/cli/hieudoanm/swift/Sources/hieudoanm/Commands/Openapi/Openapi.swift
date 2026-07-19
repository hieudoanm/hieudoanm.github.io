import Foundation
import ArgumentParser

struct OpenapiCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "openapi",
        abstract: "OpenAPI tools",
        subcommands: [OpenapiPostman.self, OpenapiValidate.self]
    )

    mutating func run() {}
}

struct OpenapiPostman: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "postman",
        abstract: "Convert OpenAPI spec to Postman v2.1 collection"
    )

    @Argument(help: "OpenAPI spec file (JSON)")
    var file: String

    @Option(name: .shortAndLong, help: "Output file")
    var output: String = "collection.json"

    mutating func run() {
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: file)),
              let spec = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            print("Error: could not parse OpenAPI spec")
            return
        }

        let info = spec["info"] as? [String: Any] ?? [:]
        let servers = spec["servers"] as? [[String: Any]] ?? []
        let baseURL = (servers.first?["url"] as? String) ?? "http://localhost"
        let paths = spec["paths"] as? [String: Any] ?? [:]

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
                        "header": parseParameters(op, inType: "header"),
                        "url": [
                            "raw": "\(baseURL)\(path)",
                            "host": [baseURL.trimmingCharacters(in: CharacterSet(charactersIn: "/"))],
                            "path": path.split(separator: "/").filter { !$0.isEmpty }.map(String.init),
                            "query": parseParameters(op, inType: "query"),
                        ],
                    ] as [String: Any],
                ]

                if let body = op["requestBody"] as? [String: Any],
                   let content = body["content"] as? [String: Any],
                   let jsonContent = content["application/json"] as? [String: Any] {
                    var request = item["request"] as? [String: Any] ?? [:]
                    let rawBody: String
                    if let example = jsonContent["example"] {
                        rawBody = (try? JSONSerialization.data(withJSONObject: example, options: .prettyPrinted)).flatMap { String(data: $0, encoding: .utf8) } ?? ""
                    } else if let schema = jsonContent["schema"] as? [String: Any] {
                        rawBody = (try? JSONSerialization.data(withJSONObject: schema, options: .prettyPrinted)).flatMap { String(data: $0, encoding: .utf8) } ?? ""
                    } else {
                        rawBody = ""
                    }
                    request["body"] = ["mode": "raw", "raw": rawBody] as [String: Any]
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

    private func parseParameters(_ op: [String: Any], inType: String) -> [[String: Any]] {
        guard let params = op["parameters"] as? [[String: Any]] else { return [] }
        return params.compactMap { p in
            guard p["in"] as? String == inType else { return nil }
            return [
                "key": p["name"] as? String ?? "",
                "value": (p["schema"] as? [String: Any])?["default"] as? String ?? "",
                "type": "text",
            ]
        }
    }
}

struct OpenapiValidate: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "validate",
        abstract: "Validate OpenAPI spec"
    )

    @Argument(help: "OpenAPI spec file (JSON)")
    var file: String

    mutating func run() {
        guard let data = try? Data(contentsOf: URL(fileURLWithPath: file)),
              let spec = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            print("Error: could not parse OpenAPI spec")
            return
        }

        var errors: [String] = []
        var warnings: [String] = []

        if spec["openapi"] == nil {
            errors.append("Missing 'openapi' version field")
        }

        if spec["info"] == nil {
            errors.append("Missing 'info' section")
        } else if let info = spec["info"] as? [String: Any] {
            if info["title"] == nil { warnings.append("Info missing 'title'") }
            if info["version"] == nil { errors.append("Info missing 'version'") }
        }

        guard let paths = spec["paths"] as? [String: Any] else {
            errors.append("Missing or invalid 'paths' section")
            printErrors(errors, warnings: warnings)
            return
        }

        if paths.isEmpty {
            warnings.append("No paths defined")
        }

        for (path, methods) in paths {
            guard let methodMap = methods as? [String: Any] else {
                errors.append("Path '\(path)': value is not an object")
                continue
            }
            let validMethods = ["get", "post", "put", "delete", "patch", "options", "head", "trace"]
            var hasOperation = false
            for (method, details) in methodMap {
                guard validMethods.contains(method.lowercased()) else {
                    warnings.append("Path '\(path)': unknown method '\(method)'")
                    continue
                }
                guard let op = details as? [String: Any] else {
                    errors.append("Path '\(path)': \(method.uppercased()) operation is not an object")
                    continue
                }
                hasOperation = true
                if let operationId = op["operationId"] as? String {
                    if operationId.isEmpty {
                        warnings.append("Path '\(path)': \(method.uppercased()) has empty operationId")
                    }
                } else {
                    warnings.append("Path '\(path)': \(method.uppercased()) missing operationId")
                }
                if let parameters = op["parameters"] as? [[String: Any]] {
                    for (i, param) in parameters.enumerated() {
                        if param["name"] == nil { errors.append("Path '\(path)': \(method.uppercased()) parameter \(i) missing 'name'") }
                        if param["in"] == nil { errors.append("Path '\(path)': \(method.uppercased()) parameter \(i) missing 'in'") }
                    }
                }
                if op["responses"] == nil {
                    errors.append("Path '\(path)': \(method.uppercased()) missing 'responses'")
                }
            }
            if !hasOperation {
                warnings.append("Path '\(path)': no valid HTTP methods")
            }
        }

        printErrors(errors, warnings: warnings)
    }

    private func printErrors(_ errors: [String], warnings: [String]) {
        if errors.isEmpty && warnings.isEmpty {
            print("Valid OpenAPI spec")
            return
        }
        for e in errors { print("\(red("[ERROR]")) \(e)") }
        for w in warnings { print("\(yellow("[WARN]")) \(w)") }
        if !errors.isEmpty {
            print("\n\(red("\(errors.count) error(s)"))")
        }
        if !warnings.isEmpty {
            print("\(yellow("\(warnings.count) warning(s)"))")
        }
    }
}
