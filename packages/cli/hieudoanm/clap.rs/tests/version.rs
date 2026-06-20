use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn version_default_output() {
    let output = binary()
        .arg("version")
        .output()
        .expect("failed to run version command");

    assert!(output.status.success());

    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("hieudoanm version"), "stdout: {stdout}");
    assert!(
        stdout.contains("0.1.0") || stdout.contains('.'),
        "expected a version number, got: {stdout}"
    );
}

#[test]
fn version_json_output() {
    let output = binary()
        .args(["version", "--json"])
        .output()
        .expect("failed to run version --json command");

    assert!(output.status.success());

    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value =
        serde_json::from_str(&stdout).expect("output should be valid JSON");

    assert!(
        parsed.get("version").and_then(|v| v.as_str()).is_some(),
        "expected JSON with 'version' key, got: {stdout}"
    );
}
