use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn check_cmd() -> clap::Command {
    stub_cmd!("check", "Check if a port is open")
        .arg(clap::Arg::new("target").help("host:port").required(true))
}
pub fn find_cmd() -> clap::Command {
    stub_cmd!("find", "Find an available port")
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
        )
}
pub fn scan_cmd() -> clap::Command {
    stub_cmd!("scan", "Scan common ports")
        .arg(clap::Arg::new("host").help("Host to scan").required(true))
}

pub async fn run(name: &str, matches: &ArgMatches) -> anyhow::Result<()> {
    match name {
        "check" => {
            let target = matches.get_one::<String>("target").unwrap();
            println!("port check {target} (not yet implemented)");
        }
        _ => {
            println!("{name} (not yet implemented)");
        }
    }
    Ok(())
}
