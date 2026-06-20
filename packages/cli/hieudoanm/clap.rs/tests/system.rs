use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn system_env_lists_vars() {
    let output = binary().args(["system", "env"]).output().unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("PATH=") || stdout.contains("HOME="));
}

#[test]
fn system_env_filter() {
    let output = binary().args(["system", "env", "HOME"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("HOME="));
}

#[test]
fn system_env_json() {
    let output = binary()
        .args(["system", "env", "--json", "PATH"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert!(parsed.is_array());
    assert!(!parsed.as_array().unwrap().is_empty());
}

#[test]
fn system_path_lists_dirs() {
    let output = binary().args(["system", "path"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("/usr") || stdout.contains("/bin"));
}

#[test]
fn system_path_find_existing() {
    let output = binary().args(["system", "path", "sh"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("sh"));
}

#[test]
fn system_path_json() {
    let output = binary()
        .args(["system", "path", "--json"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert!(parsed.is_array());
}

#[test]
fn system_disk_produces_output() {
    let output = binary().args(["system", "disk"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty());
}

#[test]
fn system_info_produces_output() {
    let output = binary().args(["system", "info"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Host") || stdout.contains("OS"));
}
