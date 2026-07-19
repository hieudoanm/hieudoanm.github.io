use std::io::{BufRead, BufReader, Read, Write};
use std::process::{Command, Stdio};
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_jack"))
}

fn read_lines_with_timeout<R: Read + Send + 'static>(reader: R, timeout: Duration) -> String
where
    R: std::io::Read,
{
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let mut output = String::new();
        let mut buf = BufReader::new(reader);
        let mut line = String::new();
        loop {
            line.clear();
            match buf.read_line(&mut line) {
                Ok(0) => break,
                Ok(_) => output.push_str(&line),
                Err(_) => break,
            }
        }
        let _ = tx.send(output);
    });
    match rx.recv_timeout(timeout) {
        Ok(s) => s,
        Err(_) => String::new(),
    }
}

#[test]
fn mcp_serve_registers_tools() {
    let mut child = binary()
        .args(["mcp", "serve"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("failed to spawn mcp serve");

    // Give time for the server to print to stderr
    thread::sleep(Duration::from_millis(500));

    // Close stdin to let the server exit cleanly
    drop(child.stdin.take());

    // Read stderr with timeout
    let stderr = child
        .stderr
        .take()
        .map(|e| read_lines_with_timeout(e, Duration::from_secs(3)))
        .unwrap_or_default();

    let _ = child.wait();

    assert!(
        stderr.contains("tools registered"),
        "stderr should show 'tools registered', got: {stderr:?}"
    );
}

#[test]
fn mcp_serve_responds_to_initialize() {
    let mut child = binary()
        .args(["mcp", "serve"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("failed to spawn mcp serve");

    thread::sleep(Duration::from_millis(300));

    let request = r#"{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}"#;
    if let Some(stdin) = child.stdin.as_mut() {
        stdin.write_all(request.as_bytes()).unwrap();
        stdin.write_all(b"\n").unwrap();
        stdin.flush().unwrap();
    }

    thread::sleep(Duration::from_millis(500));

    drop(child.stdin.take());

    let stdout = child
        .stdout
        .take()
        .map(|o| read_lines_with_timeout(o, Duration::from_secs(3)))
        .unwrap_or_default();

    let _ = child.wait();

    assert!(
        stdout.contains("protocolVersion"),
        "stdout should contain protocolVersion, got: {stdout}"
    );
}

#[test]
fn mcp_serve_lists_tools() {
    let mut child = binary()
        .args(["mcp", "serve"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("failed to spawn mcp serve");

    thread::sleep(Duration::from_millis(300));

    let request = r#"{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}"#;
    if let Some(stdin) = child.stdin.as_mut() {
        stdin.write_all(request.as_bytes()).unwrap();
        stdin.write_all(b"\n").unwrap();
        stdin.flush().unwrap();
    }

    thread::sleep(Duration::from_millis(500));

    drop(child.stdin.take());

    let stdout = child
        .stdout
        .take()
        .map(|o| read_lines_with_timeout(o, Duration::from_secs(3)))
        .unwrap_or_default();

    let _ = child.wait();

    assert!(
        stdout.contains("tools"),
        "stdout should contain tools list, got: {stdout}"
    );
}

// A notification carries no id, so it must never be answered. Answering one
// desynchronises the client, so this applies to every method, not just unknown
// ones — that was the bug these cases cover.
#[test]
fn notifications_are_never_answered_for_any_method() {
    let frames = [
        r#"{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-11-25"}}"#,
        r#"{"jsonrpc":"2.0","method":"ping"}"#,
        r#"{"jsonrpc":"2.0","method":"tools/list"}"#,
        r#"{"jsonrpc":"2.0","method":"tools/call","params":{"name":"echo","arguments":{}}}"#,
        r#"{"jsonrpc":"2.0","method":"resources/list"}"#,
        r#"{"jsonrpc":"2.0","id":null,"method":"ping"}"#,
    ];

    for frame in frames {
        let outputs = drive_server(&format!("{frame}\n"));
        assert!(
            outputs.is_empty(),
            "notification {frame} was answered with {outputs:?}"
        );
    }
}

// A notification that is also malformed stays silent: the notification check
// must precede the jsonrpc version check.
#[test]
fn a_malformed_notification_is_not_answered() {
    assert!(drive_server("{\"method\":\"ping\"}\n").is_empty());
}

// A frame larger than the cap is reported as a parse error rather than being
// buffered, and the stream resynchronises on the next newline.
#[test]
fn an_overlong_frame_is_a_parse_error_and_the_stream_recovers() {
    let oversized = format!(
        r#"{{"jsonrpc":"2.0","id":1,"method":"ping","params":{{"pad":"{}"}}}}"#,
        "x".repeat(8 << 20)
    );
    let input = format!("{oversized}\n{{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"ping\"}}\n");

    let outputs = drive_server(&input);
    assert!(
        outputs.len() >= 2,
        "expected a parse error and a reply: {outputs:?}"
    );
    assert!(
        outputs[0].contains("-32700"),
        "expected a parse error, got {}",
        outputs[0]
    );
    assert!(
        outputs.last().unwrap().contains("\"id\":2"),
        "the stream did not resynchronise: {:?}",
        outputs.last()
    );
}

/// Feeds frames to `jack mcp serve` and returns the reply lines it wrote.
fn drive_server(input: &str) -> Vec<String> {
    let mut child = binary()
        .args(["mcp", "serve"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .expect("failed to spawn mcp serve");

    let mut stdin = child.stdin.take().expect("stdin");
    let _ = stdin.write_all(input.as_bytes());
    drop(stdin);

    let stdout = child.stdout.take().expect("stdout");
    let output = read_lines_with_timeout(stdout, Duration::from_secs(10));
    let _ = child.wait();

    output
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty())
        .map(str::to_string)
        .collect()
}
