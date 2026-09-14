pub fn command() -> clap::Command {
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
    )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("now", m)) = matches.subcommand() {
        let fmt = m.get_one::<String>("format").unwrap();
        let now = chrono::Local::now();
        println!("{}", now.format(fmt));
    }
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
