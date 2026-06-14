use std::io::Write;
use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("time")
        .about("Time and scheduling tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("clock").about("Clock tools").subcommand(
                clap::Command::new("now")
                    .about("Show current date/time")
                    .arg(
                        clap::Arg::new("format")
                            .short('f')
                            .long("format")
                            .default_value("%Y-%m-%d %H:%M:%S")
                            .help("Output format"),
                    ),
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
        .subcommand(clap::Command::new("stopwatch").about("Start a stopwatch"))
        .subcommand(clap::Command::new("timer").about("Start a countdown timer"))
        .subcommand(clap::Command::new("epoch").about("Convert epoch timestamp"))
        .subcommand(clap::Command::new("cron").about("Parse cron expressions"))
        .subcommand(clap::Command::new("age").about("Calculate age from a date"))
        .subcommand(clap::Command::new("until").about("Time until a date"))
        .subcommand(clap::Command::new("world").about("World clock"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("clock", sub_m)) => {
            if let Some(("now", m)) = sub_m.subcommand() {
                let fmt = m.get_one::<String>("format").unwrap();
                let now = chrono::Local::now();
                println!("{}", now.format(fmt));
            }
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
                println!("\n✅ Break complete!\n");
            }
        }
        Some((name, _m)) => {
            println!("time {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
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
