use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn crypto_hash_sha256() {
    let output = binary()
        .args(["crypto", "hash", "--text", "hello", "--algo", "sha256"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(
        stdout.trim(),
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
}

#[test]
fn crypto_hash_md5() {
    let output = binary()
        .args(["crypto", "hash", "--text", "hello", "--algo", "md5"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "5d41402abc4b2a76b9719d911017c592");
}

#[test]
fn crypto_hash_sha1() {
    let output = binary()
        .args(["crypto", "hash", "--text", "hello", "--algo", "sha1"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
}

#[test]
fn crypto_hash_json() {
    let output = binary()
        .args([
            "crypto", "hash", "--text", "hello", "--algo", "sha256", "--json",
        ])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert_eq!(parsed["algorithm"], "sha256");
    assert_eq!(
        parsed["hash"],
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
}

#[test]
fn crypto_hash_default_algo() {
    let output = binary()
        .args(["crypto", "hash", "--text", "hello"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(
        stdout.trim(),
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
}

#[test]
fn crypto_uuid_generates_valid_uuid() {
    let output = binary().args(["crypto", "uuid"]).output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let id = stdout.trim();
    assert_eq!(id.len(), 36);
    assert_eq!(id.chars().filter(|&c| c == '-').count(), 4);
    uuid::Uuid::parse_str(id).expect("should be a valid UUID");
}
