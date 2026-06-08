import Foundation
import ArgumentParser

struct Docsify: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "docsify",
        abstract: "Docsify tools",
        subcommands: [DocsifyCobra.self, DocsifyObsidian.self, DocsifyTree.self]
    )

    mutating func run() {}
}

struct DocsifyCobra: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cobra", abstract: "Generate _sidebar.md from command tree")

    @Argument(help: "Source directory")
    var dir: String

    mutating func run() throws {
        let sidebar = try generateCobraSidebar(dir: dir)
        try sidebar.write(toFile: "\(dir)/_sidebar.md", atomically: true, encoding: .utf8)
        print("Generated _sidebar.md")
    }
}

struct DocsifyObsidian: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "obsidian",
        abstract: "Generate Obsidian knowledge graph"
    )

    @Argument(help: "Directory containing markdown files")
    var dir: String

    @Option(name: .shortAndLong, help: "Output file")
    var output: String?

    @Option(name: .long, parsing: .upToNextOption, help: "Exclude patterns")
    var exclude: [String] = []

    @Option(name: .long, help: "Output format: dot, json, edges")
    var format: String = "dot"

    mutating func run() throws {
        let graph = try buildObsidianGraph(dir: dir, exclude: exclude)

        let outFile = output ?? (format == "dot" ? "graph.dot" : "graph.json")

        let content: String
        switch format {
        case "json":
            let encoder = JSONEncoder()
            encoder.outputFormatting = .prettyPrinted
            let data = try encoder.encode(graph)
            content = String(data: data, encoding: .utf8) ?? ""
        case "edges":
            var lines: [String] = []
            for edge in graph.edges {
                lines.append("\(edge.source) -> \(edge.target)")
            }
            content = lines.sorted().joined(separator: "\n")
        default: // dot
            var dot = "digraph G {\n"
            dot += "  rankdir=LR;\n"
            for node in graph.nodes {
                let safeID = node.id.replacingOccurrences(of: "\"", with: "\\\"")
                dot += "  \"\(safeID)\" [label=\"\(node.name)\"];\n"
            }
            for edge in graph.edges {
                let s = edge.source.replacingOccurrences(of: "\"", with: "\\\"")
                let t = edge.target.replacingOccurrences(of: "\"", with: "\\\"")
                dot += "  \"\(s)\" -> \"\(t)\";\n"
            }
            dot += "}\n"
            content = dot
        }

        if output?.isEmpty ?? true {
            print(content)
        } else {
            try content.write(toFile: outFile, atomically: true, encoding: .utf8)
            print("Graph saved to \(outFile)")
        }
    }
}

struct DocsifyTree: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "tree", abstract: "Generate TREE.md")

    @Argument(help: "Source directory")
    var dir: String

    @Option(name: .long, parsing: .upToNextOption, help: "Exclude patterns")
    var exclude: [String] = []

    mutating func run() throws {
        let tree = try generateTree(dir: dir, exclude: exclude)
        try tree.write(toFile: "TREE.md", atomically: true, encoding: .utf8)
        print("Generated TREE.md")
    }
}
