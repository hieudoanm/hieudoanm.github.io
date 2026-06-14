pub fn command() -> clap::Command {
    clap::Command::new("find")
        .about("Find an available port in a range")
        .arg(
            clap::Arg::new("start")
                .long("start")
                .short('s')
                .help("Start of port range")
                .default_value("8000"),
        )
        .arg(
            clap::Arg::new("end")
                .long("end")
                .short('e')
                .help("End of port range")
                .default_value("9000"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let start: u16 = matches
        .get_one::<String>("start")
        .and_then(|s| s.parse().ok())
        .unwrap_or(8000);
    let end: u16 = matches
        .get_one::<String>("end")
        .and_then(|s| s.parse().ok())
        .unwrap_or(9000);
    let use_json = matches.get_flag("json");

    match find_available_port(start, end) {
        Some(port) => {
            if use_json {
                let result = serde_json::json!({"port": port});
                println!("{}", serde_json::to_string_pretty(&result)?);
            } else {
                println!("Available port: {port}");
            }
        }
        None => {
            if use_json {
                let result = serde_json::json!({"error": format!("no available ports in range {start}-{end}")});
                println!("{}", serde_json::to_string_pretty(&result)?);
            } else {
                println!("No available ports in range {start}-{end}");
            }
        }
    }

    Ok(())
}

fn find_available_port(start: u16, end: u16) -> Option<u16> {
    for port in start..=end {
        let addr = format!("localhost:{port}");
        if !super::check_port_open(&addr, 1) {
            return Some(port);
        }
    }
    None
}
