import Foundation

struct ObsidianNode: Codable {
    let id: String
    let name: String
    let path: String
    let links: [String]
}

struct ObsidianGraph: Codable {
    let nodes: [ObsidianNode]
    let edges: [ObsidianEdge]
}

struct ObsidianEdge: Codable {
    let source: String
    let target: String
}

let wikiLinkPattern = try! NSRegularExpression(pattern: "\\[\\[([^\\]]+)\\]\\]", options: [])

func buildObsidianGraph(dir: String, exclude: [String] = []) throws -> ObsidianGraph {
    let fileManager = FileManager.default
    let dirURL = URL(fileURLWithPath: dir)
    let enumerator = fileManager.enumerator(at: dirURL, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles])

    var nodes: [ObsidianNode] = []
    var nodeMap: [String: Int] = [:]
    var edges: [ObsidianEdge] = []

    while let fileURL = enumerator?.nextObject() as? URL {
        guard fileURL.pathExtension == "md" else { continue }
        let relPath = relativePath(path: fileURL.path, base: dir)
        guard !shouldExclude(relPath, exclude: exclude) else { continue }

        let content = try String(contentsOf: fileURL, encoding: .utf8)
        let name = fileURL.deletingPathExtension().lastPathComponent
        let links = extractWikiLinks(from: content)

        nodeMap[relPath] = nodes.count
        nodes.append(ObsidianNode(id: relPath, name: name, path: fileURL.path, links: links))
    }

    for (sourceIdx, node) in nodes.enumerated() {
        for link in node.links {
            if let targetIdx = findNodeIndex(nodes: nodes, link: link) {
                edges.append(ObsidianEdge(source: nodes[sourceIdx].id, target: nodes[targetIdx].id))
            }
        }
    }

    return ObsidianGraph(nodes: nodes, edges: edges)
}

private func relativePath(path: String, base: String) -> String {
    guard let range = path.range(of: base) else { return path }
    var rel = String(path[range.upperBound...])
    if rel.hasPrefix("/") { rel = String(rel.dropFirst()) }
    return rel
}

private func shouldExclude(_ path: String, exclude: [String]) -> Bool {
    exclude.contains { path.hasPrefix($0) || path.contains($0) }
}

private func extractWikiLinks(from content: String) -> [String] {
    let nsRange = NSRange(content.startIndex..<content.endIndex, in: content)
    let matches = wikiLinkPattern.matches(in: content, options: [], range: nsRange)
    return matches.compactMap { match in
        guard let range = Range(match.range(at: 1), in: content) else { return nil }
        let link = String(content[range])
        // Handle [[link|display]] -> link
        if let pipeIndex = link.firstIndex(of: "|") {
            return String(link[..<pipeIndex]).trimmingCharacters(in: .whitespaces)
        }
        return link.trimmingCharacters(in: .whitespaces)
    }
}

private func findNodeIndex(nodes: [ObsidianNode], link: String) -> Int? {
    // Try exact name match
    if let idx = nodes.firstIndex(where: { $0.name == link }) { return idx }

    // Try filename match (e.g., "My Note" matches "My Note.md")
    let linkedName = link.replacingOccurrences(of: ".md", with: "")
    if linkedName != link {
        if let idx = nodes.firstIndex(where: { $0.name == linkedName }) { return idx }
    }

    // Try path match
    let linkPath = link.hasSuffix(".md") ? link : "\(link).md"
    if let idx = nodes.firstIndex(where: { $0.id == linkPath }) { return idx }

    return nil
}
