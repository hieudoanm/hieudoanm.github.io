use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn calc_eval_simple() {
    let output = binary()
        .args(["calc", "eval", "-e", "2 + 2"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "4");
}

#[test]
fn calc_eval_float() {
    let output = binary()
        .args(["calc", "eval", "-e", "3.5 * 2"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "7");
}

#[test]
fn calc_eval_json() {
    let output = binary()
        .args(["calc", "eval", "-e", "10 / 3", "--json"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert!(parsed.get("expression").is_some());
    assert!(parsed.get("result").is_some());
    assert_eq!(parsed["expression"], "10 / 3");
}

#[test]
fn calc_eval_parentheses() {
    let output = binary()
        .args(["calc", "eval", "-e", "(1 + 2) * 4"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "12");
}
