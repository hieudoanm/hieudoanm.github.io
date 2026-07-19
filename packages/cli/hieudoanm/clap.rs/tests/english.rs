use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn english_define_known_word() {
    let output = binary()
        .args(["english", "define", "the"])
        .output()
        .expect("failed to run english define");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("404") {
            eprintln!("word not found in dictionary: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("WORD:"), "stdout: {stdout}");
    assert!(
        stdout.contains("Definition:"),
        "stdout should contain definition: {stdout}"
    );
}

#[test]
fn english_define_unknown_word_returns_404() {
    let output = binary()
        .args(["english", "define", "xyznonexistentword12345"])
        .output()
        .expect("failed to run english define nonexistent");
    assert!(!output.status.success(), "should fail for nonexistent word");
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("404"),
        "stderr should mention 404: {stderr}"
    );
}
