//! Protocol-level tests for the Landify MCP server, mirroring the Go suite.

use landify::mcp::protocol::error_code;
use landify::mcp::transport::MAX_FRAME_BYTES;
use landify::mcp::{register, Server, Workspace};
use serde_json::Value;
use std::io::{Cursor, Write};
use std::sync::{Arc, Mutex};
use tempfile::TempDir;

/// A minimal config that passes validation, used wherever the test is about the
/// tool rather than the schema. It uses the faq layout because that is the one
/// type needing no media assets.
const VALID_YAML: &str = r##"type: faq
site:
  name: Test Help
  description: Answers to common questions about the test page.
  nav:
    - label: Questions
      href: "#faq"
hero:
  headline: Questions, answered.
  subheadline: Straight answers to what people ask most often.
faq:
  items:
    - question: Does this need a build step?
      answer: No. Landify emits one flat HTML file with inline CSS.
cta:
  heading: Still curious?
  body: Ask a human and we answer within a day.
  button:
    label: Contact support
    href: mailto:support@example.com
footer:
  copyright: "© 2026 Test"
"##;

/// A `Write` sink a test can read back after the server has served.
#[derive(Clone)]
struct Sink(Arc<Mutex<Vec<u8>>>);

impl Sink {
    fn new() -> Sink {
        Sink(Arc::new(Mutex::new(Vec::new())))
    }

    fn frames(&self) -> Vec<Value> {
        let raw = self.0.lock().expect("sink lock").clone();
        String::from_utf8_lossy(&raw)
            .lines()
            .filter(|l| !l.trim().is_empty())
            .map(|l| serde_json::from_str(l).expect("every reply is one JSON document"))
            .collect()
    }
}

impl Write for Sink {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.0.lock().expect("sink lock").extend_from_slice(buf);
        Ok(buf.len())
    }

    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}

/// Feeds `input` to a server over `root` and returns the reply frames.
fn drive_in(root: &TempDir, input: &str) -> Vec<Value> {
    let ws = Workspace::new(root.path().to_str().expect("utf-8 path")).expect("workspace");
    let sink = Sink::new();
    let mut server = Server::new(Box::new(sink.clone()));
    register(&mut server, &ws);
    server
        .serve(Cursor::new(input.as_bytes().to_vec()))
        .expect("serve completes");
    sink.frames()
}

/// Feeds `input` to a server over a fresh temp root.
fn drive(input: &str) -> Vec<Value> {
    let dir = TempDir::new().expect("temp dir");
    drive_in(&dir, input)
}

/// The text of a `tools/call` reply, which is pretty-printed JSON.
fn call_text(frame: &Value) -> String {
    frame["result"]["content"][0]["text"]
        .as_str()
        .expect("text content")
        .to_string()
}

/// A `tools/call` request frame.
fn call(name: &str, arguments: &str) -> String {
    format!(
        r#"{{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{{"name":"{name}","arguments":{arguments}}}}}"#
    )
}

// A notification carries no id, so it must never be answered. Answering one
// desynchronises the client, so this applies to every method, not just unknown
// ones.
#[test]
fn notifications_are_never_answered_for_any_method() {
    let frames = [
        r#"{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-11-25"}}"#,
        r#"{"jsonrpc":"2.0","method":"ping"}"#,
        r#"{"jsonrpc":"2.0","method":"tools/list"}"#,
        r#"{"jsonrpc":"2.0","id":null,"method":"ping"}"#,
        r#"{"jsonrpc":"2.0","method":"notifications/initialized"}"#,
    ];
    for frame in frames {
        assert!(
            drive(&format!("{frame}\n")).is_empty(),
            "notification answered: {frame}"
        );
    }
}

// A notification that is also malformed stays silent: the notification check
// must precede the jsonrpc version check.
#[test]
fn a_malformed_notification_is_not_answered() {
    assert!(drive("{\"method\":\"ping\"}\n").is_empty());
    assert!(drive("{\"jsonrpc\":\"1.0\",\"method\":\"ping\"}\n").is_empty());
}

// The version is echoed so a client can confirm both sides speak it.
#[test]
fn initialize_reports_the_protocol_version_and_identity() {
    let frames = drive(
        "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"2025-11-25\"}}\n",
    );
    assert_eq!(frames.len(), 1);
    assert_eq!(frames[0]["result"]["protocolVersion"], "2025-11-25");
    assert_eq!(frames[0]["result"]["serverInfo"]["name"], "landify-mcp");
    assert_eq!(
        frames[0]["result"]["capabilities"]["tools"]["listChanged"],
        false
    );
}

// Absent params are tolerated and name no tool. A params of the wrong type is
// still rejected.
#[test]
fn tools_call_params_handling() {
    let absent = drive("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\"}\n");
    assert_eq!(absent.len(), 1);
    assert_eq!(absent[0]["error"]["code"], error_code::METHOD_NOT_FOUND);

    let wrong_type =
        drive("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":\"nope\"}\n");
    assert_eq!(wrong_type.len(), 1);
    assert_eq!(wrong_type[0]["error"]["code"], error_code::INVALID_PARAMS);
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
#[test]
fn an_overlong_frame_is_a_parse_error_and_the_stream_recovers() {
    let oversized = format!(
        r#"{{"jsonrpc":"2.0","id":1,"method":"ping","params":{{"pad":"{}"}}}}"#,
        "x".repeat(MAX_FRAME_BYTES)
    );
    let input = format!(
        "{oversized}\n{}\n",
        r#"{"jsonrpc":"2.0","id":2,"method":"ping"}"#
    );

    let frames = drive(&input);
    assert!(
        frames.len() >= 2,
        "expected a parse error and a reply, got {frames:?}"
    );
    assert_eq!(frames[0]["error"]["code"], error_code::PARSE);
    assert_eq!(frames.last().unwrap()["id"], 2);
}

// Every advertised tool is listed, so a model never hits a dead entry.
#[test]
fn every_advertised_tool_is_listed() {
    let frames = drive("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}\n");
    let listed: Vec<&str> = frames[0]["result"]["tools"]
        .as_array()
        .expect("tools array")
        .iter()
        .map(|t| t["name"].as_str().expect("tool name"))
        .collect();
    for name in [
        "landify_scaffold",
        "landify_validate",
        "landify_build",
        "landify_types",
        "landify_themes",
        "landify_theme_tokens",
    ] {
        assert!(listed.contains(&name), "missing {name} in {listed:?}");
    }
}

// The list is sorted so clients and tests see a stable order.
#[test]
fn the_tool_list_is_sorted() {
    let frames = drive("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}\n");
    let names: Vec<String> = frames[0]["result"]["tools"]
        .as_array()
        .expect("tools array")
        .iter()
        .map(|t| t["name"].as_str().expect("tool name").to_string())
        .collect();
    let mut sorted = names.clone();
    sorted.sort();
    assert_eq!(names, sorted);
}

// An unknown method is a protocol error, not a tool result.
#[test]
fn an_unknown_method_is_a_protocol_error() {
    let frames = drive("{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"resources/list\"}\n");
    assert_eq!(frames.len(), 1);
    assert_eq!(frames[0]["error"]["code"], error_code::METHOD_NOT_FOUND);
}

// types lists every supported page type with a real description, because a
// model picking a layout has no other way to know which one fits.
#[test]
fn types_describes_every_known_type() {
    let frames = drive(&format!("{}\n", call("landify_types", "{}")));
    let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
    assert_eq!(payload["count"], 12);
    let names: Vec<&str> = payload["types"]
        .as_array()
        .expect("types array")
        .iter()
        .map(|t| t["name"].as_str().expect("type name"))
        .collect();
    assert_eq!(names.len(), 12);
    for entry in payload["types"].as_array().expect("types array") {
        let description = entry["description"].as_str().expect("description");
        assert!(!description.is_empty(), "{entry} has no description");
    }
}

// A config that fails validation is a normal result the model can read and fix,
// not a transport failure.
#[test]
fn an_invalid_config_is_reported_as_a_result_not_an_error() {
    let frames = drive(&format!(
        "{}\n",
        call("landify_validate", r#"{"yaml":"type: nope\n"}"#)
    ));
    assert!(frames[0].get("error").is_none(), "{frames:?}");
    let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
    assert_eq!(payload["valid"], false);
    assert!(!payload["errors"].as_array().expect("errors").is_empty());
}

// A valid config validates cleanly.
#[test]
fn a_valid_config_validates() {
    let yaml = serde_json::to_string(VALID_YAML).expect("quoted yaml");
    let frames = drive(&format!(
        "{}\n",
        call("landify_validate", &format!(r#"{{"yaml":{yaml}}}"#))
    ));
    let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
    assert_eq!(payload["valid"], true, "{payload}");
    assert_eq!(payload["type"], "faq");
    assert_eq!(payload["source"], "inline");
}

// An unknown theme points at the themes tool rather than inlining all 64 names.
#[test]
fn an_unknown_theme_points_at_the_themes_tool() {
    let frames = drive(&format!(
        "{}\n",
        call("landify_theme_tokens", r#"{"theme":"nope"}"#)
    ));
    assert!(
        call_text(&frames[0]).contains("landify_themes"),
        "{frames:?}"
    );
}

// build renders a valid config and can write it inside the root.
#[test]
fn build_renders_the_markup_and_writes_the_output() {
    let dir = TempDir::new().expect("temp dir");
    let yaml = serde_json::to_string(VALID_YAML).expect("quoted yaml");
    let args = format!(r#"{{"yaml":{yaml},"output":"out/index.html"}}"#);
    let frames = drive_in(&dir, &format!("{}\n", call("landify_build", &args)));

    assert!(frames[0].get("error").is_none(), "{frames:?}");
    let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
    assert_eq!(payload["written"], "out/index.html");
    assert_eq!(payload["type"], "faq");
    let html = payload["html"].as_str().expect("html");
    assert!(
        html.starts_with("<!doctype html>"),
        "not a complete document"
    );
    // The reported byte count is the length of the markup, not of its text.
    assert_eq!(payload["bytes"].as_u64().expect("bytes"), html.len() as u64);
    assert!(dir.path().join("out/index.html").exists());
}

// An unusable output path fails before the page is rendered.
#[test]
fn an_output_outside_the_root_is_refused() {
    let dir = TempDir::new().expect("temp dir");
    let yaml = serde_json::to_string(VALID_YAML).expect("quoted yaml");
    let args = format!(r#"{{"yaml":{yaml},"output":"../escaped.html"}}"#);
    let frames = drive_in(&dir, &format!("{}\n", call("landify_build", &args)));
    assert_eq!(frames[0]["result"]["isError"], true);
    assert!(
        call_text(&frames[0]).contains("escapes the server root"),
        "{frames:?}"
    );
}

// Naming both sources is an error, because the two would silently disagree
// about which content wins.
#[test]
fn naming_both_yaml_and_path_is_refused() {
    let dir = TempDir::new().expect("temp dir");
    std::fs::write(dir.path().join("site.yaml"), VALID_YAML).expect("write config");
    let yaml = serde_json::to_string(VALID_YAML).expect("quoted yaml");
    let args = format!(r#"{{"yaml":{yaml},"path":"site.yaml"}}"#);
    let frames = drive_in(&dir, &format!("{}\n", call("landify_validate", &args)));
    assert_eq!(frames[0]["result"]["isError"], true);
    assert!(call_text(&frames[0]).contains("not both"), "{frames:?}");
}

// A config on disk is read from inside the root and labelled with its path.
#[test]
fn a_config_is_read_from_a_path_in_the_root() {
    let dir = TempDir::new().expect("temp dir");
    std::fs::write(dir.path().join("site.yaml"), VALID_YAML).expect("write config");
    let frames = drive_in(
        &dir,
        &format!("{}\n", call("landify_validate", r#"{"path":"site.yaml"}"#)),
    );
    let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
    assert_eq!(payload["valid"], true, "{payload}");
    assert_eq!(payload["source"], "site.yaml");
}

// A path that leaves the sandbox is refused rather than served.
#[test]
fn a_path_outside_the_root_is_refused() {
    let dir = TempDir::new().expect("temp dir");
    let args = r#"{"type":"product","path":"../escape.yaml"}"#;
    let frames = drive_in(&dir, &format!("{}\n", call("landify_scaffold", args)));
    assert_eq!(frames[0]["result"]["isError"], true);
    assert!(
        call_text(&frames[0]).contains("escapes the server root"),
        "{frames:?}"
    );
}

// Scaffolding writes inside the root and refuses to clobber without
// overwrite, so a model cannot silently destroy a config being edited.
#[test]
fn scaffold_writes_once_and_refuses_to_clobber() {
    let dir = TempDir::new().expect("temp dir");
    let args = r#"{"type":"product","path":"out/site.yaml"}"#;

    let first = drive_in(&dir, &format!("{}\n", call("landify_scaffold", args)));
    assert!(dir.path().join("out/site.yaml").exists());
    assert_eq!(
        serde_json::from_str::<Value>(&call_text(&first[0])).expect("payload")["written"],
        "out/site.yaml"
    );

    let second = drive_in(&dir, &format!("{}\n", call("landify_scaffold", args)));
    assert_eq!(second[0]["result"]["isError"], true);
    assert!(
        call_text(&second[0]).contains("already exists"),
        "{second:?}"
    );
}

// Overwriting is opt-in, so a model can replace a file it was asked to.
#[test]
fn scaffold_overwrites_when_asked() {
    let dir = TempDir::new().expect("temp dir");
    let args = r#"{"type":"product","path":"site.yaml","overwrite":true}"#;
    drive_in(&dir, &format!("{}\n", call("landify_scaffold", args)));
    std::fs::write(dir.path().join("site.yaml"), "stale").expect("clobber");
    let frames = drive_in(&dir, &format!("{}\n", call("landify_scaffold", args)));
    assert_ne!(
        std::fs::read_to_string(dir.path().join("site.yaml")).expect("read"),
        "stale"
    );
    assert!(frames[0].get("error").is_none(), "{frames:?}");
}

// A scaffolded config is legal, so a new file never starts invalid.
#[test]
fn every_scaffolded_config_validates() {
    for page_type in landify::validate::KNOWN_TYPES {
        let frames = drive(&format!(
            "{}\n",
            call("landify_scaffold", &format!(r#"{{"type":"{page_type}"}}"#))
        ));
        let yaml = serde_json::from_str::<Value>(&call_text(&frames[0])).expect("payload")["yaml"]
            .as_str()
            .expect("yaml")
            .to_string();
        let frames = drive(&format!(
            "{}\n",
            call(
                "landify_validate",
                &format!(
                    r#"{{"yaml":{}}}"#,
                    serde_json::to_string(&yaml).expect("quote")
                )
            )
        ));
        let payload: Value = serde_json::from_str(&call_text(&frames[0])).expect("json payload");
        assert_eq!(payload["valid"], true, "{page_type}: {payload}");
    }
}

// The theme catalogue can be filtered, and an unmatched query is empty rather
// than an error.
#[test]
fn themes_can_be_filtered_by_query() {
    let all = drive(&format!("{}\n", call("landify_themes", "{}")));
    let all = serde_json::from_str::<Value>(&call_text(&all[0])).expect("payload");
    assert_eq!(all["total"], 64);
    assert_eq!(all["count"], 64);

    let filtered = drive(&format!(
        "{}\n",
        call("landify_theme_tokens", r#"{"theme":"ocean"}"#)
    ));
    let tokens: Value = serde_json::from_str(&call_text(&filtered[0])).expect("payload");
    assert!(tokens["token_count"].as_u64().expect("token count") > 0);
    assert_eq!(tokens["source"], "preset:ocean");
}
