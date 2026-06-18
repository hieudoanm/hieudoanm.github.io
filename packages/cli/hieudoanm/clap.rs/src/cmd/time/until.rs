use chrono::{NaiveDate, NaiveDateTime};

pub fn command() -> clap::Command {
    clap::Command::new("until")
        .about("Countdown to a specific date/time")
        .arg(
            clap::Arg::new("time")
                .short('t')
                .long("time")
                .required(true)
                .help("Target datetime (YYYY-MM-DD, YYYY-MM-DD HH:MM:SS, or RFC3339)"),
        )
}

fn parse_datetime(s: &str) -> Option<NaiveDateTime> {
    let formats = ["%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"];
    for fmt in &formats {
        if let Ok(dt) = NaiveDateTime::parse_from_str(s, fmt) {
            return Some(dt);
        }
        if let Ok(d) = NaiveDate::parse_from_str(s, fmt) {
            return Some(d.and_hms_opt(0, 0, 0).unwrap());
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_datetime_date_only() {
        let dt = parse_datetime("2024-12-25").unwrap();
        assert_eq!(dt.format("%Y-%m-%d").to_string(), "2024-12-25");
    }

    #[test]
    fn test_parse_datetime_with_space() {
        let dt = parse_datetime("2024-12-25 14:30:00").unwrap();
        assert_eq!(dt.format("%Y-%m-%d %H:%M:%S").to_string(), "2024-12-25 14:30:00");
    }

    #[test]
    fn test_parse_datetime_rfc3339() {
        let dt = parse_datetime("2024-12-25T14:30:00").unwrap();
        assert_eq!(dt.format("%Y-%m-%d %H:%M:%S").to_string(), "2024-12-25 14:30:00");
    }

    #[test]
    fn test_parse_datetime_invalid() {
        assert!(parse_datetime("").is_none());
        assert!(parse_datetime("not-a-date").is_none());
    }
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let time_str = matches.get_one::<String>("time").unwrap();
    let target = parse_datetime(time_str)
        .ok_or_else(|| anyhow::anyhow!("unrecognized datetime format: {time_str}"))?;

    let now = chrono::Local::now().naive_local();

    if target <= now {
        println!("That time has already passed.");
        return Ok(());
    }

    let diff = target - now;
    let total_secs = diff.num_seconds();
    let days = total_secs / 86400;
    let hours = (total_secs % 86400) / 3600;
    let minutes = (total_secs % 3600) / 60;
    let seconds = total_secs % 60;

    println!("{days}d {hours}h {minutes}m {seconds}s");
    Ok(())
}
