use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn port_check_localhost_refused() {
    let output = binary()
        .args(["port", "check", "-T", "127.0.0.1:19999"])
        .output()
        .unwrap();
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("closed"), "stdout: {stdout}");
}

#[test]
fn port_find_available() {
    let output = binary().args(["port", "find"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Available port:"), "stdout: {stdout}");
}

#[test]
fn port_scan_localhost() {
    let output = binary()
        .args([
            "port",
            "scan",
            "-H",
            "127.0.0.1",
            "--ports",
            "1-100",
            "-t",
            "1",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("127.0.0.1") || stdout.contains("No open ports"),
        "stdout: {stdout}"
    );
}

#[test]
fn port_scan_ip() {
    let output = binary()
        .args([
            "port", "scan", "-H", "1.2.3.4", "--ports", "80,443", "-t", "1",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("1.2.3.4") || stdout.contains("No open ports"),
        "stdout: {stdout}"
    );
}
