use std::io::Write;
use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("timer")
        .about("Simple countdown timer")
        .arg(
            clap::Arg::new("duration")
                .short('d')
                .long("duration")
                .required(true)
                .help("Duration (e.g. 30s, 5m, 90)"),
        )
}

fn parse_duration(s: &str) -> anyhow::Result<Duration> {
    if let Some(n) = s.strip_suffix('s') {
        let n: u64 = n.parse()?;
        Ok(Duration::from_secs(n))
    } else if let Some(n) = s.strip_suffix('m') {
        let n: u64 = n.parse()?;
        Ok(Duration::from_secs(n * 60))
    } else {
        let n: u64 = s.parse()?;
        Ok(Duration::from_secs(n))
    }
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let dur_str = matches.get_one::<String>("duration").unwrap();
    let total = parse_duration(dur_str)?;
    let total_secs = total.as_secs();

    println!("Timer: {:02}:{:02}", total_secs / 60, total_secs % 60);

    if total_secs == 0 {
        println!("Time's up!");
        return Ok(());
    }

    let mut remaining = total_secs;
    loop {
        tokio::select! {
            _ = tokio::signal::ctrl_c() => {
                println!("\nTimer cancelled");
                return Ok(());
            }
            _ = tokio::time::sleep(Duration::from_secs(1)) => {
                remaining -= 1;
                if remaining == 0 {
                    println!("Time's up!");
                    return Ok(());
                }
                print!("\rTimer: {:02}:{:02} ", remaining / 60, remaining % 60);
                std::io::stdout().flush()?;
            }
        }
    }
}
