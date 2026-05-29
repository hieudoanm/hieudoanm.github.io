use anyhow::{Context, Result};

#[cfg(target_os = "macos")]
pub fn scan_wifi() -> Result<String> {
    let output = std::process::Command::new(
        "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport",
    )
    .arg("-s")
    .output()
    .context("failed to run airport command")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("airport command failed: {}", stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(stdout)
}

#[cfg(target_os = "linux")]
pub fn scan_wifi() -> Result<String> {
    let output = std::process::Command::new("nmcli")
        .args([
            "--terse",
            "--fields",
            "SSID,SIGNAL,SECURITY",
            "device",
            "wifi",
            "list",
        ])
        .output()
        .context("failed to run nmcli command")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("nmcli command failed: {}", stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut result = String::new();

    for line in stdout.lines() {
        let parts: Vec<&str> = line.splitn(3, ':').collect();
        if parts.len() != 3 {
            continue;
        }
        let ssid = if parts[0].is_empty() {
            "<hidden>"
        } else {
            parts[0]
        };
        let signal = parts[1];
        let security = parts[2];
        result.push_str(&format!("{} | RSSI: {} | {}\n", ssid, signal, security));
    }

    Ok(result)
}

#[cfg(not(any(target_os = "macos", target_os = "linux")))]
pub fn scan_wifi() -> Result<String> {
    anyhow::bail!("unsupported platform")
}
