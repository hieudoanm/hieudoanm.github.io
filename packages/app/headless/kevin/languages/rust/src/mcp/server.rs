//! Newline-delimited JSON-RPC 2.0 stdio server: frame decoding, the
//! `initialize` / `tools/list` / `tools/call` methods, and the tool registry.

use super::protocol::{
    Request, Response, ERR_INVALID_PARAMS, ERR_INVALID_REQUEST, ERR_METHOD_NOT_FOUND, ERR_PARSE,
};
use super::schema::{InitializeResult, ListToolsResult, Tool, ToolCallParams, ToolResult};
use serde_json::{json, Value};
use std::io::{BufRead, Write};
use std::sync::mpsc::{self, RecvTimeoutError};
use std::sync::Arc;
use std::time::Duration;
use tracing::debug;

/// How long a blocked stdin read is allowed to delay noticing a stop request.
const POLL: Duration = Duration::from_millis(100);

/// Executes one tool call. Failures are reported as an errored [`ToolResult`]
/// rather than as a JSON-RPC error so the model can see and react to them.
pub type ToolHandler = Box<dyn Fn(&Option<Value>) -> ToolResult>;

struct Registration {
    tool: Tool,
    handler: ToolHandler,
}

/// Dispatches MCP requests to registered tools over a stdio transport.
#[derive(Default)]
pub struct Server {
    tools: Vec<Registration>,
}

impl Server {
    pub fn new() -> Self {
        Self::default()
    }

    /// Registers `tool` and its handler, replacing any entry with the same name.
    pub fn add_tool(&mut self, tool: Tool, handler: ToolHandler) {
        self.tools.retain(|entry| entry.tool.name != tool.name);
        self.tools.push(Registration { tool, handler });
    }

    /// Serves requests from stdin until EOF. Signals are honoured by draining
    /// stdin on a background thread so a signal can interrupt a blocking read.
    pub fn serve_stdio(&mut self, stop: &Arc<std::sync::atomic::AtomicBool>) -> anyhow::Result<()> {
        let (tx, rx) = mpsc::channel();
        let stdin = std::io::stdin();
        std::thread::spawn(move || {
            for line in stdin.lock().lines() {
                if tx.send(line).is_err() {
                    return;
                }
            }
        });

        let mut stdout = std::io::stdout();
        while !stop.load(std::sync::atomic::Ordering::Relaxed) {
            match rx.recv_timeout(POLL) {
                Ok(Ok(line)) => {
                    if !line.trim().is_empty() {
                        self.dispatch(&line, &mut stdout)?;
                    }
                }
                Ok(Err(e)) => return Err(anyhow::Error::from(e).context("read stdin")),
                Err(RecvTimeoutError::Timeout) => continue,
                Err(RecvTimeoutError::Disconnected) => return Ok(()),
            }
        }
        Ok(())
    }

    /// Serves requests read from `input`, writing frames to `out`. A clean EOF
    /// returns `Ok`, which is how MCP clients signal shutdown.
    pub fn run_with(
        &mut self,
        input: &mut impl BufRead,
        out: &mut dyn Write,
    ) -> anyhow::Result<()> {
        for line in input.lines() {
            let line = line?;
            if !line.trim().is_empty() {
                self.dispatch(&line, out)?;
            }
        }
        Ok(())
    }

    /// Decodes one frame and answers it. Undecodable frames produce an error
    /// reply with a null id; notifications never get a reply.
    fn dispatch(&mut self, raw: &str, out: &mut dyn Write) -> anyhow::Result<()> {
        let request: Request = match serde_json::from_str(raw) {
            Ok(request) => request,
            Err(e) => {
                return write(
                    out,
                    Response::err(None, ERR_PARSE, format!("parse error: {e}")),
                );
            }
        };
        if request.jsonrpc != "2.0" {
            let message = "invalid jsonrpc version";
            return write(
                out,
                Response::err(request.id.clone(), ERR_INVALID_REQUEST, message),
            );
        }

        let response = match request.method.as_str() {
            "initialize" => Some(Response::ok(
                request.id.clone(),
                json!(InitializeResult::new()),
            )),
            "ping" => Some(Response::ok(request.id.clone(), json!({}))),
            "tools/list" => Some(Response::ok(
                request.id.clone(),
                json!(ListToolsResult {
                    tools: self.sorted_tools(),
                }),
            )),
            "tools/call" => self.call_tool(&request),
            other => {
                debug!(method = other, "unknown method");
                Some(Response::err(
                    request.id.clone(),
                    ERR_METHOD_NOT_FOUND,
                    format!("method not found: {other}"),
                ))
            }
        };
        // A notification carries no id and must never be answered, whatever
        // method it names.
        match response {
            Some(response) if !request.is_notification() => write(out, response),
            _ => Ok(()),
        }
    }

    /// Runs the named tool and wraps its result in a success reply. A malformed
    /// `params` or an unregistered name is a JSON-RPC error.
    fn call_tool(&self, request: &Request) -> Option<Response> {
        let id = request.id.clone();
        let params: ToolCallParams =
            match serde_json::from_value(request.params.clone().unwrap_or_else(|| json!({}))) {
                Ok(params) => params,
                Err(e) => {
                    return Some(Response::err(
                        id,
                        ERR_INVALID_PARAMS,
                        format!("invalid params: {e}"),
                    ))
                }
            };
        let Some(handler) = self.tools.iter().find(|e| e.tool.name == params.name) else {
            return Some(Response::err(
                id,
                ERR_METHOD_NOT_FOUND,
                format!("tool not found: {}", params.name),
            ));
        };
        let result = (handler.handler)(&params.arguments);
        Some(Response::ok(id, json!(result)))
    }

    /// Every registered tool, sorted by name so clients and tests see a
    /// stable order.
    pub fn sorted_tools(&self) -> Vec<Tool> {
        let mut tools: Vec<Tool> = self.tools.iter().map(|e| e.tool.clone()).collect();
        tools.sort_by(|a, b| a.name.cmp(&b.name));
        tools
    }
}

/// Emits one response frame and flushes it, so a client reading a pipe sees the
/// reply before it sends the next request. Diagnostics go to stderr via
/// `tracing`, leaving stdout to carry nothing but JSON-RPC frames.
fn write(out: &mut dyn Write, response: Response) -> anyhow::Result<()> {
    let mut frame = serde_json::to_string(&response)?;
    frame.push('\n');
    out.write_all(frame.as_bytes())?;
    out.flush()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn echo_tool(name: &str) -> Tool {
        Tool {
            name: name.to_string(),
            description: "Echo its arguments back to the caller.".to_string(),
            input_schema: super::super::schema::Schema {
                kind: "object".to_string(),
                properties: Default::default(),
                required: None,
            },
        }
    }

    fn server() -> Server {
        let mut server = Server::new();
        server.add_tool(
            echo_tool("b_second"),
            Box::new(|_| ToolResult::text(json!({"ok": true}))),
        );
        server.add_tool(
            echo_tool("a_first"),
            Box::new(|args| ToolResult::text(json!({"args": args}))),
        );
        server.add_tool(
            echo_tool("failing"),
            Box::new(|_| ToolResult::failure("boom")),
        );
        server
    }

    /// Feeds `frames` to a fresh server and returns the decoded replies.
    fn exchange(frames: &[&str]) -> Vec<Value> {
        let input = frames.join("\n");
        let mut reader = std::io::BufReader::new(input.as_bytes());
        let mut out: Vec<u8> = Vec::new();
        server().run_with(&mut reader, &mut out).unwrap();
        String::from_utf8(out)
            .unwrap()
            .lines()
            .map(|line| serde_json::from_str(line).expect("each frame is valid JSON"))
            .collect()
    }

    #[test]
    fn initialize_reports_the_negotiated_version_and_identity() {
        let replies = exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"initialize"}"#]);
        assert_eq!(
            replies[0]["result"],
            json!({
                "protocolVersion": "2025-11-25",
                "capabilities": {"tools": {"listChanged": false}},
                "serverInfo": {"name": "kevin-mcp", "version": "1.0.0"},
            })
        );
    }

    #[test]
    fn ping_returns_an_empty_result() {
        let replies = exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"ping"}"#]);
        assert_eq!(replies[0], json!({"jsonrpc": "2.0", "id": 1, "result": {}}));
    }

    #[test]
    fn tools_list_is_sorted_by_name() {
        let replies = exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"tools/list"}"#]);
        let names: Vec<&str> = replies[0]["result"]["tools"]
            .as_array()
            .unwrap()
            .iter()
            .map(|t| t["name"].as_str().unwrap())
            .collect();
        assert_eq!(names, vec!["a_first", "b_second", "failing"]);
    }

    #[test]
    fn a_notification_gets_no_reply() {
        let frames = [
            r#"{"jsonrpc":"2.0","method":"ping"}"#,
            r#"{"jsonrpc":"2.0","id":null,"method":"ping"}"#,
            r#"{"jsonrpc":"2.0","method":"tools/list"}"#,
            r#"{"jsonrpc":"2.0","method":"tools/call","params":{"name":"a_first"}}"#,
            r#"{"jsonrpc":"2.0","method":"notifications/initialized"}"#,
        ];
        assert!(exchange(&frames).is_empty());
    }

    #[test]
    fn an_unknown_method_is_reported_but_a_notification_is_not() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"resources/list"}"#,
            r#"{"jsonrpc":"2.0","method":"resources/list"}"#,
        ]);
        assert_eq!(replies.len(), 1);
        assert_eq!(replies[0]["error"]["code"], ERR_METHOD_NOT_FOUND);
    }

    #[test]
    fn an_undecodable_frame_becomes_a_parse_error_with_a_null_id() {
        let replies = exchange(&["{not json"]);
        assert_eq!(replies[0]["id"], Value::Null);
        assert_eq!(replies[0]["error"]["code"], ERR_PARSE);
    }

    #[test]
    fn a_wrong_jsonrpc_version_is_rejected() {
        let replies = exchange(&[r#"{"jsonrpc":"1.0","id":1,"method":"ping"}"#]);
        assert_eq!(replies[0]["error"]["code"], ERR_INVALID_REQUEST);
    }

    #[test]
    fn tools_call_reaches_the_handler_with_its_arguments() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"a_first","arguments":{"key":"k"}}}"#,
        ]);
        assert_eq!(
            replies[0]["result"]["content"][0]["text"],
            r#"{"args":{"key":"k"}}"#
        );
    }

    #[test]
    fn tools_call_propagates_a_handler_failure_as_is_error() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"failing","arguments":{}}}"#,
        ]);
        assert_eq!(replies[0]["result"]["isError"], true);
        assert_eq!(replies[0]["result"]["content"][0]["text"], "boom");
    }

    #[test]
    fn tools_call_rejects_an_unknown_tool() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"nope"}}"#,
        ]);
        assert_eq!(replies[0]["error"]["code"], ERR_METHOD_NOT_FOUND);
        assert!(replies[0]["error"]["message"]
            .as_str()
            .unwrap()
            .contains("tool not found"));
    }

    #[test]
    fn tools_call_rejects_malformed_params() {
        let replies =
            exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}"#]);
        assert_eq!(replies[0]["error"]["code"], ERR_INVALID_PARAMS);
    }

    #[test]
    fn tools_call_tolerates_absent_params() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"a_first"}}"#,
        ]);
        assert_eq!(
            replies[0]["result"]["content"][0]["text"],
            r#"{"args":null}"#
        );
    }

    #[test]
    fn blank_lines_and_multiple_frames_are_skipped() {
        let replies = exchange(&[
            r#"{"jsonrpc":"2.0","id":1,"method":"ping"}"#,
            "",
            "   ",
            r#"{"jsonrpc":"2.0","id":2,"method":"ping"}"#,
        ]);
        assert_eq!(replies.len(), 2);
        assert_eq!(replies[1]["id"], json!(2));
    }

    #[test]
    fn a_frame_without_a_trailing_newline_is_answered() {
        let mut reader =
            std::io::BufReader::new(&b"{\"jsonrpc\":\"2.0\",\"id\":9,\"method\":\"ping\"}"[..]);
        let mut out: Vec<u8> = Vec::new();
        server().run_with(&mut reader, &mut out).unwrap();
        assert_eq!(String::from_utf8(out).unwrap().lines().count(), 1);
    }

    #[test]
    fn registering_the_same_name_twice_replaces_the_handler() {
        let mut server = Server::new();
        server.add_tool(echo_tool("dup"), Box::new(|_| ToolResult::failure("first")));
        server.add_tool(
            echo_tool("dup"),
            Box::new(|_| ToolResult::failure("second")),
        );
        assert_eq!(server.sorted_tools().len(), 1);

        let mut reader =
            std::io::BufReader::new(&b"{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":{\"name\":\"dup\"}}"[..]);
        let mut out: Vec<u8> = Vec::new();
        server.run_with(&mut reader, &mut out).unwrap();
        let text = String::from_utf8(out).unwrap();
        assert!(text.contains("second"), "got {text}");
    }

    #[test]
    fn an_empty_store_never_produces_a_frame() {
        let mut reader = std::io::BufReader::new(&b"\n   \n"[..]);
        let mut out: Vec<u8> = Vec::new();
        server().run_with(&mut reader, &mut out).unwrap();
        assert!(out.is_empty());
    }
}
