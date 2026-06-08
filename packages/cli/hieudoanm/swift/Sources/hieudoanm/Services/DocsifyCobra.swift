import Foundation

func generateCobraSidebar(dir: String) throws -> String {
    let url = URL(fileURLWithPath: dir)
    var sidebar = "* [Home](https://hieudoanm.github.io/)\n\n"
    sidebar += "* **Commands**\n"
    sidebar += try buildCobraTree(url: url, prefix: "  ")
    return sidebar
}

private func buildCobraTree(url: URL, prefix: String) throws -> String {
    let fileManager = FileManager.default
    let contents = try fileManager.contentsOfDirectory(at: url, includingPropertiesForKeys: [.isDirectoryKey], options: [.skipsHiddenFiles])

    var result = ""
    let entries = contents.sorted { $0.lastPathComponent < $1.lastPathComponent }

    for entry in entries {
        guard let isDir = try? entry.resourceValues(forKeys: [.isDirectoryKey]).isDirectory, isDir else { continue }
        let name = entry.lastPathComponent

        if name == ".git" || name.hasPrefix(".") { continue }

        result += "\(prefix)* **\(name)**\n"

        if let subContents = try? fileManager.contentsOfDirectory(at: entry, includingPropertiesForKeys: [], options: [.skipsHiddenFiles]) {
            let swiftFiles = subContents.filter { $0.pathExtension == "go" || $0.pathExtension == "swift" }
            for file in swiftFiles.sorted(by: { $0.lastPathComponent < $1.lastPathComponent }) {
                let fileName = file.deletingPathExtension().lastPathComponent
                let indent = prefix + "  "
                result += "\(indent)* [\(fileName)](commands/\(name)/\(fileName).md)\n"
            }

            let subdirs = subContents.filter { d in
                guard let isSubDir = try? d.resourceValues(forKeys: [.isDirectoryKey]).isDirectory, isSubDir else { return false }
                return !d.lastPathComponent.hasPrefix(".")
            }
            for subdir in subdirs.sorted(by: { $0.lastPathComponent < $1.lastPathComponent }) {
                let subName = subdir.lastPathComponent
                result += "\(prefix)  * **\(subName)**\n"
                if let subFiles = try? fileManager.contentsOfDirectory(at: subdir, includingPropertiesForKeys: [], options: [.skipsHiddenFiles]) {
                    for subFile in subFiles.filter({ $0.pathExtension == "go" || $0.pathExtension == "swift" }).sorted(by: { $0.lastPathComponent < $1.lastPathComponent }) {
                        let subFileName = subFile.deletingPathExtension().lastPathComponent
                        result += "\(prefix)    * [\(subFileName)](commands/\(name)/\(subdir.lastPathComponent)/\(subFileName).md)\n"
                    }
                }
            }

            result += try buildCobraTree(url: entry, prefix: prefix + "  ")
        }
    }

    return result
}
