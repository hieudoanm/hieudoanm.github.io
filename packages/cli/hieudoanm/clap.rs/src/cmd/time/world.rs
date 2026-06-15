use chrono::{FixedOffset, Utc};

const ZONE_ALIASES: &[(&str, i32)] = &[
    ("utc", 0),
    ("ny", -5),
    ("newyork", -5),
    ("london", 0),
    ("tokyo", 9),
    ("hcmc", 7),
    ("hanoi", 7),
    ("sf", -8),
    ("la", -8),
    ("losangeles", -8),
    ("paris", 1),
    ("berlin", 1),
    ("mumbai", 5),
    ("beijing", 8),
    ("seoul", 9),
    ("sydney", 11),
    ("dubai", 4),
    ("singapore", 8),
    ("hk", 8),
    ("hongkong", 8),
    ("ams", 1),
    ("amsterdam", 1),
    ("chi", -6),
    ("chicago", -6),
    ("den", -7),
    ("denver", -7),
    ("phx", -7),
    ("phoenix", -7),
];

fn load_offset(name: &str) -> Option<FixedOffset> {
    if let Some(&(_, hours)) = ZONE_ALIASES.iter().find(|&&(alias, _)| alias == name) {
        return FixedOffset::east_opt(hours * 3600);
    }
    if let Some(rest) = name.strip_prefix("UTC").or_else(|| name.strip_prefix("utc")) {
        let rest = rest.trim_start_matches(|c: char| c == '+' || c == ' ');
        let negative = rest.starts_with('-');
        let rest = rest.trim_start_matches('-');
        if let Some((h_str, m_str)) = rest.split_once(':') {
            let h: i32 = h_str.parse().ok()?;
            let m: i32 = m_str.parse().ok()?;
            let total_secs = h * 3600 + m * 60;
            return FixedOffset::east_opt(if negative { -total_secs } else { total_secs });
        }
        if let Ok(h) = rest.parse::<i32>() {
            let total_secs = h * 3600;
            return FixedOffset::east_opt(if negative { -total_secs } else { total_secs });
        }
    }
    None
}

pub fn command() -> clap::Command {
    clap::Command::new("world")
        .about("Display current time in multiple timezones")
        .arg(
            clap::Arg::new("zones")
                .help("Timezone names (utc, ny, london, tokyo, hcmc, ...)")
                .num_args(0..),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let zone_names: Vec<&str> = match matches.get_many::<String>("zones") {
        Some(vals) => vals.map(|s| s.as_str()).collect(),
        None => vec!["ny", "london", "hcmc", "tokyo", "utc"],
    };

    let now = Utc::now();
    for (i, name) in zone_names.iter().enumerate() {
        if i > 0 {
            println!();
        }
        if let Some(offset) = load_offset(name) {
            let t = now.with_timezone(&offset);
            println!("{:-12} {}", format!("{name}:"), t.format("%Y-%m-%d %H:%M:%S"));
        } else {
            anyhow::bail!("unknown timezone {name:?}");
        }
    }

    Ok(())
}
