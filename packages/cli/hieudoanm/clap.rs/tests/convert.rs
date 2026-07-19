use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn convert_capitalise() {
    let output = binary()
        .args(["convert", "capitalise", "hello world"])
        .output()
        .unwrap();

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "Hello world");
}

#[test]
fn convert_kebabcase() {
    let output = binary()
        .args(["convert", "kebabcase", "hello world"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "hello-world");
}

#[test]
fn convert_snakecase() {
    let output = binary()
        .args(["convert", "snakecase", "hello world"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "hello_world");
}

#[test]
fn convert_lowercase() {
    let output = binary()
        .args(["convert", "lowercase", "HELLO"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "hello");
}

#[test]
fn convert_uppercase() {
    let output = binary()
        .args(["convert", "uppercase", "hello"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "HELLO");
}

#[test]
fn convert_deburr() {
    let output = binary()
        .args(["convert", "deburr", "café résumé"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "cafe resume");
}

#[test]
fn convert_base64_encode() {
    let output = binary()
        .args(["convert", "base64", "encode", "hello"])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "aGVsbG8=");
}

#[test]
fn convert_base64_decode() {
    let output = binary()
        .args(["convert", "base64", "decode", "aGVsbG8="])
        .output()
        .unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert_eq!(stdout.trim(), "hello");
}

#[test]
fn convert_base64_roundtrip() {
    let input = "Hello, 世界!";
    let encoded = binary()
        .args(["convert", "base64", "encode", input])
        .output()
        .unwrap();
    assert!(encoded.status.success());
    let encoded_str = String::from_utf8_lossy(&encoded.stdout).trim().to_string();

    let decoded = binary()
        .args(["convert", "base64", "decode", &encoded_str])
        .output()
        .unwrap();
    assert!(decoded.status.success());
    let decoded_str = String::from_utf8_lossy(&decoded.stdout).trim().to_string();

    assert_eq!(decoded_str, input);
}
