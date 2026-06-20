use std::io::Write;
use std::time::Duration;

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "work", default_value = "25", help = "Work duration in minutes")]
    pub work: String,
    #[arg(
        long = "break",
        default_value = "5",
        help = "Break duration in minutes"
    )]
    pub r#break: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("pomodoro")
        .about("Start a pomodoro timer")
        .arg(
            clap::Arg::new("work")
                .long("work")
                .default_value("25")
                .help("Work duration in minutes"),
        )
        .arg(
            clap::Arg::new("break")
                .long("break")
                .default_value("5")
                .help("Break duration in minutes"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let work: u64 = matches.work.parse().unwrap_or(25);
    let break_: u64 = matches.r#break.parse().unwrap_or(5);
    println!("Pomodoro timer: {work}min work, {break_}min break");
    println!("Press Ctrl+C to stop\n");

    let work_secs = work * 60;
    let break_secs = break_ * 60;

    loop {
        println!("🍅 Work session ({work} min)");
        countdown(work_secs)?;
        println!("\n✅ Work session complete!");
        println!("\n☕ Break ({break_} min)");
        countdown(break_secs)?;
        println!("\n✅ Break complete!\n");
    }
}

fn countdown(seconds: u64) -> anyhow::Result<()> {
    let start = std::time::Instant::now();
    let mut last_update = 0u64;

    loop {
        let elapsed = start.elapsed().as_secs();
        if elapsed >= seconds {
            break;
        }
        if elapsed != last_update {
            let remaining = seconds - elapsed;
            let mins = remaining / 60;
            let secs = remaining % 60;
            print!("\r  {mins:02}:{secs:02} remaining");
            std::io::stdout().flush()?;
            last_update = elapsed;
        }
        std::thread::sleep(Duration::from_millis(100));
    }
    println!();
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
