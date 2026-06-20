use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn net_wifi_does_not_crash() {
    let output = binary()
        .args(["net", "wifi"])
        .output()
        .expect("failed to run net wifi");
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}

#[test]
fn net_serve_nonexistent_directory() {
    let output = binary()
        .args(["net", "serve", "--dir", "/tmp/nonexistent_dir_xyz_12345"])
        .output()
        .expect("failed to run net serve");
    assert!(!output.status.success(), "should fail for missing directory");
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("is not a directory"),
        "stderr: {stderr}"
    );
}

#[test]
fn net_dns_lookup() {
    let output = binary()
        .args(["net", "dns", "localhost"])
        .output()
        .expect("failed to run net dns");
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("127.0.0.1") || stdout.contains("::1"),
        "stdout: {stdout}"
    );
}

#[test]
fn net_ping_unreachable_port() {
    let output = binary()
        .args(["net", "ping", "-H", "localhost", "-p", "1", "-c", "1", "-t", "3"])
        .output()
        .expect("failed to run net ping");
    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        output.status.success() || stdout.contains("refused") || stderr.contains("refused"),
        "stdout: {stdout}\nstderr: {stderr}"
    );
}

#[test]
fn net_http_get() {
    let output = binary()
        .args(["net", "http", "-u", "https://example.com"])
        .output()
        .expect("failed to run net http");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("dns error") || stderr.contains("timed out") || stderr.contains("connect")
        {
            eprintln!("network unavailable, skipping assertion: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty(), "stdout should not be empty");
    assert!(
        stdout.contains("Example") || stdout.contains("example"),
        "stdout: {stdout}"
    );
}

#[test]
fn net_http_json_placeholder() {
    let output = binary()
        .args([
            "net",
            "http",
            "-u",
            "https://jsonplaceholder.typicode.com/posts/1",
        ])
        .output()
        .expect("failed to run net http");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("dns error") || stderr.contains("timed out") || stderr.contains("connect")
        {
            eprintln!("network unavailable, skipping assertion: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("userId") || stdout.contains("title"),
        "stdout: {stdout}"
    );
}
