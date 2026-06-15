use clap::ArgMatches;
use sha1::{Digest, Sha1};

pub fn command() -> clap::Command {
    clap::Command::new("totp")
        .about("Generate a TOTP code from a Base32 secret")
        .arg(
            clap::Arg::new("secret")
                .long("secret")
                .short('s')
                .help("Base32 secret")
                .required(true),
        )
        .arg(
            clap::Arg::new("step")
                .long("step")
                .help("Time step in seconds")
                .default_value("30"),
        )
        .arg(
            clap::Arg::new("digits")
                .long("digits")
                .help("Number of digits (6 or 8)")
                .default_value("6"),
        )
        .arg(
            clap::Arg::new("time")
                .long("time")
                .help("Time in RFC3339 format (for testing)"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

fn base32_decode(input: &str) -> anyhow::Result<Vec<u8>> {
    let s: String = input
        .chars()
        .filter(|c| !c.is_whitespace())
        .map(|c| c.to_ascii_uppercase())
        .collect();

    let cleaned: String = s.trim_end_matches('=').to_string();
    let mut bits = 0u64;
    let mut bit_count = 0u32;
    let mut result = Vec::new();

    for c in cleaned.chars() {
        let val = match c {
            'A'..='Z' => (c as u8) - b'A',
            '2'..='7' => (c as u8) - b'2' + 26,
            _ => anyhow::bail!("invalid Base32 character: {c}"),
        };
        bits = (bits << 5) | (val as u64);
        bit_count += 5;
        if bit_count >= 8 {
            bit_count -= 8;
            result.push((bits >> bit_count) as u8);
            bits &= (1 << bit_count) - 1;
        }
    }

    Ok(result)
}

fn hotp(key: &[u8], counter: u64, digits: u32) -> String {
    let counter_bytes = counter.to_be_bytes();
    let mut mac = Sha1::new();
    mac.update(key);
    mac.update(counter_bytes);
    let hash = mac.finalize();

    let offset = (hash[hash.len() - 1] & 0x0f) as usize;
    let code = ((hash[offset] as u32 & 0x7f) << 24)
        | ((hash[offset + 1] as u32) << 16)
        | ((hash[offset + 2] as u32) << 8)
        | (hash[offset + 3] as u32);
    let code = code % 10u32.pow(digits);

    format!("{code:0width$}", width = digits as usize)
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let secret = matches.get_one::<String>("secret").unwrap();
    let step: u64 = matches
        .get_one::<String>("step")
        .unwrap()
        .parse()
        .unwrap_or(30);
    let digits: u32 = matches
        .get_one::<String>("digits")
        .unwrap()
        .parse()
        .unwrap_or(6);
    let time_str = matches.get_one::<String>("time");
    let json = matches.get_flag("json");

    let key = base32_decode(secret)?;

    let now = if let Some(t) = time_str {
        chrono::DateTime::parse_from_rfc3339(t)?.with_timezone(&chrono::Utc)
    } else {
        chrono::Utc::now()
    };

    let counter = (now.timestamp() as u64) / step;
    let code = hotp(&key, counter, digits);

    let remaining = step - ((now.timestamp() as u64) % step);

    if json {
        let out = serde_json::json!({
            "code": code,
            "step": step,
            "remaining": remaining,
            "time": now.to_rfc3339(),
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else {
        println!("{code}");
    }
    Ok(())
}
