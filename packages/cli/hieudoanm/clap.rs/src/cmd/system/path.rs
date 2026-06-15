use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("path")
        .about("Show PATH entries")
        .arg(
            clap::Arg::new("name")
                .help("Command to find in PATH")
                .index(1),
        )
        .arg(
            clap::Arg::new("sort")
                .long("sort")
                .help("Sort alphabetically by path"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let cmd_name = matches.get_one::<String>("name");
    let sort = matches.get_flag("sort");
    let json = matches.get_flag("json");

    let path = std::env::var("PATH").unwrap_or_default();
    let dirs: Vec<&str> = path.split(':').collect();

    if let Some(name) = cmd_name {
        for dir in &dirs {
            let full = Path::new(dir).join(name);
            if full.exists() {
                if json {
                    let output =
                        serde_json::json!({"command": name, "path": full.to_string_lossy()});
                    println!("{}", serde_json::to_string_pretty(&output)?);
                } else {
                    println!("{}", full.display());
                }
                return Ok(());
            }
        }
        anyhow::bail!("command {:?} not found in PATH", name);
    }

    let mut entries: Vec<(usize, &str, bool)> = dirs
        .iter()
        .enumerate()
        .map(|(i, d)| (i, *d, Path::new(d).exists()))
        .collect();

    if sort {
        entries.sort_by(|a, b| a.1.cmp(b.1));
    }

    if json {
        let json_entries: Vec<serde_json::Value> = entries
            .iter()
            .map(|(i, d, exists)| serde_json::json!({"index": i, "dir": d, "exists": exists}))
            .collect();
        println!("{}", serde_json::to_string_pretty(&json_entries)?);
    } else {
        for (_, d, exists) in &entries {
            let mark = if *exists { " " } else { "✗" };
            println!(" {}  {}", mark, d);
        }
    }

    Ok(())
}
