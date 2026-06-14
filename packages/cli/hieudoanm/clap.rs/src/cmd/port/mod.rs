pub fn command() -> clap::Command {
    clap::Command::new("port")
        .about("Network port checking tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("check")
                .about("Check if a port is open")
                .arg(clap::Arg::new("target").help("host:port").required(true)),
        )
        .subcommand(
            clap::Command::new("find")
                .about("Find an available port")
                .arg(
                    clap::Arg::new("start")
                        .long("start")
                        .default_value("3000")
                        .help("Start of range"),
                )
                .arg(
                    clap::Arg::new("end")
                        .long("end")
                        .default_value("3010")
                        .help("End of range"),
                ),
        )
        .subcommand(
            clap::Command::new("scan")
                .about("Scan common ports")
                .arg(clap::Arg::new("host").help("Host to scan").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("check", sub_m)) => {
            let target = sub_m.get_one::<String>("target").unwrap();
            println!("port check {target} (not yet implemented)");
        }
        Some((name, _m)) => {
            println!("port {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
