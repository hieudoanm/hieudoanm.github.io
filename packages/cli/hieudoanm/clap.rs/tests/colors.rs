use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn colors_hex_basic() {
    let output = binary().args(["colors", "hex", "ff0000"]).output().unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("#ff0000"));
    assert!(stdout.contains("RGB:"));
}

#[test]
fn colors_hex_with_hash() {
    let output = binary()
        .args(["colors", "hex", "#00ff00"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("#00ff00"));
}

#[test]
fn colors_hex_invalid() {
    let output = binary().args(["colors", "hex", "xyz"]).output().unwrap();
    assert!(!output.status.success());
}

#[test]
fn colors_rgb_basic() {
    let output = binary()
        .args(["colors", "rgb", "255", "0", "0"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "RGB(255, 0, 0)");
}

#[test]
fn colors_random_produces_output() {
    let output = binary().args(["colors", "random"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Random color:"));
    assert!(stdout.contains("RGB:"));
}

#[test]
fn colors_palette_produces_output() {
    let output = binary().args(["colors", "palette"]).output().unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Generating color palette"));
}

#[test]
fn colors_hcl_basic() {
    let output = binary()
        .args(["colors", "hcl", "200", "50", "70"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("HCL"));
}

#[test]
fn colors_oklch_basic() {
    let output = binary()
        .args(["colors", "oklch", "0.5", "0.1", "200"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("OKLCH"));
}
