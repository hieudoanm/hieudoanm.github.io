use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn time_age_valid() {
    let output = binary()
        .args(["time", "age", "-d", "1990-01-01"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("years") || stdout.contains("months") || stdout.contains("days"));
}

#[test]
fn time_age_future() {
    let output = binary()
        .args(["time", "age", "-d", "2099-01-01"])
        .output()
        .unwrap();
    assert!(!output.status.success());
}

#[test]
fn time_epoch_default() {
    let output = binary().args(["time", "epoch"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let val: i64 = stdout.trim().parse().expect("expected a timestamp");
    assert!(val > 1_500_000_000);
}

#[test]
fn time_epoch_convert() {
    let output = binary()
        .args(["time", "epoch", "1700000000"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("2023") || stdout.contains("2024"));
}

#[test]
fn time_epoch_from_date() {
    let output = binary()
        .args(["time", "epoch", "--from", "2024-01-01"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let val: i64 = stdout.trim().parse().expect("expected a timestamp");
    assert!(val > 1_700_000_000);
}

#[test]
fn time_epoch_iso() {
    let output = binary().args(["time", "epoch", "--iso"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains('T'));
}

#[test]
fn time_clock_produces_output() {
    let output = binary().args(["time", "clock", "now"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty());
}

#[test]
fn time_cron_describe() {
    let output = binary()
        .args(["time", "cron", "--expression", "*/5 * * * *"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("every") || stdout.contains("minute") || stdout.contains("5"));
}

#[test]
fn time_world_default() {
    let output = binary().args(["time", "world"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty());
}

#[test]
fn time_world_custom_zones() {
    let output = binary()
        .args(["time", "world", "utc", "tokyo"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("utc:") && stdout.contains("tokyo:"));
}

#[test]
fn time_until_parses_date() {
    let output = binary()
        .args(["time", "until", "--time", "2030-01-01"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty());
}
