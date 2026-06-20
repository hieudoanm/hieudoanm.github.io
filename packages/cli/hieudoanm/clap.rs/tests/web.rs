use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn web_youtube_fetch_is_stub() {
    let output = binary()
        .args(["web", "youtube", "fetch", "dQw4w9WgXcQ"])
        .output()
        .expect("failed to run web youtube fetch");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("not yet implemented"),
        "stdout: {stdout}"
    );
}

#[test]
fn web_youtube_thumbnails_is_stub() {
    let output = binary()
        .args(["web", "youtube", "thumbnails"])
        .output()
        .expect("failed to run web youtube thumbnails");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("not yet implemented"),
        "stdout: {stdout}"
    );
}

#[test]
fn web_instagram_download_is_stub() {
    let output = binary()
        .args(["web", "instagram", "download"])
        .output()
        .expect("failed to run web instagram download");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("not yet implemented"),
        "stdout: {stdout}"
    );
}

#[test]
fn web_snapshot_fails_with_message() {
    let output = binary()
        .args(["web", "snapshot", "https://example.com"])
        .output()
        .expect("failed to run web snapshot");
    assert!(!output.status.success(), "snapshot should fail");
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(
        stderr.contains("headless_chrome"),
        "stderr: {stderr}"
    );
}

#[test]
fn web_weather_current() {
    let output = binary()
        .args(["web", "weather", "London"])
        .output()
        .expect("failed to run web weather London");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("dns error") || stderr.contains("timed out") || stderr.contains("connect")
        {
            eprintln!("network unavailable, skipping: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty(), "stdout should contain weather data");
}

#[test]
fn web_weather_json() {
    let output = binary()
        .args(["web", "weather", "Tokyo", "--json"])
        .output()
        .expect("failed to run web weather Tokyo --json");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("dns error") || stderr.contains("timed out") || stderr.contains("connect")
        {
            eprintln!("network unavailable, skipping: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed: serde_json::Value = serde_json::from_str(&stdout).expect("should be valid JSON");
    assert!(
        parsed.get("current_condition").is_some(),
        "stdout: {stdout}"
    );
}

#[test]
fn web_weather_forecast() {
    let output = binary()
        .args(["web", "weather", "Paris", "--forecast"])
        .output()
        .expect("failed to run web weather Paris --forecast");
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if stderr.contains("dns error") || stderr.contains("timed out") || stderr.contains("connect")
        {
            eprintln!("network unavailable, skipping: {stderr}");
            return;
        }
    }
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(!stdout.is_empty(), "stdout should contain forecast");
}


