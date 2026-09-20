//! Wire-level tests for the stdio JSON-RPC transport and method dispatch.

use super::frame::MAX_FRAME_BYTES;
use super::protocol::{
    ERR_INVALID_PARAMS, ERR_INVALID_REQUEST, ERR_METHOD_NOT_FOUND, ERR_PARSE, PROTOCOL_VERSION,
};
use super::schema::{Schema, Tool, ToolResult};
use super::server::Server;
use serde_json::{json, Value};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

fn echo_tool(name: &str) -> Tool {
    Tool {
        name: name.to_string(),
        description: "Echo its arguments back to the caller.".to_string(),
        input_schema: Schema {
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
fn decode(out: &[u8]) -> Vec<Value> {
    String::from_utf8(out.to_vec())
        .unwrap()
        .lines()
        .map(|line| serde_json::from_str(line).expect("each frame is valid JSON"))
        .collect()
}

fn exchange(frames: &[&str]) -> Vec<Value> {
    let input = frames.join("\n");
    let mut reader = std::io::BufReader::new(input.as_bytes());
    let mut out: Vec<u8> = Vec::new();
    server().run_with(&mut reader, &mut out).unwrap();
    decode(&out)
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
    let replies =
        exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"nope"}}"#]);
    assert_eq!(replies[0]["error"]["code"], ERR_METHOD_NOT_FOUND);
    assert!(replies[0]["error"]["message"]
        .as_str()
        .unwrap()
        .contains("tool not found"));
}

#[test]
fn tools_call_rejects_malformed_params() {
    let replies = exchange(&[r#"{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}"#]);
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

    let mut reader = std::io::BufReader::new(
        &b"{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":{\"name\":\"dup\"}}"
            [..],
    );
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

/// A `tools/call` notification must not run the tool. Otherwise a frame that
/// omits an id can flush the store with no reply to carry the result.
#[test]
fn a_tools_call_notification_never_reaches_the_handler() {
    let mut server = Server::new();
    let ran = Arc::new(AtomicUsize::new(0));
    let counter = Arc::clone(&ran);
    server.add_tool(
        echo_tool("destructive"),
        Box::new(move |_| {
            counter.fetch_add(1, Ordering::SeqCst);
            ToolResult::text(json!({"ok": true}))
        }),
    );

    let frame = r#"{"jsonrpc":"2.0","method":"tools/call","params":{"name":"destructive"}}"#;
    let mut reader = std::io::BufReader::new(frame.as_bytes());
    let mut out: Vec<u8> = Vec::new();
    server.run_with(&mut reader, &mut out).unwrap();

    assert!(out.is_empty(), "a notification must not be answered");
    assert_eq!(ran.load(Ordering::SeqCst), 0, "a notification ran the tool");
}

/// A notification with a bad jsonrpc version is still not answered: the
/// notification check has to precede version validation.
#[test]
fn a_malformed_notification_is_not_answered() {
    let replies = exchange(&[r#"{"method":"ping"}"#]);
    assert!(replies.is_empty(), "got {replies:?}");
}

/// A frame larger than the cap is a parse error, and the reader resynchronises
/// on the next newline.
#[test]
fn an_oversize_frame_is_a_parse_error_and_the_stream_recovers() {
    let oversized = format!(
        r#"{{"jsonrpc":"2.0","id":1,"method":"ping","params":{{"pad":"{}"}}}}"#,
        "x".repeat(MAX_FRAME_BYTES)
    );
    let input = format!(
        "{oversized}\n{}\n",
        r#"{"jsonrpc":"2.0","id":2,"method":"ping"}"#
    );

    let mut reader = std::io::BufReader::new(input.as_bytes());
    let mut out: Vec<u8> = Vec::new();
    server().run_with(&mut reader, &mut out).unwrap();
    let replies = decode(&out);

    assert!(replies.len() >= 2, "got {replies:?}");
    assert_eq!(replies[0]["error"]["code"], ERR_PARSE);
    assert_eq!(replies[replies.len() - 1]["id"], json!(2));
}

/// The version is echoed when the server speaks it, and the server's latest is
/// offered otherwise.
#[test]
fn initialize_negotiates_the_protocol_version() {
    for (requested, want) in [
        (PROTOCOL_VERSION, PROTOCOL_VERSION),
        ("1999-01-01", PROTOCOL_VERSION),
    ] {
        let frame = format!(
            r#"{{"jsonrpc":"2.0","id":1,"method":"initialize","params":{{"protocolVersion":"{requested}"}}}}"#
        );
        let replies = exchange(&[&frame]);
        assert_eq!(
            replies[0]["result"]["protocolVersion"], want,
            "for {requested}"
        );
    }
}
