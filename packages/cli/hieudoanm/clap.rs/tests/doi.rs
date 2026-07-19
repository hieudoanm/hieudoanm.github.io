use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn doi_validate_valid() {
    let output = binary()
        .args(["doi", "validate", "10.1038/nature12373"])
        .output()
        .expect("failed to run doi validate");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("429") || stderr.contains("rate limit") {
            eprintln!("skipping doi validate assertion: rate limited ({stderr})");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("is valid"), "stdout: {stdout}");
}

#[test]
fn doi_validate_invalid() {
    let output = binary()
        .args(["doi", "validate", "10.9999/invalid-doi-12345"])
        .output()
        .expect("failed to run doi validate");
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("is not valid"), "stdout: {stdout}");
}

#[test]
fn doi_fetch_valid() {
    let output = binary()
        .args(["doi", "fetch", "10.1038/nature12373"])
        .output()
        .expect("failed to run doi fetch");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("429") || stderr.contains("rate limit") {
            eprintln!("skipping doi fetch assertion: rate limited ({stderr})");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value =
        serde_json::from_str(&stdout).expect("output should be valid JSON");
    assert_eq!(parsed["status"], "ok");
}

#[test]
fn doi_cite_valid() {
    let output = binary()
        .args(["doi", "cite", "10.1038/nature12373"])
        .output()
        .expect("failed to run doi cite");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("429") || stderr.contains("rate limit") {
            eprintln!("skipping doi cite assertion: rate limited ({stderr})");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Cite:"), "stdout: {stdout}");
    assert!(
        stdout.contains("20"),
        "stdout should contain a year: {stdout}"
    );
}

#[test]
fn doi_ref_valid() {
    let output = binary()
        .args(["doi", "ref", "10.1038/nature12373"])
        .output()
        .expect("failed to run doi ref");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("429") || stderr.contains("rate limit") {
            eprintln!("skipping doi ref assertion: rate limited ({stderr})");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("APA:"), "stdout: {stdout}");
}

#[test]
fn doi_validate_nonexistent_does_not_crash() {
    let output = binary()
        .args(["doi", "validate", "10.0000/definitely-not-a-real-doi"])
        .output()
        .expect("failed to run doi validate");
    assert!(
        output.status.success(),
        "should not crash even for nonexistent DOI"
    );
}
