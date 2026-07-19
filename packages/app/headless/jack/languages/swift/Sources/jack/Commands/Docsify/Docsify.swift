import Foundation
import ArgumentParser

struct DocsifyCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "docsify",
        abstract: "Documentation generation tools",
        subcommands: [TreeCommand.self, ScanCommand.self, ObsidianCommand.self, CobraCommand.self]
    )
    mutating func run() {}
}

// MARK: - Tree

struct TreeCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "tree", abstract: "Generate ASCII directory tree")

    @Argument(help: "Directory path")
    var dir: String = "."

    @Option(name: .shortAndLong, help: "Comma-separated patterns to exclude")
    var exclude: String = ".git,node_modules,.DS_Store"

    mutating func run() throws {
        let excludes = exclude.split(separator: ",").map(String.init).map { $0.trimmingCharacters(in: .whitespaces) }
        let tree = try generateTree(dir: dir, exclude: excludes)
        print(tree)
    }
}

private func generateTree(dir: String, exclude: [String]) throws -> String {
    let url = URL(fileURLWithPath: dir)
    var result = "\(url.lastPathComponent)/\n"
    result += buildTree(url: url, prefix: "", exclude: exclude)
    return result
}

private func buildTree(url: URL, prefix: String, exclude: [String]) -> String {
    let fm = FileManager.default
    guard let contents = try? fm.contentsOfDirectory(at: url, includingPropertiesForKeys: [.isDirectoryKey], options: [.skipsHiddenFiles]) else {
        return ""
    }
    var entries: [(name: String, isDir: Bool)] = []
    for entry in contents {
        let name = entry.lastPathComponent
        guard !exclude.contains(name) else { continue }
        let isDir = (try? entry.resourceValues(forKeys: [.isDirectoryKey]))?.isDirectory ?? false
        entries.append((name, isDir))
    }
    entries.sort { $0.name.lowercased() < $1.name.lowercased() }
    var result = ""
    for (i, entry) in entries.enumerated() {
        let isLast = i == entries.count - 1
        let connector = isLast ? "└── " : "├── "
        result += "\(prefix)\(connector)\(entry.name)\n"
        if entry.isDir {
            let childPrefix = prefix + (isLast ? "    " : "│   ")
            result += buildTree(url: url.appendingPathComponent(entry.name), prefix: childPrefix, exclude: exclude)
        }
    }
    return result
}

// MARK: - Scan

struct ScanCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "scan", abstract: "Scan source files and output GraphML")

    @Argument(help: "Directory to scan")
    var dir: String = "."

    @Option(name: .shortAndLong, help: "Comma-separated patterns to exclude")
    var exclude: String = ".git,node_modules"

    mutating func run() throws {
        let excludes = exclude.split(separator: ",").map(String.init).map { $0.trimmingCharacters(in: .whitespaces) }
        let symbols = try scanSymbols(dir: dir, exclude: excludes)
        let graphml = generateGraphML(symbols: symbols)
        print(graphml)
    }
}

private struct Symbol {
    let name: String
    let kind: String
    let file: String
    let lineNum: Int
}

private func scanSymbols(dir: String, exclude: [String]) throws -> [Symbol] {
    let fm = FileManager.default
    let url = URL(fileURLWithPath: dir)
    guard let enumerator = fm.enumerator(at: url, includingPropertiesForKeys: nil, options: [.skipsHiddenFiles]) else {
        return []
    }
    var symbols: [Symbol] = []
    while let fileURL = enumerator.nextObject() as? URL {
        let ext = fileURL.pathExtension
        guard ["go", "ts", "py", "rs"].contains(ext) else { continue }
        let relPath = fileURL.path.replacingOccurrences(of: url.path + "/", with: "")
        guard !exclude.contains(where: { relPath.hasPrefix($0) }) else { continue }
        let content = try String(contentsOf: fileURL, encoding: .utf8)
        let lines = content.components(separatedBy: .newlines)
        for (i, line) in lines.enumerated() {
            let trimmed = line.trimmingCharacters(in: .whitespaces)
            let sym: Symbol?
            switch ext {
            case "go":
                sym = scanGoLine(trimmed, file: relPath, lineNum: i + 1)
            case "ts":
                sym = scanTSLine(trimmed, file: relPath, lineNum: i + 1)
            case "py":
                sym = scanPyLine(trimmed, file: relPath, lineNum: i + 1)
            case "rs":
                sym = scanRustLine(trimmed, file: relPath, lineNum: i + 1)
            default:
                sym = nil
            }
            if let sym = sym { symbols.append(sym) }
        }
    }
    return symbols
}

private func scanGoLine(_ line: String, file: String, lineNum: Int) -> Symbol? {
    if let match = try? NSRegularExpression(pattern: "^(func|type|struct|interface|const|var)\\s+(\\w+)").firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
        let kind = String(line[Range(match.range(at: 1), in: line)!])
        let name = String(line[Range(match.range(at: 2), in: line)!])
        return Symbol(name: name, kind: kind, file: file, lineNum: lineNum)
    }
    return nil
}

private func scanTSLine(_ line: String, file: String, lineNum: Int) -> Symbol? {
    if let match = try? NSRegularExpression(pattern: "^(export\\s+)?(function|class|interface|type|enum|const)\\s+(\\w+)").firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
        let kind = String(line[Range(match.range(at: 2), in: line)!])
        let name = String(line[Range(match.range(at: 3), in: line)!])
        return Symbol(name: name, kind: kind, file: file, lineNum: lineNum)
    }
    return nil
}

private func scanPyLine(_ line: String, file: String, lineNum: Int) -> Symbol? {
    if let match = try? NSRegularExpression(pattern: "^(def|class)\\s+(\\w+)").firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
        let kind = String(line[Range(match.range(at: 1), in: line)!])
        let name = String(line[Range(match.range(at: 2), in: line)!])
        return Symbol(name: name, kind: kind, file: file, lineNum: lineNum)
    }
    return nil
}

private func scanRustLine(_ line: String, file: String, lineNum: Int) -> Symbol? {
    if let match = try? NSRegularExpression(pattern: "^(pub\\s+)?(fn|struct|enum|trait|impl|mod|type|const)\\s+(\\w+)").firstMatch(in: line, range: NSRange(line.startIndex..., in: line)) {
        let kind = String(line[Range(match.range(at: 2), in: line)!])
        let name = String(line[Range(match.range(at: 3), in: line)!])
        return Symbol(name: name, kind: kind, file: file, lineNum: lineNum)
    }
    return nil
}

private func generateGraphML(symbols: [Symbol]) -> String {
    var xml = """
    <?xml version="1.0" encoding="UTF-8"?>
    <graphml xmlns="http://graphml.graphdrawing.org/xmlns">
      <key id="name" for="node" attr.name="name" attr.type="string"/>
      <key id="kind" for="node" attr.name="kind" attr.type="string"/>
      <key id="file" for="node" attr.name="file" attr.type="string"/>
      <key id="line" for="node" attr.name="line" attr.type="int"/>
      <graph id="G" edgedefault="directed">
    """
    for sym in symbols {
        let id = "\(sym.file):\(sym.name)".replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "<", with: "&lt;").replacingOccurrences(of: ">", with: "&gt;")
        let name = sym.name.replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "<", with: "&lt;").replacingOccurrences(of: ">", with: "&gt;")
        let file = sym.file.replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "<", with: "&lt;").replacingOccurrences(of: ">", with: "&gt;")
        xml += """
            <node id="\(id)">
              <data key="name">\(name)</data>
              <data key="kind">\(sym.kind)</data>
              <data key="file">\(file)</data>
              <data key="line">\(sym.lineNum)</data>
            </node>
        """
    }
    xml += """
      </graph>
    </graphml>
    """
    return xml
}

// MARK: - Obsidian

struct ObsidianCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "obsidian", abstract: "Generate Obsidian graph JSON from source files")

    @Argument(help: "Directory to scan")
    var dir: String = "."

    @Option(name: .shortAndLong, help: "Comma-separated patterns to exclude")
    var exclude: String = ".git,node_modules"

    mutating func run() throws {
        let excludes = exclude.split(separator: ",").map(String.init).map { $0.trimmingCharacters(in: .whitespaces) }
        let graph = try buildObsidianGraph(dir: dir, exclude: excludes)
        let json = try JSONSerialization.data(withJSONObject: graph, options: [.prettyPrinted])
        print(String(data: json, encoding: .utf8) ?? "")
    }
}

private func buildObsidianGraph(dir: String, exclude: [String]) throws -> [String: Any] {
    let fm = FileManager.default
    let dirURL = URL(fileURLWithPath: dir)
    guard let enumerator = fm.enumerator(at: dirURL, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles]) else {
        return ["nodes": [], "edges": []]
    }

    var nodes: [[String: Any]] = []
    var edges: [[String: String]] = []
    var nodeMap: [String: Int] = [:]

    while let fileURL = enumerator.nextObject() as? URL {
        guard fileURL.pathExtension == "swift" || fileURL.pathExtension == "ts" || fileURL.pathExtension == "py" || fileURL.pathExtension == "go" || fileURL.pathExtension == "rs" else { continue }
        let relPath = relPath(path: fileURL.path, base: dir)
        guard !exclude.contains(where: { relPath.hasPrefix($0) }) else { continue }

        let content = try String(contentsOf: fileURL, encoding: .utf8)
        let name = fileURL.deletingPathExtension().lastPathComponent
        let imports = extractImports(from: content)

        nodeMap[relPath] = nodes.count
        nodes.append(["id": relPath, "name": name, "path": fileURL.path, "links": imports])
    }

    for (sourceIdx, node) in nodes.enumerated() {
        guard let links = node["links"] as? [String] else { continue }
        for link in links {
            if let targetIdx = findNodeIndex(nodes: nodes, name: link) {
                edges.append(["source": nodes[sourceIdx]["id"] as? String ?? "", "target": nodes[targetIdx]["id"] as? String ?? ""])
            }
        }
    }

    return ["nodes": nodes, "edges": edges]
}

private func relPath(path: String, base: String) -> String {
    guard let range = path.range(of: base) else { return path }
    var rel = String(path[range.upperBound...])
    if rel.hasPrefix("/") { rel = String(rel.dropFirst()) }
    return rel
}

private func extractImports(from content: String) -> [String] {
    let lines = content.components(separatedBy: .newlines)
    var imports: [String] = []
    for line in lines {
        let trimmed = line.trimmingCharacters(in: .whitespaces)
        if trimmed.hasPrefix("import ") {
            let module = trimmed.replacingOccurrences(of: "import ", with: "").trimmingCharacters(in: .whitespaces)
            if !module.isEmpty { imports.append(module) }
        }
    }
    return imports
}

private func findNodeIndex(nodes: [[String: Any]], name: String) -> Int? {
    return nodes.firstIndex { ($0["name"] as? String) == name }
}

// MARK: - Cobra

struct CobraCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cobra", abstract: "Generate Cobra-style sidebar navigation")

    @Argument(help: "Directory to scan")
    var dir: String = "."

    mutating func run() {
        print("not yet implemented")
    }
}
