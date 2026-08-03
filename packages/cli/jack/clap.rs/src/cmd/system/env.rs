#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Filter by key prefix")]
    pub filter: Option<String>,
    #[arg(long = "sort", action = clap::ArgAction::SetTrue, help = "Sort alphabetically by key")]
    pub sort: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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
                .action(clap::ArgAction::SetTrue)
                .help("Sort alphabetically by key"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let filter = matches.filter.as_ref();
    let sort = matches.sort;
    let json = matches.json;

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
