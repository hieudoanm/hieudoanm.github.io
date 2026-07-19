use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn help_no_args_shows_usage() {
    let output = binary().output().unwrap();

    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("Usage:") || stderr.contains("hieudoanm"),
        "expected usage info, got: {stderr}"
    );
}

#[test]
fn help_flag_shows_subcommands() {
    let output = binary().arg("--help").output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("hieudoanm"));
    assert!(
        stdout.contains("calc") || stdout.contains("semver"),
        "expected subcommands list, got: {stdout}"
    );
}

#[test]
fn help_subcommand_shows_subcommand_help() {
    let output = binary().args(["semver", "--help"]).output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("semver"));
    assert!(stdout.contains("validate") && stdout.contains("compare"));
}

#[test]
fn unknown_subcommand_fails() {
    let output = binary()
        .arg("nonexistent-subcommand-12345")
        .output()
        .unwrap();

    assert!(!output.status.success());
}

#[test]
fn subcommand_missing_args_shows_error() {
    let output = binary().args(["semver", "validate"]).output().unwrap();

    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(!stderr.is_empty());
}
