//! Newline-delimited JSON-RPC 2.0 stdio server: frame decoding, the
//! `initialize` / `tools/list` / `tools/call` methods, and the tool registry.

use super::frame::{Frame, FrameReader, MAX_FRAME_BYTES};
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
            let mut reader = FrameReader::new(stdin.lock());
            while let Ok(Some(frame)) = reader.next_frame() {
                if tx.send(frame).is_err() {
                    return;
                }
            }
            // A read error ends the stream; dropping the sender disconnects the
            // receiver, which is how the loop above learns to stop.
        });

        let mut stdout = std::io::stdout();
        while !stop.load(std::sync::atomic::Ordering::Relaxed) {
            match rx.recv_timeout(POLL) {
                Ok(frame) => self.answer(frame, &mut stdout)?,
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
        let mut reader = FrameReader::new(input);
        while let Some(frame) = reader.next_frame()? {
            self.answer(frame, out)?;
        }
        Ok(())
    }

    /// Dispatches one bounded frame. An oversize frame is reported as a parse
    /// error and never reaches a tool handler.
    fn answer(&mut self, frame: Frame, out: &mut dyn Write) -> anyhow::Result<()> {
        let raw = match frame {
            Frame::Line(line) => line,
            Frame::TooLong { bytes } => {
                let message = format!(
                    "parse error: frame of {bytes} bytes exceeds the {MAX_FRAME_BYTES} byte cap"
                );
                return write(out, Response::err(None, ERR_PARSE, message));
            }
        };
        self.dispatch(&raw, out)
    }

    /// Decodes one frame and answers it. Undecodable frames produce an error
    /// reply with a null id.
    ///
    /// A notification — a request with a null or missing `id` — is discarded
    /// before the version check, the method dispatch and any tool handler, so a
    /// frame without an id can never mutate the store and never gets a reply.
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
        if request.is_notification() {
            return Ok(());
        }
        if request.jsonrpc != "2.0" {
            return write(
                out,
                Response::err(
                    request.id.clone(),
                    ERR_INVALID_REQUEST,
                    "invalid jsonrpc version",
                ),
            );
        }

        let response = match request.method.as_str() {
            "initialize" => Some(Response::ok(
                request.id.clone(),
                json!(InitializeResult::negotiated(request.params.as_ref())),
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
        match response {
            Some(response) => write(out, response),
            None => Ok(()),
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
