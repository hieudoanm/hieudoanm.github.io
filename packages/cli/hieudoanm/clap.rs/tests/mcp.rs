use std::io::{BufRead, BufReader, Read, Write};
use std::process::{Command, Stdio};
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
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
