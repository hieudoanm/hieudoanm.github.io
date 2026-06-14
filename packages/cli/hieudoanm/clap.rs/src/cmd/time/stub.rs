pub fn commands() -> Vec<clap::Command> {
    vec![
        clap::Command::new("stopwatch").about("Start a stopwatch"),
        clap::Command::new("timer").about("Start a countdown timer"),
        clap::Command::new("epoch").about("Convert epoch timestamp"),
        clap::Command::new("cron").about("Parse cron expressions"),
        clap::Command::new("age").about("Calculate age from a date"),
        clap::Command::new("until").about("Time until a date"),
        clap::Command::new("world").about("World clock"),
    ]
}

pub async fn run(name: &str, _matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("time {name} (not yet implemented)");
    Ok(())
}
