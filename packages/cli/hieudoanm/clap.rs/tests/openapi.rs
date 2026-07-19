use std::fs;
use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

fn valid_openapi_yaml() -> String {
    r#"openapi: "3.0.0"
info:
  title: Test API
  version: 1.0.0
paths:
  /users:
    get:
      responses:
        "200":
          description: OK
"#
    .to_string()
}

fn valid_openapi_json() -> String {
    r#"{"openapi":"3.0.0","info":{"title":"Test API","version":"1.0.0"},"paths":{"/users":{"get":{"responses":{"200":{"description":"OK"}}}}}}"#
        .to_string()
}

fn invalid_openapi_yaml() -> String {
    r#"info:
  title: Test API
  version: 1.0.0
paths:
  /test:
    get:
      responses:
        "200":
          description: OK
"#
    .to_string()
}

#[test]
fn openapi_validate_valid_yaml() {
    let path = "/tmp/hieudoanm_openapi_valid.yaml";
    fs::write(path, valid_openapi_yaml()).unwrap();

    let output = binary()
        .args(["openapi", "validate", "-f", path])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("valid"));

    let _ = fs::remove_file(path);
}

#[test]
fn openapi_validate_valid_json() {
    let path = "/tmp/hieudoanm_openapi_valid_json.yaml";
    fs::write(path, valid_openapi_json()).unwrap();

    let output = binary()
        .args(["openapi", "validate", "-f", path])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let _ = fs::remove_file(path);
}

#[test]
fn openapi_validate_invalid() {
    let path = "/tmp/hieudoanm_openapi_invalid.yaml";
    fs::write(path, invalid_openapi_yaml()).unwrap();

    let output = binary()
        .args(["openapi", "validate", "-f", path])
        .output()
        .unwrap();
    assert!(!output.status.success());
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("openapi"));

    let _ = fs::remove_file(path);
}

#[test]
fn openapi_validate_nonexistent_file() {
    let output = binary()
        .args(["openapi", "validate", "-f", "/tmp/does_not_exist_xyz.yaml"])
        .output()
        .unwrap();
    assert!(!output.status.success());
}

#[test]
fn openapi_convert_to_postman() {
    let path = "/tmp/hieudoanm_openapi_convert.yaml";
    let out = "/tmp/hieudoanm_openapi_postman.json";
    fs::write(path, valid_openapi_yaml()).unwrap();

    let output = binary()
        .args(["openapi", "openapi2postman", "-i", path, "-o", out])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    let v: serde_json::Value = serde_json::from_str(&content).unwrap();
    assert!(v.get("info").is_some());

    let _ = fs::remove_file(path);
    let _ = fs::remove_file(out);
}
