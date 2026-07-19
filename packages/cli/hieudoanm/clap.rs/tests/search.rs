use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn search_files_by_glob() {
    let output = binary()
        .args(["search", "files", "-p", "*.rs", "-d", "src"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty());
    assert!(stdout.contains(".rs"));
}

#[test]
fn search_files_json() {
    let output = binary()
        .args(["search", "files", "-p", "*.rs", "-d", "src", "--json"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let v: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert_eq!(v["pattern"], "*.rs");
    assert!(v["count"].as_u64().unwrap_or(0) > 0);
}

#[test]
fn search_files_no_match() {
    let output = binary()
        .args(["search", "files", "-p", "zzz_nonexistent_*", "-d", "src"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("no files found"));
}

#[test]
fn search_files_type_filter() {
    let output = binary()
        .args(["search", "files", "-p", "*", "-d", "src", "-t", "d"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("files found") || stdout.contains("no files found"));
}

#[test]
fn search_text_in_file() {
    let output = binary()
        .args(["search", "text", "-p", "fn", "-P", "src/cmd/search/text.rs"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.contains("no matches"));
}

#[test]
fn search_text_case_insensitive() {
    let output = binary()
        .args([
            "search",
            "text",
            "-p",
            "PUB",
            "-P",
            "src/cmd/search/text.rs",
            "-i",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.contains("no matches"));
}

#[test]
fn search_text_no_match() {
    let output = binary()
        .args([
            "search",
            "text",
            "-p",
            "XYZZY_NONEXISTENT_12345",
            "-P",
            "src/cmd/search/text.rs",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("no matches"));
}

#[test]
fn search_code_symbols() {
    let output = binary()
        .args(["search", "code", "-s", "search", "-d", "src/cmd/search"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}

#[test]
fn search_code_with_lang_filter() {
    let output = binary()
        .args(["search", "code", "-s", "main", "-d", "src", "-l", "rs"])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
}

#[test]
fn search_code_no_symbol() {
    let output = binary()
        .args([
            "search",
            "code",
            "-s",
            "XYZZY_NONEXISTENT_SYMBOL",
            "-d",
            "src",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("no symbols found"));
}

#[test]
fn search_code_json() {
    let output = binary()
        .args([
            "search",
            "code",
            "-s",
            "fn",
            "-d",
            "src/cmd/search",
            "--json",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let v: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert_eq!(v["symbol"], "fn");
}
