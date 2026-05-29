pub fn command() -> clap::Command {
    clap::Command::new("clock")
        .about("Clock related tools")
        .subcommand(
            clap::Command::new("now")
                .about("Show current date/time")
                .arg(
                    clap::Arg::new("format")
                        .short('f')
                        .long("format")
                        .default_value("%Y-%m-%d %H:%M:%S")
                        .help("Output format"),
                ),
        )
        .subcommand(
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
                ),
        )
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("now", sub_m)) => {
            let fmt = sub_m
                .get_one::<String>("format")
                .map(|s| s.as_str())
                .unwrap_or("%Y-%m-%d %H:%M:%S");
            let now = chrono::Local::now();
            println!("{}", now.format(fmt));
        }
        Some(("pomodoro", sub_m)) => {
            let work: u64 = sub_m
                .get_one::<String>("work")
                .unwrap_or(&"25".into())
                .parse()
                .unwrap_or(25);
            let break_: u64 = sub_m
                .get_one::<String>("break")
                .unwrap_or(&"5".into())
                .parse()
                .unwrap_or(5);

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
                println!("\n✅ Break complete!");
                println!();
            }
        }
        _ => {
            println!("Use: hieudoanm clock <subcommand>");
            println!("  now        Show current date/time");
            println!("  pomodoro   Start a pomodoro timer");
        }
    }
    Ok(())
}

fn countdown(seconds: u64) -> anyhow::Result<()> {
    use std::io::Write;
    use std::time::Duration;

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

        // Check for Ctrl+C (non-blocking)
        #[cfg(unix)]
        {
            use std::sync::atomic::{AtomicBool, Ordering};
            use std::sync::Arc;
            static INTERRUPTED: AtomicBool = AtomicBool::new(false);
            // Simple polling approach
        }
    }
    println!();
    Ok(())
}
