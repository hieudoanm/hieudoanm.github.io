//! End-to-end MCP coverage: the tool contract driven through the wire protocol
//! against every store backend, plus snapshot persistence across a restart.

use kevin::db::DB;
use kevin::mcp::store::DbStore;
use kevin::mcp::tcp_store::TcpStore;
use kevin::mcp::{new_server, Server, Session, Store};
use kevin::server;
use serde_json::{json, Value};
use std::io::{BufReader, Write};
use std::net::{SocketAddr, TcpListener};
use std::process::{Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread::JoinHandle;

/// The resources one store backend needs, dropped after each test so a
/// listening server never outlives its assertions.
enum Harness {
    Embedded,
    Tcp {
        addr: SocketAddr,
        stop: Arc<AtomicBool>,
        handle: Option<JoinHandle<std::io::Result<()>>>,
    },
}

impl Drop for Harness {
    fn drop(&mut self) {
        let Harness::Tcp { stop, handle, .. } = self else {
            return;
        };
        stop.store(true, Ordering::Relaxed);
        if let Some(handle) = handle.take() {
            let _ = handle.join();
        }
    }
}

impl Harness {
    /// An in-process store over a fresh [`DB`].
    fn embedded() -> Self {
        Harness::Embedded
    }

    /// A store proxied to a real `kevin serve` bound to a random port.
    fn tcp() -> Self {
        let listener = TcpListener::bind("127.0.0.1:0").unwrap();
        let addr = listener.local_addr().unwrap();
        let stop = Arc::new(AtomicBool::new(false));
        let server_stop = Arc::clone(&stop);
        let handle =
            std::thread::spawn(move || server::serve(listener, Arc::new(DB::new()), server_stop));
        Harness::Tcp {
            addr,
            stop,
            handle: Some(handle),
        }
    }

    fn store(&self) -> Arc<dyn Store> {
        match self {
            Harness::Embedded => Arc::new(DbStore::new(Arc::new(DB::new()))),
            Harness::Tcp { addr, .. } => {
                Arc::new(TcpStore::connect(&addr.to_string()).expect("connect to kevin serve"))
            }
        }
    }
}

/// One MCP session: a store plus the server that dispatches tool calls to it.
struct Client {
    _harness: Harness,
    server: Server,
}

impl Client {
    fn new(harness: Harness) -> Self {
        let server = new_server(harness.store());
        Self {
            _harness: harness,
            server,
        }
    }

    /// Sends one `tools/call` frame and returns the `result` member.
    fn call(&mut self, name: &str, arguments: Value) -> Value {
        let frame = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {"name": name, "arguments": arguments},
        })
        .to_string();
        let mut reader = BufReader::new(frame.as_bytes());
        let mut out: Vec<u8> = Vec::new();
        self.server.run_with(&mut reader, &mut out).unwrap();
        let reply: Value = serde_json::from_slice(&out).expect("exactly one reply frame");
        reply["result"].clone()
    }
}

/// The text payload of a successful result.
fn text(result: &Value) -> String {
    assert!(
        result.get("isError").is_none(),
        "expected success: {result}"
    );
    result["content"][0]["text"].as_str().unwrap().to_string()
}

/// The text payload of a failed result.
fn error_text(result: &Value) -> String {
    assert_eq!(result["isError"], true, "expected a failure: {result}");
    result["content"][0]["text"].as_str().unwrap().to_string()
}

/// The parsed payload of a successful result.
fn json_text(result: &Value) -> Value {
    serde_json::from_str(&text(result)).unwrap()
}

/// The behaviour every store backend must share, so the in-process and TCP
/// implementations are held to the same contract.
fn store_contract(harness: Harness) {
    let mut client = Client::new(harness);

    assert_eq!(
        json_text(&client.call("kevin_ping", json!({}))),
        json!({"pong": true})
    );

    client.call("kevin_set", json!({"key": "a", "value": "one"}));
    assert_eq!(
        json_text(&client.call("kevin_get", json!({"key": "a"}))),
        json!({"found": true, "value": "one"})
    );
    assert_eq!(
        json_text(&client.call("kevin_get", json!({"key": "missing"}))),
        json!({"found": false, "value": null})
    );

    let stored = client.call("kevin_set", json!({"key": "b", "value": "2"}));
    assert_eq!(json_text(&stored), json!({"ok": true}));
    assert_eq!(
        json_text(&client.call("kevin_keys", json!({}))),
        json!({"keys": ["a", "b"], "count": 2})
    );
    assert_eq!(
        json_text(&client.call("kevin_len", json!({}))),
        json!({"count": 2})
    );
    assert_eq!(
        json_text(&client.call("kevin_exists", json!({"key": "b"}))),
        json!({"exists": true})
    );
    assert_eq!(
        json_text(&client.call("kevin_exists", json!({"key": "missing"}))),
        json!({"exists": false})
    );

    assert_eq!(
        json_text(&client.call("kevin_ttl", json!({"key": "b"}))),
        json!({"key": "b", "seconds": -1, "state": "no-expiry"})
    );
    assert_eq!(
        json_text(&client.call("kevin_ttl", json!({"key": "missing"}))),
        json!({"key": "missing", "seconds": -2, "state": "missing"})
    );
    client.call(
        "kevin_set",
        json!({"key": "c", "value": "3", "ttl_seconds": 60}),
    );
    let expiring = json_text(&client.call("kevin_ttl", json!({"key": "c"})));
    assert_eq!(expiring["state"], "expiring");
    assert!((1..=60).contains(&expiring["seconds"].as_i64().unwrap()));

    assert_eq!(
        json_text(&client.call("kevin_expire", json!({"key": "b", "seconds": 30}))),
        json!({"ok": true})
    );
    assert_eq!(
        json_text(&client.call("kevin_expire", json!({"key": "missing", "seconds": 30}))),
        json!({"ok": false})
    );

    assert_eq!(
        json_text(&client.call("kevin_del", json!({"keys": ["b", "missing"]}))),
        json!({"deleted": 1})
    );
    assert_eq!(
        json_text(&client.call("kevin_flush", json!({"confirm": true}))),
        json!({"deleted": 2})
    );
    assert_eq!(
        json_text(&client.call("kevin_len", json!({}))),
        json!({"count": 0})
    );
}

/// Argument validation every backend shares, so the tools fail the same way
/// whichever store they are bound to.
fn tool_argument_contract(harness: Harness) {
    let mut client = Client::new(harness);

    assert!(
        error_text(&client.call("kevin_set", json!({"value": "v"}))).contains("key is required")
    );
    assert!(
        error_text(&client.call("kevin_set", json!({"key": "k"}))).contains("value is required")
    );
    assert!(
        error_text(&client.call("kevin_set", json!({"key": "  ", "value": "v"})))
            .contains("must not be blank")
    );
    assert!(error_text(&client.call("kevin_get", json!({}))).contains("key is required"));
    assert!(error_text(&client.call("kevin_del", json!({"keys": []}))).contains("at least one key"));
    assert!(error_text(&client.call("kevin_ttl", json!({}))).contains("key is required"));
    assert!(
        error_text(&client.call("kevin_expire", json!({"key": "k", "seconds": 0})))
            .contains("greater than 0")
    );
    assert!(
        error_text(&client.call("kevin_flush", json!({"confirm": false})))
            .contains("confirm must be true")
    );
    assert!(error_text(&client.call("kevin_flush", json!({}))).contains("confirm must be true"));

    // Nothing above should have written to the store.
    assert_eq!(
        json_text(&client.call("kevin_len", json!({}))),
        json!({"count": 0})
    );
}

#[test]
fn the_embedded_store_satisfies_the_contract() {
    store_contract(Harness::embedded());
}

#[test]
fn the_embedded_store_accepts_keys_and_values_with_spaces() {
    // The inline protocol tokenises on spaces, so this capability exists only
    // for an in-process store.
    let mut client = Client::new(Harness::embedded());
    let stored = client.call("kevin_set", json!({"key": "a key", "value": "a value"}));
    assert_eq!(json_text(&stored), json!({"ok": true}));
    assert_eq!(
        json_text(&client.call("kevin_get", json!({"key": "a key"}))),
        json!({"found": true, "value": "a value"})
    );
}

#[test]
fn the_tcp_store_satisfies_the_contract() {
    store_contract(Harness::tcp());
}

#[test]
fn both_backends_reject_malformed_arguments_alike() {
    tool_argument_contract(Harness::embedded());
    tool_argument_contract(Harness::tcp());
}

#[test]
fn the_tcp_store_shares_state_with_the_running_server() {
    let harness = Harness::tcp();
    let addr = match &harness {
        Harness::Tcp { addr, .. } => *addr,
        Harness::Embedded => panic!("expected a TCP harness"),
    };
    let mut client = Client::new(harness);

    client.call("kevin_set", json!({"key": "shared", "value": "yes"}));

    // A separate store on the same address must see the write, which only
    // happens if the data lives in the server rather than the proxy.
    let observer: Arc<dyn Store> = Arc::new(TcpStore::connect(&addr.to_string()).unwrap());
    assert_eq!(observer.get("shared").unwrap(), ("yes".to_string(), true));
}

#[test]
fn a_tcp_set_with_ttl_preserves_a_value_containing_ex() {
    // The expiry is applied with a follow-up EXPIRE rather than the
    // "SET key value EX n" form, whose handler searches the value for " EX ".
    let mut client = Client::new(Harness::tcp());
    let value = "prefix-EX-suffix";
    client.call(
        "kevin_set",
        json!({"key": "k", "value": value, "ttl_seconds": 60}),
    );

    let stored = json_text(&client.call("kevin_get", json!({"key": "k"})));
    assert_eq!(stored, json!({"found": true, "value": value}));
    assert_eq!(
        json_text(&client.call("kevin_ttl", json!({"key": "k"})))["state"],
        "expiring"
    );
}

#[test]
fn the_tcp_store_surfaces_a_server_side_error() {
    // A non-positive expire time is rejected by the server with a Redis-style
    // "ERR ..." reply. The tool layer rejects such a value first, so the store
    // is driven directly to reach the protocol error.
    let harness = Harness::tcp();
    let store = harness.store();
    let failure = store
        .expire("k", -5)
        .expect_err("a negative expire time must fail")
        .to_string();
    assert!(failure.contains("ERR invalid expire time"), "got {failure}");
}

#[test]
fn the_tcp_store_rejects_a_token_the_protocol_cannot_carry() {
    let mut client = Client::new(Harness::tcp());
    let failure = error_text(&client.call("kevin_set", json!({"key": "a key", "value": "v"})));
    assert!(failure.contains("must not contain spaces"), "got {failure}");
}

#[test]
fn every_catalogued_tool_is_reachable_over_the_protocol() {
    let mut client = Client::new(Harness::embedded());
    for name in [
        "kevin_ping",
        "kevin_set",
        "kevin_get",
        "kevin_del",
        "kevin_exists",
        "kevin_keys",
        "kevin_len",
        "kevin_ttl",
        "kevin_expire",
        "kevin_flush",
    ] {
        let frame = json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {"name": name},
        })
        .to_string();
        let mut reader = BufReader::new(frame.as_bytes());
        let mut out: Vec<u8> = Vec::new();
        client.server.run_with(&mut reader, &mut out).unwrap();
        let reply: Value = serde_json::from_slice(&out).unwrap();
        assert!(
            reply.get("error").is_none(),
            "{name} is not registered: {reply}"
        );
    }
}

#[test]
fn a_persisted_session_survives_a_restart() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("kevin.json");
    let path = path.to_string_lossy().into_owned();

    {
        let session = Session::open(None, Some(&path)).unwrap();
        let mut server = new_server(session.store());
        let frame = json!({
            "jsonrpc": "2.0", "id": 1, "method": "tools/call",
            "params": {"name": "kevin_set", "arguments": {"key": "persisted", "value": "yes"}},
        })
        .to_string();
        let mut reader = BufReader::new(frame.as_bytes());
        let mut out: Vec<u8> = Vec::new();
        server.run_with(&mut reader, &mut out).unwrap();
        session.finish();
    }

    let session = Session::open(None, Some(&path)).unwrap();
    let mut server = new_server(session.store());
    let frame = json!({
        "jsonrpc": "2.0", "id": 1, "method": "tools/call",
        "params": {"name": "kevin_get", "arguments": {"key": "persisted"}},
    })
    .to_string();
    let mut reader = BufReader::new(frame.as_bytes());
    let mut out: Vec<u8> = Vec::new();
    server.run_with(&mut reader, &mut out).unwrap();
    let reply: Value = serde_json::from_slice(&out).unwrap();
    assert_eq!(
        reply["result"]["content"][0]["text"],
        r#"{"found":true,"value":"yes"}"#
    );
    session.finish();
}

#[test]
fn the_stdio_transport_reserves_stdout_for_json_rpc() {
    // A log line on stdout corrupts the stream and breaks the client, yet no
    // in-process test can observe it: only the real binary can.
    let mut child = Command::new(env!("CARGO_BIN_EXE_kevin"))
        .args(["mcp", "serve"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("kevin mcp serve should start");

    let mut stdin = child.stdin.take().expect("piped stdin");
    for frame in [
        r#"{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"test","version":"0"}}}"#,
        r#"{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"kevin_ping","arguments":{}}}"#,
    ] {
        writeln!(stdin, "{frame}").expect("write frame");
    }
    stdin.flush().expect("flush frames");
    // Closing stdin ends the session, which lets the server exit.
    drop(stdin);

    let output = child.wait_with_output().expect("kevin should exit");
    assert!(
        output.status.success(),
        "kevin exited with {}",
        output.status
    );

    let stdout = String::from_utf8(output.stdout).expect("utf-8 stdout");
    let frames: Vec<&str> = stdout.lines().collect();
    assert_eq!(
        frames.len(),
        2,
        "stdout carried non-protocol output: {stdout}"
    );
    for frame in &frames {
        let parsed: Value = serde_json::from_str(frame)
            .unwrap_or_else(|e| panic!("stdout line is not JSON: {frame:?} ({e})"));
        assert_eq!(parsed["jsonrpc"], "2.0", "unexpected frame: {frame}");
    }
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("mcp server ready"),
        "logs should reach stderr"
    );
}
