use chrono::{DateTime, NaiveDate, NaiveDateTime, TimeZone, Utc};

pub fn command() -> clap::Command {
    clap::Command::new("epoch")
        .about("Convert between epoch timestamps and human-readable dates")
        .arg(clap::Arg::new("timestamp").help("Epoch timestamp (seconds)"))
        .arg(
            clap::Arg::new("from")
                .short('f')
                .long("from")
                .help("Convert a date string to epoch"),
        )
        .arg(
            clap::Arg::new("relative")
                .long("relative")
                .help("Calculate relative time (e.g. '2 hours ago', '+3 days')"),
        )
        .arg(
            clap::Arg::new("format")
                .long("format")
                .help("Output format for date (chrono format string)"),
        )
        .arg(
            clap::Arg::new("iso")
                .long("iso")
                .help("Output in ISO 8601 format")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("unix")
                .long("unix")
                .help("Output as Unix timestamp")
                .action(clap::ArgAction::SetTrue),
        )
}

fn parse_date_string(s: &str) -> Option<NaiveDateTime> {
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

fn parse_relative(s: &str) -> Option<DateTime<Utc>> {
    let s = s.trim();
    let now = Utc::now();

    let parts: Vec<&str> = s.split_whitespace().collect();
    if parts.len() < 2 {
        return None;
    }

    let n: i64 = parts[0].parse().ok()?;
    let unit = parts[1].trim_end_matches('s');
    let direction: i64 = if parts.last() == Some(&"ago") || s.starts_with('-') {
        -1
    } else {
        1
    };

    let dur_secs = match unit {
        "second" => 1,
        "minute" => 60,
        "hour" => 3600,
        "day" => 86400,
        "week" => 604800,
        "month" => 2_592_000,
        "year" => 31_536_000,
        _ => return None,
    };

    let total_secs = n * dur_secs * direction;
    Some(now + chrono::TimeDelta::seconds(total_secs))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let iso = matches.get_flag("iso");
    let unix = matches.get_flag("unix");
    let format = matches.get_one::<String>("format");

    if let Some(rel) = matches.get_one::<String>("relative") {
        if let Some(dt) = parse_relative(rel) {
            println!("{}", dt.timestamp());
        } else {
            anyhow::bail!("unable to parse relative time: {rel}");
        }
        return Ok(());
    }

    if let Some(from) = matches.get_one::<String>("from") {
        if let Some(dt) = parse_date_string(from) {
            println!("{}", dt.and_utc().timestamp());
        } else {
            anyhow::bail!("unable to parse date: {from}");
        }
        return Ok(());
    }

    if let Some(ts_str) = matches.get_one::<String>("timestamp") {
        let secs: i64 = ts_str
            .parse()
            .map_err(|_| anyhow::anyhow!("invalid epoch timestamp: {ts_str}"))?;
        let Some(dt) = Utc.timestamp_opt(secs, 0).single() else {
            anyhow::bail!("invalid timestamp: {secs}");
        };
        if unix {
            println!("{secs}");
        } else if let Some(fmt) = format {
            println!("{}", dt.format(fmt));
        } else {
            println!("{}", dt.format("%Y-%m-%dT%H:%M:%S%z"));
        }
        return Ok(());
    }

    let now = Utc::now();
    if unix {
        println!("{}", now.timestamp());
    } else if iso {
        println!("{}", now.format("%Y-%m-%dT%H:%M:%S%z"));
    } else if let Some(fmt) = format {
        println!("{}", now.format(fmt));
    } else {
        println!("{}", now.timestamp());
    }

    Ok(())
}
