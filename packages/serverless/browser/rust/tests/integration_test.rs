use std::process::Command;

#[test]
fn test_help_flag() {
    let output = Command::new(env!("CARGO_BIN_EXE_browserverless"))
        .arg("--help")
        .output()
        .expect("failed to run binary");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("URL"));
}

#[test]
fn test_no_args_exits_with_error() {
    let output = Command::new(env!("CARGO_BIN_EXE_browserverless"))
        .output()
        .expect("failed to run binary");
    assert!(!output.status.success());
}
