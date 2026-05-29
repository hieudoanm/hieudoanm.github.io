#[cfg(any(target_os = "macos", target_os = "linux"))]
fn scan() -> anyhow::Result<String> {
    #[cfg(target_os = "macos")]
    {
        let output = std::process::Command::new("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport")
            .args(["-s"])
            .output()
            .map_err(|e| anyhow::anyhow!("airport command failed: {e}"))?;
        let out = String::from_utf8_lossy(&output.stdout).to_string();
        return Ok(out);
    }

    #[cfg(target_os = "linux")]
    {
        let output = std::process::Command::new("iw")
            .args(["dev", "wlan0", "scan"])
            .output()
            .map_err(|e| anyhow::anyhow!("iw command failed: {e}"))?;
        let out = String::from_utf8_lossy(&output.stdout).to_string();
        return Ok(out);
    }

    #[allow(unreachable_code)]
    Ok(String::new())
}

#[cfg(not(any(target_os = "macos", target_os = "linux")))]
fn scan() -> anyhow::Result<String> {
    anyhow::bail!("Wi-Fi scanning is only supported on macOS and Linux")
}

pub fn command() -> clap::Command {
    clap::Command::new("wifi").about("Scan for Wi-Fi networks")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let out = scan()?;
    println!("{out}");
    Ok(())
}
