#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("battery")
        .about("Show battery status")
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let json = matches.json;

    #[cfg(target_os = "macos")]
    {
        let output = std::process::Command::new("pmset")
            .args(["-g", "batt"])
            .output()
            .map_err(|e| anyhow::anyhow!("pmset failed: {e}"))?;
        let text = String::from_utf8_lossy(&output.stdout);

        let mut percent = 0i32;
        let mut charging = false;
        let mut time_remain = String::new();

        for line in text.lines() {
            if !line.contains("InternalBattery") {
                continue;
            }
            for field in line.split_whitespace() {
                if let Some(p) = field.strip_suffix('%') {
                    percent = p.parse().unwrap_or(0);
                }
                if field == "charging" || field == "AC" || field == "charged" {
                    charging = true;
                }
                if field.ends_with(';') && field.len() > 4 {
                    let f = field.trim_end_matches(';');
                    if f.contains(':') {
                        time_remain = f.to_string();
                    }
                }
            }
        }

        if json {
            let output = serde_json::json!({
                "percent": percent,
                "charging": charging,
                "time_remaining": time_remain,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            let status = if charging { "charging" } else { "discharging" };
            println!("Battery: {}% ({})", percent, status);
            if !time_remain.is_empty() {
                println!("Time remaining: {}", time_remain);
            }
        }
    }

    #[cfg(target_os = "linux")]
    {
        let capacity = std::fs::read_to_string("/sys/class/power_supply/BAT0/capacity")
            .map_err(|e| anyhow::anyhow!("read battery capacity: {e}"))?;
        let status =
            std::fs::read_to_string("/sys/class/power_supply/BAT0/status").unwrap_or_default();

        let percent = capacity.trim().parse().unwrap_or(0);
        let charging = status.trim() == "Charging";

        if json {
            let output = serde_json::json!({
                "percent": percent,
                "charging": charging,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            let s = if charging { "charging" } else { "discharging" };
            println!("Battery: {}% ({})", percent, s);
        }
    }

    #[cfg(not(any(target_os = "macos", target_os = "linux")))]
    {
        anyhow::bail!("battery not supported on this platform");
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
