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

        let (percent, charging, time_remain) = parse_pmset_output(&text);

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

fn parse_pmset_output(text: &str) -> (i32, bool, String) {
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

    (percent, charging, time_remain)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_parse_pmset_output_discharging() {
        let output = " -InternalBattery-0\t85% discharging 2:34; remaining\n";
        let (pct, chg, rem) = parse_pmset_output(output);
        assert_eq!(pct, 85);
        assert!(!chg);
        assert_eq!(rem, "2:34");
    }

    #[test]
    fn test_parse_pmset_output_charging() {
        let output = " -InternalBattery-0\t42% charging 1:15; remaining\n";
        let (pct, chg, rem) = parse_pmset_output(output);
        assert_eq!(pct, 42);
        assert!(chg);
        assert_eq!(rem, "1:15");
    }

    #[test]
    fn test_parse_pmset_output_charged() {
        let output = " -InternalBattery-0\t100% charged\n";
        let (pct, chg, _rem) = parse_pmset_output(output);
        assert_eq!(pct, 100);
        assert!(chg);
    }

    #[test]
    fn test_parse_pmset_output_ac_power() {
        let output = " -InternalBattery-0\t67% AC\n";
        let (pct, chg, _rem) = parse_pmset_output(output);
        assert_eq!(pct, 67);
        assert!(chg);
    }

    #[test]
    fn test_parse_pmset_output_no_battery_line() {
        let output = "No battery information available\n";
        let (pct, chg, _rem) = parse_pmset_output(output);
        assert_eq!(pct, 0);
        assert!(!chg);
    }

    #[test]
    fn test_parse_pmset_output_percent_parse_error() {
        let output = " -InternalBattery-0\tinvalid% discharging\n";
        let (pct, chg, _rem) = parse_pmset_output(output);
        assert_eq!(pct, 0);
        assert!(!chg);
    }

    #[test]
    fn test_parse_pmset_output_empty_string() {
        let (pct, chg, _rem) = parse_pmset_output("");
        assert_eq!(pct, 0);
        assert!(!chg);
    }

    #[test]
    fn test_parse_pmset_output_missing_time() {
        let output = " -InternalBattery-0\t50% discharging\n";
        let (pct, chg, _rem) = parse_pmset_output(output);
        assert_eq!(pct, 50);
        assert!(!chg);
    }
}
