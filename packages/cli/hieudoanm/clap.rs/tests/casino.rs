use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn casino_coin_single() {
    let output = binary().args(["casino", "coin"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Heads") || stdout.contains("Tails"));
}

#[test]
fn casino_coin_multiple() {
    let output = binary()
        .args(["casino", "coin", "-n", "5"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Heads:"));
    assert!(stdout.contains("Tails:"));
}

#[test]
fn casino_dice_single() {
    let output = binary().args(["casino", "dice"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let val: i32 = stdout.trim().parse().expect("expected a number");
    assert!((1..=6).contains(&val));
}

#[test]
fn casino_dice_custom() {
    let output = binary()
        .args(["casino", "dice", "-s", "20", "-n", "3"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Rolling 3d20:"));
}

#[test]
fn casino_roulette_single() {
    let output = binary().args(["casino", "roulette"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("Green") || stdout.contains("Red") || stdout.contains("Black"),
        "stdout: {stdout}"
    );
}

#[test]
fn casino_roulette_multiple() {
    let output = binary()
        .args(["casino", "roulette", "-n", "3"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let lines: Vec<&str> = stdout.lines().collect();
    assert_eq!(lines.len(), 3);
}

#[test]
fn casino_slots() {
    let output = binary().args(["casino", "slots"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains('[') && stdout.contains(']'));
}

#[test]
fn casino_poker() {
    let output = binary()
        .args(["casino", "poker", "--hand", "Ah Kh", "--simulations", "100"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Your hand:"));
    assert!(stdout.contains("Ah") && stdout.contains("Kh"));
}

#[test]
fn casino_poker_with_board() {
    let output = binary()
        .args([
            "casino",
            "poker",
            "--hand",
            "Ah Kh",
            "--board",
            "2h 7s Tc",
            "--simulations",
            "100",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Board:"));
}
