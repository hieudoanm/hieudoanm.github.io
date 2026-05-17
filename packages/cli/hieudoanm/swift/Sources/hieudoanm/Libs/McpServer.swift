import Foundation

let MCP_PROTOCOL_VERSION = "2025-11-25"

struct MCPRequest: Codable {
    let jsonrpc: String
    let id: JSONValue?
    let method: String
    let params: JSONValue?
}

struct MCPResponse: Codable {
    let jsonrpc: String
    let id: JSONValue?
    let result: JSONValue?
    let error: MCPErrorObject?
}

struct MCPErrorObject: Codable {
    let code: Int
    let message: String
}

struct MCPToolSchema: Codable {
    let name: String
    let description: String
    let inputSchema: MCPSchema
}

struct MCPSchema: Codable {
    let type: String
    let properties: [String: MCPPropertySchema]?
    let required: [String]?
}

class MCPPropertySchema: Codable {
    let type: String
    let description: String?
    let `default`: JSONValue?
    let items: MCPPropertySchema?

    init(type: String, description: String? = nil, default: JSONValue? = nil, items: MCPPropertySchema? = nil) {
        self.type = type
        self.description = description
        self.`default` = `default`
        self.items = items
    }
}

enum JSONValue: Codable {
    case string(String)
    case number(Double)
    case bool(Bool)
    case null
    case array([JSONValue])
    case object([String: JSONValue])

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let str = try? container.decode(String.self) {
            self = .string(str)
        } else if let num = try? container.decode(Double.self) {
            self = .number(num)
        } else if let bool = try? container.decode(Bool.self) {
            self = .bool(bool)
        } else if container.decodeNil() {
            self = .null
        } else if let arr = try? container.decode([JSONValue].self) {
            self = .array(arr)
        } else if let obj = try? container.decode([String: JSONValue].self) {
            self = .object(obj)
        } else {
            throw DecodingError.dataCorruptedError(in: container, debugDescription: "invalid JSON value")
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .string(let v): try container.encode(v)
        case .number(let v): try container.encode(v)
        case .bool(let v): try container.encode(v)
        case .null: try container.encodeNil()
        case .array(let v): try container.encode(v)
        case .object(let v): try container.encode(v)
        }
    }
}

class MCPServer {
    private var tools: [MCPToolSchema] = []
    private var handlers: [String: (JSONValue?) -> [String: JSONValue]] = [:]

    func addTool(name: String, description: String, schema: MCPSchema, handler: @escaping (JSONValue?) -> [String: JSONValue]) {
        tools.append(MCPToolSchema(name: name, description: description, inputSchema: schema))
        handlers[name] = handler
    }

    func run() {
        let encoder = JSONEncoder()
        let decoder = JSONDecoder()

        while let line = readLine() {
            let trimmed = line.trimmingCharacters(in: .whitespacesAndNewlines)
            if trimmed.isEmpty { continue }

            guard let data = trimmed.data(using: .utf8),
                  let msg = try? decoder.decode(MCPRequest.self, from: data) else {
                if let resp = encodeResponse(encoder, MCPResponse(
                    jsonrpc: "2.0",
                    id: nil,
                    result: nil,
                    error: MCPErrorObject(code: -32700, message: "parse error")
                )) {
                    FileHandle.standardOutput.write(resp)
                    FileHandle.standardOutput.write("\n".data(using: .utf8)!)
                }
                continue
            }

            if msg.jsonrpc != "2.0" {
                if let resp = encodeResponse(encoder, MCPResponse(
                    jsonrpc: "2.0",
                    id: msg.id,
                    result: nil,
                    error: MCPErrorObject(code: -32600, message: "invalid jsonrpc version")
                )) {
                    FileHandle.standardOutput.write(resp)
                    FileHandle.standardOutput.write("\n".data(using: .utf8)!)
                }
                continue
            }

            let isNotification = msg.id == nil

            switch msg.method {
            case "initialize":
                handleInitialize(encoder, id: msg.id)
            case "ping":
                if let resp = encodeResponse(encoder, MCPResponse(
                    jsonrpc: "2.0",
                    id: msg.id,
                    result: .object([:]),
                    error: nil
                )) {
                    FileHandle.standardOutput.write(resp)
                    FileHandle.standardOutput.write("\n".data(using: .utf8)!)
                }
            case "tools/list":
                handleListTools(encoder, id: msg.id)
            case "tools/call":
                handleCallTool(encoder, id: msg.id, params: msg.params)
            default:
                if !isNotification {
                    if let resp = encodeResponse(encoder, MCPResponse(
                        jsonrpc: "2.0",
                        id: msg.id,
                        result: nil,
                        error: MCPErrorObject(code: -32601, message: "method not found: \(msg.method)")
                    )) {
                        FileHandle.standardOutput.write(resp)
                        FileHandle.standardOutput.write("\n".data(using: .utf8)!)
                    }
                }
            }
        }
    }

    private func handleInitialize(_ encoder: JSONEncoder, id: JSONValue?) {
        let result: [String: JSONValue] = [
            "protocolVersion": .string(MCP_PROTOCOL_VERSION),
            "capabilities": .object([
                "tools": .object(["listChanged": .bool(false)])
            ]),
            "serverInfo": .object([
                "name": .string("hieudoanm-mcp"),
                "version": .string("1.0.0")
            ])
        ]
        if let resp = encodeResponse(encoder, MCPResponse(
            jsonrpc: "2.0",
            id: id,
            result: .object(result),
            error: nil
        )) {
            FileHandle.standardOutput.write(resp)
            FileHandle.standardOutput.write("\n".data(using: .utf8)!)
        }
    }

    private func handleListTools(_ encoder: JSONEncoder, id: JSONValue?) {
        var toolsArray: [JSONValue] = []
        for tool in tools {
            toolsArray.append(jsonValue(from: tool))
        }
        let result: [String: JSONValue] = ["tools": .array(toolsArray)]
        if let resp = encodeResponse(encoder, MCPResponse(
            jsonrpc: "2.0",
            id: id,
            result: .object(result),
            error: nil
        )) {
            FileHandle.standardOutput.write(resp)
            FileHandle.standardOutput.write("\n".data(using: .utf8)!)
        }
    }

    private func handleCallTool(_ encoder: JSONEncoder, id: JSONValue?, params: JSONValue?) {
        guard case .object(let obj)? = params,
              case .string(let name)? = obj["name"] else {
            if let resp = encodeResponse(encoder, MCPResponse(
                jsonrpc: "2.0",
                id: id,
                result: nil,
                error: MCPErrorObject(code: -32602, message: "missing params")
            )) {
                FileHandle.standardOutput.write(resp)
                FileHandle.standardOutput.write("\n".data(using: .utf8)!)
            }
            return
        }

        let args = obj["arguments"]

        guard let handler = handlers[name] else {
            if let resp = encodeResponse(encoder, MCPResponse(
                jsonrpc: "2.0",
                id: id,
                result: nil,
                error: MCPErrorObject(code: -32601, message: "tool not found: \(name)")
            )) {
                FileHandle.standardOutput.write(resp)
                FileHandle.standardOutput.write("\n".data(using: .utf8)!)
            }
            return
        }

        let result = handler(args)
        if let resp = encodeResponse(encoder, MCPResponse(
            jsonrpc: "2.0",
            id: id,
            result: .object(result),
            error: nil
        )) {
            FileHandle.standardOutput.write(resp)
            FileHandle.standardOutput.write("\n".data(using: .utf8)!)
        }
    }

    private func encodeResponse(_ encoder: JSONEncoder, _ resp: MCPResponse) -> Data? {
        try? encoder.encode(resp)
    }

    private func jsonValue<T: Encodable>(from value: T) -> JSONValue {
        let data = try! JSONEncoder().encode(value)
        let json = try! JSONSerialization.jsonObject(with: data)
        return jsonValueFromAny(json)
    }

    private func jsonValueFromAny(_ value: Any) -> JSONValue {
        switch value {
        case let str as String:
            return .string(str)
        case let num as Double:
            return .number(num)
        case let num as Int:
            return .number(Double(num))
        case let bool as Bool:
            return .bool(bool)
        case let arr as [Any]:
            return .array(arr.map(jsonValueFromAny))
        case let dict as [String: Any]:
            var result: [String: JSONValue] = [:]
            for (k, v) in dict {
                result[k] = jsonValueFromAny(v)
            }
            return .object(result)
        default:
            return .null
        }
    }
}

func mcpNewToolResultText(_ text: String) -> [String: JSONValue] {
    return [
        "content": .array([
            .object(["type": .string("text"), "text": .string(text)])
        ])
    ]
}

func mcpNewToolResultError(_ text: String) -> [String: JSONValue] {
    return [
        "content": .array([
            .object(["type": .string("text"), "text": .string(text)])
        ]),
        "isError": .bool(true)
    ]
}
