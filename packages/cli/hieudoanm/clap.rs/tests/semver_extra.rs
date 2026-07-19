use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn semver_compare_equal() {
    let output = binary()
        .args(["semver", "compare", "1.2.3", "1.2.3"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("=="));
}

#[test]
fn semver_compare_greater() {
    let output = binary()
        .args(["semver", "compare", "2.0.0", "1.0.0"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains(">"));
}

#[test]
fn semver_compare_less() {
    let output = binary()
        .args(["semver", "compare", "1.0.0", "2.0.0"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("<"));
}

#[test]
fn semver_bump_major() {
    let output = binary()
        .args(["semver", "bump", "1.2.3", "major"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "2.0.0");
}

#[test]
fn semver_bump_minor() {
    let output = binary()
        .args(["semver", "bump", "1.2.3", "minor"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "1.3.0");
}

#[test]
fn semver_bump_patch_with_prerelease() {
    let output = binary()
        .args(["semver", "bump", "1.2.3", "patch", "-p", "rc.1"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "1.2.4-rc.1");
}

#[test]
fn semver_bump_with_v_prefix() {
    let output = binary()
        .args(["semver", "bump", "v1.2.3", "minor"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "v1.3.0");
}
