use std::fs;
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

fn home_dir(label: &str) -> String {
    static ID: AtomicUsize = AtomicUsize::new(0);
    let id = ID.fetch_add(1, Ordering::SeqCst);
    let dir = format!("/tmp/hieudoanm_test_history_{label}_{id}");
    let _ = fs::create_dir_all(&dir);
    dir
}

fn cmd(home: &str) -> Command {
    let mut c = binary();
    c.env("HOME", home);
    c
}

#[test]
fn history_list_empty() {
    let home = home_dir("list_empty");
    let output = cmd(&home)
        .args(["history", "list"])
        .output()
        .expect("failed to run history list");
    assert!(output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("no history entries"), "stderr: {stderr}");
}

#[test]
fn history_clear_empty() {
    let home = home_dir("clear_empty");
    let output = cmd(&home)
        .args(["history", "clear"])
        .output()
        .expect("failed to run history clear");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("history cleared"), "stdout: {stdout}");
}

#[test]
fn history_stats_empty() {
    let home = home_dir("stats_empty");
    let output = cmd(&home)
        .args(["history", "stats"])
        .output()
        .expect("failed to run history stats");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("CLI commands:   0"), "stdout: {stdout}");
    assert!(stdout.contains("MCP tool calls: 0"), "stdout: {stdout}");
}

#[test]
fn history_list_after_command() {
    let home = home_dir("list_after");
    // run a command to populate history
    let _ = cmd(&home)
        .args(["version"])
        .output()
        .expect("failed to run version");

    let output = cmd(&home)
        .args(["history", "list"])
        .output()
        .expect("failed to run history list");
    assert!(output.status.success(), "stderr: {}", String::from_utf8_lossy(&output.stderr));
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("version"), "stdout: {stdout}");
}

#[test]
fn history_list_with_limit() {
    let home = home_dir("list_limit");
    let _ = cmd(&home).args(["version"]).output().unwrap();
    let _ = cmd(&home).args(["version", "--json"]).output().unwrap();

    let output = cmd(&home)
        .args(["history", "list", "-n", "1"])
        .output()
        .expect("failed to run history list -n 1");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("version"), "stdout: {stdout}");
}

#[test]
fn history_search() {
    let home = home_dir("search_found");
    let _ = cmd(&home).args(["version"]).output().unwrap();
    let _ = cmd(&home).args(["help"]).output().unwrap();

    let output = cmd(&home)
        .args(["history", "search", "version"])
        .output()
        .expect("failed to run history search");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("version"), "stdout: {stdout}");
    assert!(!stdout.contains("help"), "stdout should not contain 'help': {stdout}");
}

#[test]
fn history_search_no_match() {
    let home = home_dir("search_none");
    let _ = cmd(&home).args(["version"]).output().unwrap();

    let output = cmd(&home)
        .args(["history", "search", "nonexistent"])
        .output()
        .expect("failed to run history search");
    assert!(output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("no matching entries"), "stderr: {stderr}");
}

#[test]
fn history_stats_after_commands() {
    let home = home_dir("stats_after");
    let _ = cmd(&home).args(["version"]).output().unwrap();
    let _ = cmd(&home).args(["help"]).output().unwrap();

    let output = cmd(&home)
        .args(["history", "stats"])
        .output()
        .expect("failed to run history stats");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("CLI commands:"), "stdout: {stdout}");
    assert!(stdout.contains("Top commands:"), "stdout: {stdout}");
}

#[test]
fn history_clear_then_list() {
    let home = home_dir("clear_then_list");
    let _ = cmd(&home).args(["version"]).output().unwrap();

    // clear
    let output = cmd(&home)
        .args(["history", "clear"])
        .output()
        .expect("failed to run history clear");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("history cleared"), "stdout: {stdout}");

    // list after clear
    let output = cmd(&home)
        .args(["history", "list"])
        .output()
        .expect("failed to run history list");
    assert!(output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("no history entries"), "stderr: {stderr}");
}
