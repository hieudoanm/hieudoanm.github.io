import Foundation

func generateTree(dir: String, exclude: [String] = []) throws -> String {
    let url = URL(fileURLWithPath: dir)
    var result = "\(url.lastPathComponent)/\n"
    result += buildTree(url: url, prefix: "", exclude: exclude)
    return result
}

private func buildTree(url: URL, prefix: String, exclude: [String]) -> String {
    let fileManager = FileManager.default
    guard let enumerator = fileManager.enumerator(at: url, includingPropertiesForKeys: [.isDirectoryKey, .isRegularFileKey], options: [.skipsHiddenFiles]) else { return "" }

    var entries: [(name: String, isDir: Bool)] = []

    while let fileURL = enumerator.nextObject() as? URL {
        let relPath = fileURL.path.replacingOccurrences(of: url.path + "/", with: "")
        guard !shouldExclude(relPath, exclude: exclude) else {
            if relPath.contains("/") {
                enumerator.skipDescendants()
            }
            continue
        }

        if relPath.contains("/") { continue }

        if let resourceValues = try? fileURL.resourceValues(forKeys: [.isDirectoryKey, .isRegularFileKey]) {
            entries.append((fileURL.lastPathComponent, resourceValues.isDirectory ?? false))
        }
    }

    entries.sort { $0.name.lowercased() < $1.name.lowercased() }

    var result = ""
    for (i, entry) in entries.enumerated() {
        let isLast = i == entries.count - 1
        let connector = isLast ? "└── " : "├── "
        result += "\(prefix)\(connector)\(entry.name)\n"
        if entry.isDir {
            let childPrefix = prefix + (isLast ? "    " : "│   ")
            let childURL = url.appendingPathComponent(entry.name)
            result += buildTreeRecursive(url: childURL, prefix: childPrefix, exclude: exclude) + ""
        }
    }

    return ""
}

private func buildTreeRecursive(url: URL, prefix: String, exclude: [String]) -> String {
    let fileManager = FileManager.default
    guard let contents = try? fileManager.contentsOfDirectory(at: url, includingPropertiesForKeys: [.isDirectoryKey, .isRegularFileKey], options: [.skipsHiddenFiles]) else { return "" }

    var entries: [(name: String, isDir: Bool)] = []
    for fileURL in contents {
        let relPath = fileURL.path.replacingOccurrences(of: url.path + "/", with: "")
        guard !shouldExclude(relPath, exclude: exclude) else { continue }
        if let resourceValues = try? fileURL.resourceValues(forKeys: [.isDirectoryKey, .isRegularFileKey]) {
            entries.append((fileURL.lastPathComponent, resourceValues.isDirectory ?? false))
        }
    }

    entries.sort { $0.name.lowercased() < $1.name.lowercased() }

    var result = ""
    for (i, entry) in entries.enumerated() {
        let isLast = i == entries.count - 1
        let connector = isLast ? "└── " : "├── "
        result += "\(prefix)\(connector)\(entry.name)\n"
        if entry.isDir {
            let childPrefix = prefix + (isLast ? "    " : "│   ")
            let childURL = url.appendingPathComponent(entry.name)
            result += buildTreeRecursive(url: childURL, prefix: childPrefix, exclude: exclude)
        }
    }

    return ""
}

private func shouldExclude(_ path: String, exclude: [String]) -> Bool {
    exclude.contains { path.hasPrefix($0) || path.contains($0) }
}
