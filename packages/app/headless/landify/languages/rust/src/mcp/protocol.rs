//! The JSON-RPC 2.0 and MCP wire types this server speaks.
//!
//! The protocol layer is transport-agnostic and knows nothing about rendering;
//! the tool surface lives in `tools.rs` and the file rules in `workspace.rs`.

use serde::{Deserialize, Serialize};
use serde_json::{json, Map, Value};

/// The MCP revision this server implements.
pub const PROTOCOL_VERSION: &str = "2025-11-25";

/// The name this server identifies as during `initialize`.
pub const SERVER_NAME: &str = "landify-mcp";

/// The version this server identifies as during `initialize`.
pub const SERVER_VERSION: &str = "1.0.0";

/// The JSON-RPC 2.0 and MCP error codes used by the server.
pub mod error_code {
    pub const PARSE: i32 = -32700;
    pub const INVALID_REQUEST: i32 = -32600;
    pub const METHOD_NOT_FOUND: i32 = -32601;
    pub const INVALID_PARAMS: i32 = -32602;
}

/// An incoming JSON-RPC 2.0 message.
#[derive(Debug, Deserialize)]
pub struct Request {
    #[serde(default)]
    pub jsonrpc: String,
    #[serde(default)]
    pub id: Option<Value>,
    #[serde(default)]
    pub method: String,
    #[serde(default)]
    pub params: Option<Value>,
}

impl Request {
    /// Reports whether this frame expects no reply. A missing or JSON-null id
    /// marks a notification.
    pub fn is_notification(&self) -> bool {
        matches!(self.id, None | Some(Value::Null))
    }
}

/// Builds a JSON-RPC error reply for `id`.
pub fn error_response(id: Option<Value>, code: i32, message: impl Into<String>) -> Value {
    json!({
        "jsonrpc": "2.0",
        "id": id,
        "error": { "code": code, "message": message.into() },
    })
}

/// Builds a JSON-RPC success reply for `id`.
pub fn success_response(id: Option<Value>, result: Value) -> Value {
    json!({ "jsonrpc": "2.0", "id": id, "result": result })
}

/// One piece of tool output. Only text is emitted.
#[derive(Debug, Serialize)]
pub struct ContentItem {
    #[serde(rename = "type")]
    pub kind: &'static str,
    pub text: String,
}

/// The payload of a `tools/call` result.
#[derive(Debug, Serialize)]
pub struct ToolResult {
    pub content: Vec<ContentItem>,
    /// Omitted when false, so a successful result stays compact.
    #[serde(rename = "isError", skip_serializing_if = "is_false")]
    pub is_error: bool,
}

fn is_false(value: &bool) -> bool {
    !*value
}

impl ToolResult {
    /// Builds a successful tool result carrying `text`.
    pub fn text(text: impl Into<String>) -> ToolResult {
        ToolResult {
            content: vec![ContentItem {
                kind: "text",
                text: text.into(),
            }],
            is_error: false,
        }
    }

    /// Builds a failed tool result carrying `text`.
    ///
    /// Tool failures are reported this way rather than as JSON-RPC errors so
    /// the model can read and react to them.
    pub fn error(text: impl Into<String>) -> ToolResult {
        ToolResult {
            content: vec![ContentItem {
                kind: "text",
                text: text.into(),
            }],
            is_error: true,
        }
    }
}

/// The reply to `initialize`.
pub fn initialize_result() -> Value {
    json!({
        "protocolVersion": PROTOCOL_VERSION,
        "capabilities": { "tools": { "listChanged": false } },
        "serverInfo": { "name": SERVER_NAME, "version": SERVER_VERSION },
    })
}

/// A JSON Schema object restricted to the subset MCP tools need.
pub fn object_schema(properties: Vec<(&str, Value)>, required: &[&str]) -> Value {
    let mut map = Map::new();
    for (name, schema) in properties {
        map.insert(name.to_string(), schema);
    }
    json!({ "type": "object", "properties": map, "required": required })
}

/// Renders a tool payload as indented JSON. Every text block goes through this
/// rather than `format!` so quotes and newlines in user content cannot corrupt
/// the JSON a model has to parse.
pub fn marshal(payload: &impl Serialize) -> String {
    serde_json::to_string_pretty(payload)
        .unwrap_or_else(|e| format!("could not encode result: {e}"))
}
