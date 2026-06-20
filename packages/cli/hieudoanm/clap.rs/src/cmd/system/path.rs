use std::path::Path;

#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Command to find in PATH")]
    pub name: Option<String>,
    #[arg(long = "sort", action = clap::ArgAction::SetTrue, help = "Sort alphabetically by path")]
    pub sort: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub fn parse_path(path: &str) -> Vec<&str> {
    path.split(':').collect()
}

pub fn find_in_path(path: &str, name: &str) -> Option<String> {
    let dirs: Vec<&str> = path.split(':').collect();
    for dir in &dirs {
        let full = Path::new(dir).join(name);
        if full.exists() {
            return Some(full.to_string_lossy().to_string());
        }
    }
    None
}

pub fn analyze_path_entries(path: &str) -> Vec<(usize, &str, bool)> {
    let dirs: Vec<&str> = path.split(':').collect();
    dirs.iter()
        .enumerate()
        .map(|(i, d)| (i, *d, Path::new(d).exists()))
        .collect()
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let cmd_name = matches.name.as_ref();
    let sort = matches.sort;
    let json = matches.json;

    let path = std::env::var("PATH").unwrap_or_default();

    if let Some(name) = cmd_name {
        match find_in_path(&path, name) {
            Some(full) => {
                if json {
                    let output = serde_json::json!({"command": name, "path": full});
                    println!("{}", serde_json::to_string_pretty(&output)?);
                } else {
                    println!("{full}");
                }
            }
            None => anyhow::bail!("command {:?} not found in PATH", name),
        }
        return Ok(());
    }

    let mut entries: Vec<(usize, &str, bool)> = analyze_path_entries(&path);

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_path_empty() {
        let dirs = parse_path("");
        assert_eq!(dirs, vec![""]);
    }

    #[test]
    fn test_parse_path_single() {
        let dirs = parse_path("/usr/bin");
        assert_eq!(dirs, vec!["/usr/bin"]);
    }

    #[test]
    fn test_parse_path_multiple() {
        let dirs = parse_path("/usr/bin:/usr/local/bin:/opt/homebrew/bin");
        assert_eq!(dirs.len(), 3);
        assert_eq!(dirs[0], "/usr/bin");
        assert_eq!(dirs[2], "/opt/homebrew/bin");
    }

    #[test]
    fn test_parse_path_trailing_colon() {
        let dirs = parse_path("/usr/bin:");
        assert_eq!(dirs, vec!["/usr/bin", ""]);
    }

    #[test]
    fn test_analyze_path_entries() {
        let entries = analyze_path_entries("/usr/bin:/nonexistent_dir_xyz123");
        assert_eq!(entries.len(), 2);
        assert_eq!(entries[0].1, "/usr/bin");
        assert!(entries[0].2);
        assert_eq!(entries[1].1, "/nonexistent_dir_xyz123");
        assert!(!entries[1].2);
    }
}
