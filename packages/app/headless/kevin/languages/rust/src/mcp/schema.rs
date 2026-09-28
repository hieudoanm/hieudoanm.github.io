//! MCP result and schema types: what `initialize`, `tools/list` and
//! `tools/call` return, and the JSON Schema subset describing tool inputs.

use super::protocol::{PROTOCOL_VERSION, SERVER_NAME, SERVER_VERSION};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::BTreeMap;

/// A single entry in the `tools/list` result.
#[derive(Debug, Clone, Serialize)]
pub struct Tool {
    pub name: String,
    pub description: String,
    #[serde(rename = "inputSchema")]
    pub input_schema: Schema,
}

/// A JSON Schema object restricted to the subset MCP tools need. Properties
/// live in a `BTreeMap` so serialisation order is stable for clients and tests.
#[derive(Debug, Clone, Serialize)]
pub struct Schema {
    #[serde(rename = "type")]
    pub kind: String,
    pub properties: BTreeMap<String, PropertySchema>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub required: Option<Vec<String>>,
}

/// One tool input property. Nested `items` cover array element types.
#[derive(Debug, Clone, Serialize)]
pub struct PropertySchema {
    #[serde(rename = "type")]
    pub kind: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub items: Option<Box<PropertySchema>>,
}

impl PropertySchema {
    /// An array property whose elements are described by `items`.
    pub fn array(description: &str, items: PropertySchema) -> Self {
        Self {
            kind: "array".to_string(),
            description: Some(description.to_string()),
            items: Some(Box::new(items)),
        }
    }
}

/// One piece of tool output. Only text is emitted.
#[derive(Debug, Clone, Serialize)]
pub struct ContentItem {
    #[serde(rename = "type")]
    pub kind: String,
    pub text: String,
}

/// The payload of a `tools/call` result.
#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolResult {
    pub content: Vec<ContentItem>,
    #[serde(skip_serializing_if = "is_false")]
    pub is_error: bool,
}

impl ToolResult {
    /// A successful result carrying `json` as text.
    pub fn text(json: Value) -> Self {
        Self::item(json.to_string(), false)
    }

    /// A failed result carrying a plain-text explanation. Tool failures are
    /// reported this way rather than as JSON-RPC errors so the model can see
    /// and react to them.
    pub fn failure(message: impl Into<String>) -> Self {
        Self::item(message.into(), true)
    }

    fn item(text: String, is_error: bool) -> Self {
        Self {
            content: vec![ContentItem {
                kind: "text".to_string(),
                text,
            }],
            is_error,
        }
    }
}

fn is_false(value: &bool) -> bool {
    !*value
}

/// The `params` of a `tools/call` request.
#[derive(Debug, Default, Deserialize)]
pub struct ToolCallParams {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub arguments: Option<Value>,
}

/// The reply to `initialize`.
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct InitializeResult {
    pub protocol_version: String,
    pub capabilities: ServerCapabilities,
    pub server_info: ServerInfo,
}

/// Advertises the features this server implements. Only tools are supported;
/// resources and prompts are not implemented.
#[derive(Debug, Serialize)]
pub struct ServerCapabilities {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tools: Option<ToolsCapabilities>,
}

/// Describes tool-related capabilities.
#[derive(Debug, Serialize)]
pub struct ToolsCapabilities {
    #[serde(rename = "listChanged")]
    pub list_changed: bool,
}

/// Identifies the server implementation.
#[derive(Debug, Serialize)]
pub struct ServerInfo {
    pub name: String,
    pub version: String,
}

/// The reply to `tools/list`.
#[derive(Debug, Serialize)]
pub struct ListToolsResult {
    pub tools: Vec<Tool>,
}

impl Default for InitializeResult {
    fn default() -> Self {
        Self::new()
    }
}

impl InitializeResult {
    /// Builds the result for `initialize`, advertising tools only.
    pub fn new() -> Self {
        Self::negotiated(None)
    }

    /// Builds the result, negotiating the protocol revision against the
    /// client's requested `protocolVersion`.
    ///
    /// A revision this server speaks is echoed back; anything else falls back to
    /// [`PROTOCOL_VERSION`] and the client is expected to disconnect if it
    /// cannot speak that either. Non-object or absent params negotiate nothing.
    pub fn negotiated(params: Option<&Value>) -> Self {
        Self {
            protocol_version: negotiated_version(params).to_string(),
            capabilities: ServerCapabilities {
                tools: Some(ToolsCapabilities {
                    list_changed: false,
                }),
            },
            server_info: ServerInfo {
                name: SERVER_NAME.to_string(),
                version: SERVER_VERSION.to_string(),
            },
        }
    }
}

/// Returns the revision to advertise to a client that requested `params`.
///
/// Returning an element of [`supported_protocol_versions`] rather than the
/// borrowed request keeps the result `&'static str`.
fn negotiated_version(params: Option<&Value>) -> &'static str {
    let requested = params
        .and_then(Value::as_object)
        .and_then(|params| params.get("protocolVersion"))
        .and_then(Value::as_str);
    supported_protocol_versions()
        .into_iter()
        .find(|version| Some(*version) == requested)
        .unwrap_or(PROTOCOL_VERSION)
}

/// The revisions this server can speak, newest first.
pub fn supported_protocol_versions() -> Vec<&'static str> {
    vec![PROTOCOL_VERSION]
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn initialize_reports_tools_only() {
        let value = serde_json::to_value(InitializeResult::new()).unwrap();
        assert_eq!(
            value,
            json!({
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"tools": {"listChanged": false}},
                "serverInfo": {"name": SERVER_NAME, "version": SERVER_VERSION},
            })
        );
    }

    #[test]
    fn tool_result_flags_failures() {
        let ok = serde_json::to_value(ToolResult::text(json!({"ok": true}))).unwrap();
        assert_eq!(
            ok,
            json!({"content": [{"type": "text", "text": "{\"ok\":true}"}]})
        );

        let bad = serde_json::to_value(ToolResult::failure("nope")).unwrap();
        assert_eq!(
            bad,
            json!({"content": [{"type": "text", "text": "nope"}], "isError": true})
        );
    }
}
