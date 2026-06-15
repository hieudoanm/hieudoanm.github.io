pub fn command() -> clap::Command {
    clap::Command::new("env")
        .about("Show environment variables")
        .arg(
            clap::Arg::new("filter")
                .help("Filter by key prefix")
                .index(1),
        )
        .arg(
            clap::Arg::new("sort")
                .long("sort")
                .help("Sort alphabetically by key"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let filter = matches.get_one::<String>("filter");
    let sort = matches.get_flag("sort");
    let json = matches.get_flag("json");

    let mut vars: Vec<(String, String)> = std::env::vars()
        .filter(|(k, _)| {
            if let Some(f) = filter {
                k.starts_with(f.as_str())
            } else {
                true
            }
        })
        .collect();

    if sort {
        vars.sort_by(|a, b| a.0.cmp(&b.0));
    }

    if json {
        let entries: Vec<serde_json::Value> = vars
            .iter()
            .map(|(k, v)| serde_json::json!({"key": k, "value": v}))
            .collect();
        println!("{}", serde_json::to_string_pretty(&entries)?);
    } else {
        for (k, v) in &vars {
            println!("{}={}", k, v);
        }
    }

    Ok(())
}
