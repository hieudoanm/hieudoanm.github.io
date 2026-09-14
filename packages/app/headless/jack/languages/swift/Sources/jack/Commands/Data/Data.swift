import Foundation
import ArgumentParser

struct DataCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "data",
        abstract: "Data serialization tools",
        subcommands: [CsvCommand.self, JsonCommand.self, YmlCommand.self]
    )
    mutating func run() {}
}

// MARK: - CSV

struct CsvCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "csv", abstract: "Query and convert CSV files")

    @Argument(help: "CSV file path")
    var file: String

    @Option(name: .shortAndLong, help: "Column name(s) to select (comma-separated)")
    var columns: String?

    @Option(name: .long, help: "Filter expression: column=value")
    var filter: String?

    @Option(name: .shortAndLong, help: "Output format: json, table")
    var format: String = "table"

    mutating func run() throws {
        let content = try String(contentsOf: URL(fileURLWithPath: file), encoding: .utf8)
        let rows = try parseCSV(content)
        guard !rows.isEmpty else { return }

        let selectedCols: [String]?
        if let cols = columns {
            selectedCols = cols.split(separator: ",").map(String.init).map { $0.trimmingCharacters(in: .whitespaces) }
        } else {
            selectedCols = nil
        }

        var filtered = rows
        if let filterExpr = filter {
            let parts = filterExpr.split(separator: "=", maxSplits: 1).map(String.init)
            guard parts.count == 2 else { throw DataError.invalidFilter }
            let col = parts[0].trimmingCharacters(in: .whitespaces)
            let val = parts[1].trimmingCharacters(in: .whitespaces)
            filtered = rows.filter { $0[col, default: ""] == val }
        }

        let headers = selectedCols ?? Array(rows[0].keys)
        switch format {
        case "json":
            let dicts = filtered.map { row -> [String: String] in
                var dict: [String: String] = [:]
                for h in headers { dict[h] = row[h] }
                return dict
            }
            let json = try JSONSerialization.data(withJSONObject: dicts, options: [.prettyPrinted])
            print(String(data: json, encoding: .utf8) ?? "")
        default:
            printTable(headers: headers, rows: filtered)
        }
    }

    private func parseCSV(_ text: String) throws -> [[String: String]] {
        var lines = text.components(separatedBy: .newlines).filter { !$0.trimmingCharacters(in: .whitespaces).isEmpty }
        guard lines.count >= 2 else { throw DataError.invalidCSV }
        let headerLine = lines.removeFirst()
        let headers = Self.parseCSVLine(headerLine).map { $0.trimmingCharacters(in: .whitespaces) }
        return lines.map { line in
            let values = Self.parseCSVLine(line)
            var row: [String: String] = [:]
            for (i, h) in headers.enumerated() {
                if i < values.count {
                    row[h] = values[i].trimmingCharacters(in: .whitespaces)
                }
            }
            return row
        }
    }

    static func parseCSVLine(_ line: String) -> [String] {
        var result: [String] = []
        var current = ""
        var inQuotes = false
        for ch in line {
            if ch == "\"" {
                inQuotes.toggle()
            } else if ch == "," && !inQuotes {
                result.append(current)
                current = ""
            } else {
                current.append(ch)
            }
        }
        result.append(current)
        return result
    }

    private func printTable(headers: [String], rows: [[String: String]]) {
        let colWidths = headers.map { h -> Int in
            let maxVal = rows.map { $0[h, default: ""].count }.max() ?? 0
            return max(h.count, maxVal) + 2
        }
        var headerLine = "|"
        var sepLine = "|"
        for (i, h) in headers.enumerated() {
            headerLine += " \(h.padding(toLength: colWidths[i] - 2, withPad: " ", startingAt: 0)) |"
            sepLine += String(repeating: "-", count: colWidths[i]) + "|"
        }
        print(headerLine)
        print(sepLine)
        for row in rows {
            var line = "|"
            for (i, h) in headers.enumerated() {
                let val = row[h, default: ""]
                line += " \(val.padding(toLength: colWidths[i] - 2, withPad: " ", startingAt: 0)) |"
            }
            print(line)
        }
    }
}

// MARK: - JSON

struct JsonCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "json", abstract: "Query, format, diff, and merge JSON")

    @Argument(help: "JSON file path")
    var file: String

    @Option(name: .shortAndLong, help: "Dot-path query (e.g. .foo.bar[0])")
    var query: String?

    @Flag(name: .long, help: "Pretty-print output")
    var pretty = false

    @Option(name: .long, help: "Second JSON file for diff/merge")
    var with: String?

    @Option(name: .long, help: "Operation: query (default), diff, merge")
    var op: String = "query"

    mutating func run() throws {
        let data = try Data(contentsOf: URL(fileURLWithPath: file))
        let json = try JSONSerialization.jsonObject(with: data)

        switch op {
        case "diff":
            guard let otherFile = with else { throw DataError.missingArgument("--with") }
            let otherData = try Data(contentsOf: URL(fileURLWithPath: otherFile))
            let otherJson = try JSONSerialization.jsonObject(with: otherData)
            let diff = try diffJSON(json, otherJson)
            let out = try JSONSerialization.data(withJSONObject: diff, options: [.prettyPrinted])
            print(String(data: out, encoding: .utf8) ?? "")

        case "merge":
            guard let otherFile = with else { throw DataError.missingArgument("--with") }
            let otherData = try Data(contentsOf: URL(fileURLWithPath: otherFile))
            let otherJson = try JSONSerialization.jsonObject(with: otherData)
            let merged = try mergeJSON(json, otherJson)
            let out = try JSONSerialization.data(withJSONObject: merged, options: pretty ? [.prettyPrinted] : [])
            print(String(data: out, encoding: .utf8) ?? "")

        default:
            var target: Any = json
            if let queryPath = query {
                target = try queryJSON(json, path: queryPath)
            }
            let options: JSONSerialization.WritingOptions = pretty ? [.prettyPrinted] : []
            if JSONSerialization.isValidJSONObject(target) {
                let out = try JSONSerialization.data(withJSONObject: target, options: options)
                print(String(data: out, encoding: .utf8) ?? "")
            } else {
                print("\(target)")
            }
        }
    }

    private func queryJSON(_ json: Any, path: String) throws -> Any {
        var components = path.split(separator: ".").map(String.init)
        if components.first == "" { components = Array(components.dropFirst()) }
        var current = json
        for comp in components {
            if let arrayIndex = tryParseArrayIndex(comp) {
                guard let arr = current as? [Any], arrayIndex < arr.count else {
                    throw DataError.queryNotFound(path)
                }
                current = arr[arrayIndex]
            } else {
                guard let dict = current as? [String: Any], let val = dict[comp] else {
                    throw DataError.queryNotFound(path)
                }
                current = val
            }
        }
        return current
    }

    private func tryParseArrayIndex(_ s: String) -> Int? {
        if s.hasPrefix("[") && s.hasSuffix("]") {
            return Int(String(s.dropFirst().dropLast()))
        }
        if let idx = Int(s) { return idx }
        return nil
    }

    private func diffJSON(_ a: Any, _ b: Any) throws -> [String: Any] {
        var result: [String: Any] = [:]
        if let dictA = a as? [String: Any], let dictB = b as? [String: Any] {
            let allKeys = Set(dictA.keys).union(dictB.keys)
            for key in allKeys {
                switch (dictA[key], dictB[key]) {
                case (nil, let vb?):
                    result["+\(key)"] = vb
                case (let va?, nil):
                    result["-\(key)"] = va
                case (let va?, let vb?):
                    if let vaD = va as? [String: Any], let vbD = vb as? [String: Any] {
                        let sub = try diffJSON(vaD, vbD)
                        if !sub.isEmpty { result["~\(key)"] = sub }
                    } else if "\(va)" != "\(vb)" {
                        result["\(key)"] = ["from": va, "to": vb]
                    }
                default: break
                }
            }
        }
        return result
    }

    private func mergeJSON(_ a: Any, _ b: Any) throws -> Any {
        if let dictA = a as? [String: Any], let dictB = b as? [String: Any] {
            var result = dictA
            for (key, val) in dictB {
                if let existing = result[key], let existingDict = existing as? [String: Any], let valDict = val as? [String: Any] {
                    result[key] = try mergeJSON(existingDict, valDict)
                } else {
                    result[key] = val
                }
            }
            return result
        }
        return b
    }
}

// MARK: - YML

struct YmlCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "yml", abstract: "Query YAML files using dot-path")

    @Argument(help: "YAML file path")
    var file: String

    @Option(name: .shortAndLong, help: "Dot-path query (e.g. .foo.bar)")
    var query: String?

    mutating func run() throws {
        let content = try String(contentsOf: URL(fileURLWithPath: file), encoding: .utf8)
        let parsed = try parseYAML(content)
        var target = parsed
        if let queryPath = query {
            target = try queryYAML(parsed, path: queryPath)
        }
        if let dict = target as? [String: Any] {
            let json = try JSONSerialization.data(withJSONObject: dict, options: [.prettyPrinted])
            print(String(data: json, encoding: .utf8) ?? "")
        } else {
            print("\(target)")
        }
    }

    private func parseYAML(_ text: String) throws -> Any {
        let lines = text.components(separatedBy: .newlines).filter { !$0.trimmingCharacters(in: .whitespaces).isEmpty }
        guard !lines.isEmpty else { return [:] }

        var root: [String: Any] = [:]
        var stack: [(indent: Int, key: String, value: Any)] = []

        for line in lines {
            if line.trimmingCharacters(in: .whitespaces).hasPrefix("#") { continue }
            let indent = line.prefix(while: { $0 == " " }).count
            let trimmed = line.trimmingCharacters(in: .whitespaces)

            if let range = trimmed.range(of: ":") {
                let key = String(trimmed[..<range.lowerBound]).trimmingCharacters(in: .whitespaces)
                let value = String(trimmed[range.upperBound...]).trimmingCharacters(in: .whitespaces)

                while let last = stack.last, last.indent >= indent {
                    stack.removeLast()
                }

                if value.isEmpty || value == "|" || value == ">" {
                    let nested: [String: Any] = [:]
                    stack.append((indent, key, nested))
                    if stack.count == 1 {
                        root[key] = nested
                    } else {
                        var parent = stack[stack.count - 2].value as? [String: Any]
                        parent?[key] = nested
                        if let parentDict = stack[stack.count - 2].value as? [String: Any] {
                            var mutable = parentDict
                            mutable[key] = nested
                        }
                    }
                } else {
                    let parsedVal: Any = Self.parseYAMLValue(value)
                    setNestedValue(root: &root, stack: stack, key: key, value: parsedVal)
                }
            }
        }

        return root
    }

    static func parseYAMLValue(_ value: String) -> Any {
        if let int = Int(value) { return int }
        if let double = Double(value) { return double }
        if value == "true" || value == "yes" { return true }
        if value == "false" || value == "no" { return false }
        if value == "null" || value == "~" { return NSNull() }
        return value
    }

    private func setNestedValue(root: inout [String: Any], stack: [(indent: Int, key: String, value: Any)], key: String, value: Any) {
        if stack.isEmpty {
            root[key] = value
            return
        }
        var current: [String: Any] = root
        for (_, k, _) in stack {
            if let nested = current[k] as? [String: Any] {
                current = nested
            } else {
                let newDict: [String: Any] = [:]
                current[k] = newDict
                current = newDict
            }
        }
        current[key] = value
    }

    private func queryYAML(_ json: Any, path: String) throws -> Any {
        var components = path.split(separator: ".").map(String.init)
        if components.first == "" { components = Array(components.dropFirst()) }
        var current = json
        for comp in components {
            if let dict = current as? [String: Any], let val = dict[comp] {
                current = val
            } else {
                throw DataError.queryNotFound(path)
            }
        }
        return current
    }
}

// MARK: - Errors

enum DataError: Error, CustomStringConvertible {
    case invalidCSV
    case invalidJSON
    case invalidFilter
    case queryNotFound(String)
    case missingArgument(String)

    var description: String {
        switch self {
        case .invalidCSV: return "Invalid CSV format"
        case .invalidJSON: return "Invalid JSON format"
        case .invalidFilter: return "Invalid filter expression (use column=value)"
        case .queryNotFound(let path): return "Query path not found: \(path)"
        case .missingArgument(let arg): return "Missing argument: \(arg)"
        }
    }
}

extension Dictionary where Key == String, Value == String {
    subscript(_ key: String, default defaultVal: String) -> String {
        self[key] ?? defaultVal
    }
}
