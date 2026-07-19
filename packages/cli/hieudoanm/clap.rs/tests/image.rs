use std::fs;
use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

fn test_png_bytes() -> Vec<u8> {
    vec![
        137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 2,
        0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 12, 73, 68, 65, 84, 120, 156, 99, 248, 207, 192, 0, 0,
        3, 1, 1, 0, 201, 254, 146, 239, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
    ]
}

fn create_test_png(path: &str) {
    fs::write(path, test_png_bytes()).unwrap();
}

#[test]
fn image_info_shows_metadata() {
    let path = "/tmp/hieudoanm_image_info_test.png";
    create_test_png(path);

    let output = binary()
        .args(["image", "info", "-f", path])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Format"));
    assert!(stdout.contains("Width"));
    assert!(stdout.contains("Height"));

    let _ = fs::remove_file(path);
}

#[test]
fn image_info_json() {
    let path = "/tmp/hieudoanm_image_info_json_test.png";
    create_test_png(path);

    let output = binary()
        .args(["image", "info", "-f", path, "--json"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let v: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert_eq!(v["width"], 1);
    assert_eq!(v["height"], 1);

    let _ = fs::remove_file(path);
}

#[test]
fn image_convert_to_png() {
    let src = "/tmp/hieudoanm_convert_src.png";
    let dst = "/tmp/hieudoanm_convert_dst.png";
    create_test_png(src);

    let output = binary()
        .args(["image", "convert", "-i", src, "-o", dst])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    assert!(fs::metadata(&dst).is_ok());

    let _ = fs::remove_file(src);
    let _ = fs::remove_file(dst);
}

#[test]
fn image_dominant_shows_colors() {
    let path = "/tmp/hieudoanm_dominant_test.png";
    create_test_png(path);

    let output = binary()
        .args(["image", "dominant", "-f", path])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Dominant"));

    let _ = fs::remove_file(path);
}

#[test]
fn image_dominant_json() {
    let path = "/tmp/hieudoanm_dominant_json_test.png";
    create_test_png(path);

    let output = binary()
        .args(["image", "dominant", "-f", path, "--json"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    let v: serde_json::Value = serde_json::from_str(&stdout).unwrap();
    assert!(v.as_array().unwrap().len() >= 1);

    let _ = fs::remove_file(path);
}
