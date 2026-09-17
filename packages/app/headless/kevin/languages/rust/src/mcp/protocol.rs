//! The JSON-RPC 2.0 envelope: the transport- and store-agnostic framing that
//! MCP uses. Nothing here knows about `DB` or about tools.

use serde::{Deserialize, Serialize};
use serde_json::Value;

/// MCP revision this server implements.
pub const PROTOCOL_VERSION: &str = "2025-11-25";

/// Server identity advertised during `initialize`.
pub const SERVER_NAME: &str = "kevin-mcp";
pub const SERVER_VERSION: &str = "1.0.0";

/// JSON-RPC 2.0 and MCP error codes used by the server.
pub const ERR_PARSE: i32 = -32700;
pub const ERR_INVALID_REQUEST: i32 = -32600;
pub const ERR_METHOD_NOT_FOUND: i32 = -32601;
pub const ERR_INVALID_PARAMS: i32 = -32602;

/// An incoming JSON-RPC 2.0 message. A missing or null `id` marks it as a
/// notification, which is never answered.
#[derive(Debug, Default, Deserialize)]
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
    /// Reports whether this frame expects no reply.
    pub fn is_notification(&self) -> bool {
        self.id.is_none() || self.id == Some(Value::Null)
    }
}

/// An outgoing JSON-RPC 2.0 reply. Exactly one of `result` and `error` is set.
#[derive(Debug, Serialize)]
pub struct Response {
    pub jsonrpc: &'static str,
    pub id: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<ErrorObject>,
}

impl Response {
    /// Builds a success reply for `id`.
    pub fn ok(id: Option<Value>, result: Value) -> Self {
        Self {
            jsonrpc: "2.0",
            id,
            result: Some(result),
            error: None,
        }
    }

    /// Builds a JSON-RPC error reply for `id`.
    pub fn err(id: Option<Value>, code: i32, message: impl Into<String>) -> Self {
        Self {
            jsonrpc: "2.0",
            id,
            result: None,
            error: Some(ErrorObject {
                code,
                message: message.into(),
            }),
        }
    }
}

/// The JSON-RPC 2.0 `error` member.
#[derive(Debug, Serialize)]
pub struct ErrorObject {
    pub code: i32,
    pub message: String,
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn response_omits_the_unused_member() {
        let ok = serde_json::to_value(Response::ok(Some(json!(1)), json!({"pong": true}))).unwrap();
        assert_eq!(
            ok,
            json!({"jsonrpc": "2.0", "id": 1, "result": {"pong": true}})
        );

        let err = serde_json::to_value(Response::err(None, ERR_PARSE, "bad")).unwrap();
        assert_eq!(
            err,
            json!({"jsonrpc": "2.0", "id": null, "error": {"code": -32700, "message": "bad"}})
        );
    }

    #[test]
    fn request_without_id_is_a_notification() {
        let anonymous: Request =
            serde_json::from_str(r#"{"jsonrpc":"2.0","method":"ping"}"#).unwrap();
        assert!(anonymous.is_notification());

        let null: Request =
            serde_json::from_str(r#"{"jsonrpc":"2.0","id":null,"method":"ping"}"#).unwrap();
        assert!(null.is_notification());

        let addressed: Request =
            serde_json::from_str(r#"{"jsonrpc":"2.0","id":7,"method":"ping"}"#).unwrap();
        assert!(!addressed.is_notification());
    }
}
