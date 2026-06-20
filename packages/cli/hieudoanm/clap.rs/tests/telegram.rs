use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn telegram_requires_token() {
    let output = binary()
        .args(["telegram", "message", "send", "-c", "123", "-t", "hi"])
        .output()
        .expect("failed to run telegram");
    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("TELEGRAM_BOT_TOKEN"),
        "stderr: {stderr}"
    );
}

#[test]
fn telegram_webhook_requires_token() {
    let output = binary()
        .args(["telegram", "webhook", "info"])
        .output()
        .expect("failed to run telegram webhook");
    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("TELEGRAM_BOT_TOKEN"),
        "stderr: {stderr}"
    );
}
