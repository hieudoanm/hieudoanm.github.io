use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use std::io::{self, BufRead, Write};

pub const PROTOCOL_VERSION: &str = "2025-11-25";

#[derive(Deserialize)]
pub struct Request {
    pub jsonrpc: String,
    pub id: Option<Value>,
    pub method: String,
    pub params: Option<Value>,
}

#[derive(Serialize)]
pub struct Response {
    pub jsonrpc: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<ErrorObject>,
}

#[derive(Serialize)]
pub struct ErrorObject {
    pub code: i32,
    pub message: String,
}

#[derive(Clone, Serialize)]
pub struct Tool {
    pub name: String,
    pub description: String,
    #[serde(rename = "inputSchema")]
    pub input_schema: Schema,
}

#[derive(Clone, Serialize)]
pub struct Schema {
    #[serde(rename = "type")]
    pub schema_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub properties: Option<HashMap<String, PropertySchema>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub required: Option<Vec<String>>,
}

#[derive(Clone, Serialize)]
pub struct PropertySchema {
    #[serde(rename = "type")]
    pub prop_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub default: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub items: Option<Box<PropertySchema>>,
}

pub struct Server {
    tools: Vec<Tool>,
    handlers: HashMap<String, Box<dyn Fn(Value) -> Value + Send + Sync>>,
}

impl Server {
    pub fn new() -> Self {
        Self {
            tools: Vec::new(),
            handlers: HashMap::new(),
        }
    }

    pub fn add_tool<F>(&mut self, tool: Tool, handler: F)
    where
        F: Fn(Value) -> Value + Send + Sync + 'static,
    {
        self.handlers.insert(tool.name.clone(), Box::new(handler));
        self.tools.push(tool);
    }

    pub fn run(&self) -> anyhow::Result<()> {
        let stdin = io::stdin();
        let stdout = io::stdout();

        for line in stdin.lock().lines() {
            let line = line?;
            let line = line.trim().to_string();
            if line.is_empty() {
                continue;
            }

            let raw = line.as_bytes().to_vec();
            self.handle_message(&raw, &stdout)?;
        }

        Ok(())
    }

    fn handle_message(&self, raw: &[u8], stdout: &io::Stdout) -> anyhow::Result<()> {
        let msg: Request = match serde_json::from_slice(raw) {
            Ok(m) => m,
            Err(e) => {
                let resp = new_error(None, -32700, &format!("parse error: {e}"));
                write_response(stdout, &resp)?;
                return Ok(());
            }
        };

        if msg.jsonrpc != "2.0" {
            let resp = new_error(msg.id, -32600, "invalid jsonrpc version");
            write_response(stdout, &resp)?;
            return Ok(());
        }

        let is_notification = msg.id.is_none() || msg.id.as_ref().is_some_and(|v| v.is_null());

        match msg.method.as_str() {
            "initialize" => self.handle_initialize(msg.id, stdout)?,
            "ping" => {
                let resp = new_success(msg.id, Value::Object(Default::default()));
                write_response(stdout, &resp)?;
            }
            "tools/list" => self.handle_list_tools(msg.id, stdout)?,
            "tools/call" => self.handle_call_tool(msg.id, msg.params, stdout)?,
            _ => {
                if !is_notification {
                    let resp =
                        new_error(msg.id, -32601, &format!("method not found: {}", msg.method));
                    write_response(stdout, &resp)?;
                }
            }
        }

        Ok(())
    }

    fn handle_initialize(&self, id: Option<Value>, stdout: &io::Stdout) -> anyhow::Result<()> {
        let result = serde_json::json!({
            "protocolVersion": PROTOCOL_VERSION,
            "capabilities": {
                "tools": { "listChanged": false }
            },
            "serverInfo": {
                "name": "hieudoanm-mcp",
                "version": "1.0.0"
            }
        });
        write_response(stdout, &new_success(id, result))?;
        Ok(())
    }

    fn handle_list_tools(&self, id: Option<Value>, stdout: &io::Stdout) -> anyhow::Result<()> {
        let result = serde_json::json!({
            "tools": self.tools
        });
        write_response(stdout, &new_success(id, result))?;
        Ok(())
    }

    fn handle_call_tool(
        &self,
        id: Option<Value>,
        params: Option<Value>,
        stdout: &io::Stdout,
    ) -> anyhow::Result<()> {
        let params = match params {
            Some(p) => p,
            None => {
                let resp = new_error(id.clone(), -32602, "missing params");
                write_response(stdout, &resp)?;
                return Ok(());
            }
        };

        let name = params["name"].as_str().unwrap_or("").to_string();
        let args = params["arguments"].clone();

        let handler = match self.handlers.get(&name) {
            Some(h) => h,
            None => {
                let resp = new_error(id.clone(), -32601, &format!("tool not found: {name}"));
                write_response(stdout, &resp)?;
                return Ok(());
            }
        };

        let result = handler(args);
        write_response(stdout, &new_success(id, result))?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_new_success_with_id() {
        let resp = new_success(Some(json!(1)), json!({"ok": true}));
        assert_eq!(resp.jsonrpc, "2.0");
        assert_eq!(resp.id, Some(json!(1)));
        assert_eq!(resp.result, Some(json!({"ok": true})));
        assert!(resp.error.is_none());
    }

    #[test]
    fn test_new_success_null_id() {
        let resp = new_success(None, json!("done"));
        assert_eq!(resp.jsonrpc, "2.0");
        assert_eq!(resp.id, None);
        assert_eq!(resp.result, Some(json!("done")));
    }

    #[test]
    fn test_new_error_with_code_and_message() {
        let resp = new_error(Some(json!(1)), -32601, "method not found");
        assert_eq!(resp.jsonrpc, "2.0");
        assert_eq!(resp.id, Some(json!(1)));
        assert!(resp.result.is_none());
        let err = resp.error.unwrap();
        assert_eq!(err.code, -32601);
        assert_eq!(err.message, "method not found");
    }

    #[test]
    fn test_new_error_parse_error() {
        let resp = new_error(None, -32700, "parse error");
        assert_eq!(resp.jsonrpc, "2.0");
        assert!(resp.id.is_none());
        let err = resp.error.unwrap();
        assert_eq!(err.code, -32700);
    }

    #[test]
    fn test_new_tool_result_text() {
        let val = new_tool_result_text("hello");
        assert_eq!(val["content"][0]["type"], "text");
        assert_eq!(val["content"][0]["text"], "hello");
        assert!(val.get("isError").is_none());
    }

    #[test]
    fn test_new_tool_result_error() {
        let val = new_tool_result_error("error msg");
        assert_eq!(val["content"][0]["type"], "text");
        assert_eq!(val["content"][0]["text"], "error msg");
        assert_eq!(val["isError"], true);
    }

    #[test]
    fn test_server_new() {
        let server = Server::new();
        assert!(server.tools.is_empty());
    }
}

fn new_success(id: Option<Value>, result: Value) -> Response {
    Response {
        jsonrpc: "2.0".to_string(),
        id,
        result: Some(result),
        error: None,
    }
}

fn new_error(id: Option<Value>, code: i32, message: &str) -> Response {
    Response {
        jsonrpc: "2.0".to_string(),
        id,
        result: None,
        error: Some(ErrorObject {
            code,
            message: message.to_string(),
        }),
    }
}

fn write_response(stdout: &io::Stdout, resp: &Response) -> anyhow::Result<()> {
    let data = serde_json::to_string(resp)?;
    let mut handle = stdout.lock();
    writeln!(handle, "{data}")?;
    handle.flush()?;
    Ok(())
}

pub fn new_tool_result_text(text: &str) -> Value {
    serde_json::json!({
        "content": [{"type": "text", "text": text}]
    })
}

pub fn new_tool_result_error(text: &str) -> Value {
    serde_json::json!({
        "content": [{"type": "text", "text": text}],
        "isError": true
    })
}
