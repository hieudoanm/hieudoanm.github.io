use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn semver_validate_valid() {
    let output = binary()
        .args(["semver", "validate", "1.2.3"])
        .output()
        .expect("failed to run semver validate");

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("1.2.3") && stdout.contains("is valid"),
        "stdout: {stdout}"
    );
}

#[test]
fn semver_validate_invalid() {
    let output = binary()
        .args(["semver", "validate", "not-a-version"])
        .output()
        .expect("failed to run semver validate");

    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("is invalid"),
        "expected invalid, got: {stdout}"
    );
}
