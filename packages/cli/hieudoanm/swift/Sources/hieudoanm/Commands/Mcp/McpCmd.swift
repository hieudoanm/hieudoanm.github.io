import Foundation
import ArgumentParser

struct McpCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "mcp",
        abstract: "MCP server exposing CLI tools to AI agents",
        subcommands: [McpServe.self]
    )
}

struct McpServe: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "serve",
        abstract: "Start the MCP server over stdio"
    )

    mutating func run() {
        let server = MCPServer()
        registerTools(server)
        FileHandle.standardError.write("[mcp] tools registered\n".data(using: .utf8)!)
        server.run()
    }
}

struct McpModule {
    let name: String
    let description: String
}

private let mcpModules: [McpModule] = [
    McpModule(name: "calc", description: "Calculation and conversion tools"),
    McpModule(name: "casino", description: "Casino and gambling games"),
    McpModule(name: "chess", description: "Chess analysis and tools"),
    McpModule(name: "colors", description: "Color conversion and manipulation"),
    McpModule(name: "convert", description: "Text and data conversion"),
    McpModule(name: "crypto", description: "Cryptographic operations"),
    McpModule(name: "data", description: "Data processing utilities"),
    McpModule(name: "docsify", description: "Codebase analysis and documentation"),
    McpModule(name: "doi", description: "DOI resolution and citation"),
    McpModule(name: "english", description: "English dictionary tools"),
    McpModule(name: "file", description: "File introspection and manipulation"),
    McpModule(name: "gemini", description: "Google Gemini AI chat"),
    McpModule(name: "gh", description: "GitHub utilities"),
    McpModule(name: "image", description: "Image processing tools"),
    McpModule(name: "net", description: "Network utilities"),
    McpModule(name: "openapi", description: "OpenAPI specification tools"),
    McpModule(name: "openrouter", description: "OpenRouter AI chat"),
    McpModule(name: "port", description: "Port scanning and utilities"),
    McpModule(name: "search", description: "Universal search tools"),
    McpModule(name: "semver", description: "Semantic versioning tools"),
    McpModule(name: "system", description: "System monitoring and utilities"),
    McpModule(name: "telegram", description: "Telegram messaging"),
    McpModule(name: "time", description: "Time and scheduling tools"),
    McpModule(name: "version", description: "Version information"),
    McpModule(name: "web", description: "Web scraping and utilities"),
]

func registerTools(_ server: MCPServer) {
    let stderrHandle = FileHandle.standardError
    stderrHandle.write("[mcp] discovering tools...\n".data(using: .utf8)!)
    for mod in mcpModules {
        let schema = MCPSchema(
            type: "object",
            properties: [
                "_args": MCPPropertySchema(
                    type: "array",
                    description: "Command and arguments (e.g., [\"bmi\", \"--height\", \"175\"])",
                    items: MCPPropertySchema(type: "string", description: nil, default: nil, items: nil)
                )
            ],
            required: nil
        )

        let modName = mod.name
        server.addTool(name: modName, description: mod.description, schema: schema) { jsonArgs in
            executeMcpTool(modName, jsonArgs)
        }
        stderrHandle.write("[mcp]   \(modName)\n".data(using: .utf8)!)
    }
}

func executeMcpTool(_ toolName: String, _ jsonArgs: JSONValue?) -> [String: JSONValue] {
    let start = Date()
    let cliArgs = jsonToCliArgs(toolName, jsonArgs)

    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/env")
    process.arguments = ["hieudoanm"] + Array(cliArgs.dropFirst())

    let outPipe = Pipe()
    let errPipe = Pipe()
    process.standardOutput = outPipe
    process.standardError = errPipe

    do {
        try process.run()
        process.waitUntilExit()

        let outData = outPipe.fileHandleForReading.readDataToEndOfFile()
        let errData = errPipe.fileHandleForReading.readDataToEndOfFile()
        let stdout = String(data: outData, encoding: .utf8) ?? ""
        let stderr = String(data: errData, encoding: .utf8) ?? ""

        let elapsed = Int((Date().timeIntervalSince(start) * 1000).rounded())

        let toolPath = toolName.replacingOccurrences(of: ".", with: " ")
        HistoryService.append(HistoryEntry(
            timestamp: ISO8601DateFormatter().string(from: start),
            source: "mcp",
            command: toolPath,
            cwd: FileManager.default.currentDirectoryPath,
            durationMs: Int64(elapsed),
            error: process.terminationStatus != 0 ? (stderr.isEmpty ? nil : stderr) : nil
        ))

        if process.terminationStatus == 0 {
            return mcpNewToolResultText(stdout.trimmingCharacters(in: .whitespacesAndNewlines))
        } else {
            let text = stdout.trimmingCharacters(in: .whitespacesAndNewlines)
            let errText = stderr.trimmingCharacters(in: .whitespacesAndNewlines)
            return mcpNewToolResultError(text.isEmpty ? errText : text)
        }
    } catch {
        return mcpNewToolResultError("exec error: \(error.localizedDescription)")
    }
}

func jsonToCliArgs(_ toolName: String, _ jsonArgs: JSONValue?) -> [String] {
    var args = ["hieudoanm"]
    for part in toolName.split(separator: ".") {
        args.append(String(part))
    }

    guard case .object(let obj)? = jsonArgs else {
        return args
    }

    for (key, value) in obj {
        if key == "_args" {
            if case .array(let items) = value {
                for item in items {
                    if case .string(let s) = item {
                        args.append(s)
                    }
                }
            }
        } else {
            switch value {
            case .bool(true):
                args.append("--\(key)")
            case .bool(false):
                break
            case .string(let s):
                args.append("--\(key)")
                args.append(s)
            case .number(let n):
                args.append("--\(key)")
                args.append(String(format: "%g", n))
            case .array(let items):
                for item in items {
                    args.append("--\(key)")
                    if case .string(let s) = item {
                        args.append(s)
                    } else {
                        args.append("\(item)")
                    }
                }
            default:
                break
            }
        }
    }

    return args
}
