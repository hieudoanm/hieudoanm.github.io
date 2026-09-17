//! A Model Context Protocol server exposing Landify to LLM clients.
//!
//! The transport is newline-delimited JSON-RPC 2.0 over stdio. Every tool that
//! touches the filesystem goes through one sandboxed [`Workspace`], so none of
//! them can reach outside the server root.

pub mod handlers;
pub mod protocol;
pub mod tools;
pub mod transport;
pub mod workspace;

use anyhow::Result;
use std::io::Write;
use std::sync::Mutex;

use protocol::{error_code, error_response, success_response, Request, ToolResult};
use serde_json::Value;
use tools::{Tool, ToolHandler};
pub use workspace::Workspace;

/// An MCP server that dispatches requests to registered tools.
pub struct Server {
    out: Mutex<Box<dyn Write + Send>>,
    tools: Vec<Tool>,
    handlers: Vec<(&'static str, ToolHandler)>,
}

impl Server {
    /// Returns a server writing responses to `out`.
    ///
    /// Callers supply their own input with [`Server::serve`], so tests can
    /// drive the full protocol without touching the process stdio.
    pub fn new(out: Box<dyn Write + Send>) -> Server {
        Server {
            out: Mutex::new(out),
            tools: tools::tools(),
            handlers: Vec::new(),
        }
    }

    /// The tools this server advertises.
    pub fn tools(&self) -> &[Tool] {
        &self.tools
    }

    fn register(&mut self, name: &'static str, handler: ToolHandler) {
        self.handlers.push((name, handler));
    }

    /// Serves requests from `input` until EOF.
    pub fn serve(&mut self, input: impl std::io::Read) -> Result<()> {
        transport::serve(input, |frame| {
            if transport::is_too_long(frame) {
                self.write(error_response(
                    None,
                    error_code::PARSE,
                    "parse error: frame too large",
                ));
                return Ok(());
            }
            self.handle_message(frame);
            Ok(())
        })
    }

    /// Decodes one JSON-RPC frame and dispatches it. Undecodable frames produce
    /// an error reply.
    ///
    /// A notification — a frame with no id — is never answered, whatever the
    /// method, because replying to one desynchronises the client. The
    /// notification check precedes the version check, so a notification that is
    /// also malformed stays silent instead of producing a reply the client will
    /// never match to a request.
    fn handle_message(&self, raw: &str) {
        let request: Request = match serde_json::from_str(raw) {
            Ok(request) => request,
            Err(e) => {
                self.write(error_response(
                    None,
                    error_code::PARSE,
                    format!("parse error: {e}"),
                ));
                return;
            }
        };

        if request.is_notification() {
            eprintln!("[mcp] ignoring notification for method {}", request.method);
            return;
        }
        if request.jsonrpc != "2.0" {
            self.write(error_response(
                request.id,
                error_code::INVALID_REQUEST,
                "invalid jsonrpc version",
            ));
            return;
        }

        let id = request.id.clone();
        match request.method.as_str() {
            "initialize" => self.write(success_response(id, protocol::initialize_result())),
            "ping" => self.write(success_response(id, json_object())),
            "tools/list" => self.write(success_response(id, tools::list_result(&self.tools))),
            "tools/call" => self.handle_call(id, request.params),
            other => self.write(error_response(
                id,
                error_code::METHOD_NOT_FOUND,
                format!("method not found: {other}"),
            )),
        }
    }

    /// Decodes the call params and invokes the named tool handler.
    fn handle_call(&self, id: Option<Value>, params: Option<Value>) {
        // Only an absent or JSON-null params stands in for an empty object. Any
        // other non-object is a client bug worth reporting.
        let params = match params {
            None | Some(Value::Null) => json_object(),
            Some(Value::Object(map)) => Value::Object(map),
            Some(_) => {
                self.write(error_response(
                    id,
                    error_code::INVALID_PARAMS,
                    "invalid params: expected an object",
                ));
                return;
            }
        };
        let name = params
            .get("name")
            .and_then(Value::as_str)
            .unwrap_or_default()
            .to_string();
        let arguments = params.get("arguments").cloned().unwrap_or(Value::Null);

        let handler = self.handlers.iter().find(|(key, _)| *key == name);
        let Some((_, handler)) = handler else {
            self.write(error_response(
                id,
                error_code::METHOD_NOT_FOUND,
                format!("tool not found: {name}"),
            ));
            return;
        };
        let result: ToolResult = handler(&arguments);
        self.write(success_response(
            id,
            serde_json::to_value(result).unwrap_or_else(|_| json_object()),
        ));
    }

    fn write(&self, response: Value) {
        let mut out = self.out.lock().expect("response sink is not poisoned");
        if let Err(e) = writeln!(out, "{response}") {
            eprintln!("[mcp] could not write response: {e}");
        }
        let _ = out.flush();
    }
}

/// Adds the Landify tool surface to `server`.
///
/// Every tool that touches the filesystem goes through the same sandboxed
/// workspace, so none of them can reach outside the server root.
pub fn register(server: &mut Server, ws: &Workspace) {
    server.register(tools::TOOL_SCAFFOLD, handlers::handle_scaffold(ws));
    server.register(tools::TOOL_VALIDATE, handlers::handle_validate(ws));
    server.register(tools::TOOL_BUILD, handlers::handle_build(ws));
    server.register(tools::TOOL_TYPES, handlers::handle_types());
    server.register(tools::TOOL_THEMES, handlers::handle_themes());
    server.register(tools::TOOL_THEME_TOKENS, handlers::handle_theme_tokens(ws));
}

fn json_object() -> Value {
    Value::Object(serde_json::Map::new())
}

/// Runs the MCP server on stdio until the client closes the stream.
pub fn run(root: &str) -> Result<()> {
    let ws = Workspace::new(root)?;
    let mut server = Server::new(Box::new(std::io::stdout()));
    register(&mut server, &ws);
    server.serve(std::io::stdin())
}
