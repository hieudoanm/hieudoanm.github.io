use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'p', long = "pattern", help = "Glob pattern to match")]
    pub pattern: String,
    #[arg(
        short = 'd',
        long = "dir",
        default_value = ".",
        help = "Root directory to search"
    )]
    pub dir: String,
    #[arg(
        short = 'D',
        long = "max-depth",
        default_value = "0",
        help = "Maximum directory depth (0 = unlimited)"
    )]
    pub max_depth: String,
    #[arg(
        short = 't',
        long = "type",
        help = "Filter by type: f (file) or d (directory)"
    )]
    pub filter_type: Option<String>,
    #[arg(short = 'H', long = "hidden", action = clap::ArgAction::SetTrue, help = "Include hidden files and directories")]
    pub hidden: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("files")
        .about("Find files by glob pattern")
        .arg(
            clap::Arg::new("pattern")
                .long("pattern")
                .short('p')
                .help("Glob pattern to match")
                .required(true),
        )
        .arg(
            clap::Arg::new("dir")
                .long("dir")
                .short('d')
                .help("Root directory to search")
                .default_value("."),
        )
        .arg(
            clap::Arg::new("max_depth")
                .long("max-depth")
                .short('D')
                .help("Maximum directory depth (0 = unlimited)")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("filter_type")
                .long("type")
                .short('t')
                .help("Filter by type: f (file) or d (directory)"),
        )
        .arg(
            clap::Arg::new("hidden")
                .long("hidden")
                .short('H')
                .action(clap::ArgAction::SetTrue)
                .help("Include hidden files and directories"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let pattern = Some(&matches.pattern).context("pattern required")?;
    let dir = Some(&matches.dir).map(|s| s.as_str()).unwrap_or(".");
    let max_depth: usize = Some(&matches.max_depth)
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);
    let file_type = matches.filter_type.as_deref();
    let hidden = matches.hidden;
    let use_json = matches.json;

    let results = find_files_with_glob(pattern, dir, max_depth, file_type, hidden)?;

    if use_json {
        let out = serde_json::json!({
            "pattern": pattern,
            "root": dir,
            "files": results,
            "count": results.len(),
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else if results.is_empty() {
        println!("(no files found)");
    } else {
        for f in &results {
            println!("{f}");
        }
        if results.len() > 1 {
            println!("\n{} files found", results.len());
        }
    }

    Ok(())
}

fn find_files_with_glob(
    pattern: &str,
    root: &str,
    max_depth: usize,
    file_type: Option<&str>,
    hidden: bool,
) -> anyhow::Result<Vec<String>> {
    let root_path = std::path::Path::new(root);
    if !root_path.is_dir() {
        anyhow::bail!("{root:?} is not a directory");
    }

    let mut results: Vec<String> = Vec::new();

    let mut walker = walkdir::WalkDir::new(root);
    if max_depth > 0 {
        walker = walker.max_depth(max_depth);
    }

    let has_globstar = pattern.contains("**");

    for entry in walker.into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();

        if !hidden && is_hidden(path) {
            continue;
        }

        if let Some(ft) = file_type {
            if entry.file_type().is_dir() {
                if ft != "d" {
                    continue;
                }
            } else if ft != "f" {
                continue;
            }
        }

        let matched = if has_globstar {
            glob_match(pattern, path.to_string_lossy().as_ref())
        } else if entry.file_type().is_dir() {
            false
        } else {
            path.file_name()
                .and_then(|n| n.to_str())
                .map(|n| glob_match(pattern, n))
                .unwrap_or(false)
        };

        if matched {
            results.push(path.to_string_lossy().to_string());
        }
    }

    results.sort();
    Ok(results)
}

fn is_hidden(path: &std::path::Path) -> bool {
    path.components().any(|c| {
        if let std::path::Component::Normal(name) = c {
            if let Some(s) = name.to_str() {
                return s.starts_with('.');
            }
        }
        false
    })
}

fn glob_match(pattern: &str, name: &str) -> bool {
    let re_str = pattern
        .replace('.', "\\.")
        .replace('*', ".*")
        .replace('?', ".");
    let re_str = format!("^{re_str}$");
    regex::Regex::new(&re_str)
        .map(|re| re.is_match(name))
        .unwrap_or(false)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;

    #[test]
    fn test_is_hidden_dotfile() {
        assert!(is_hidden(Path::new("/home/user/.hidden")));
        assert!(is_hidden(Path::new(".git")));
    }

    #[test]
    fn test_is_hidden_non_hidden() {
        assert!(!is_hidden(Path::new("/home/user/file.txt")));
        assert!(!is_hidden(Path::new("src/main.rs")));
    }

    #[test]
    fn test_is_hidden_in_subdir() {
        assert!(is_hidden(Path::new("/home/user/.hidden/file.txt")));
        assert!(!is_hidden(Path::new("/home/user/docs/file.txt")));
    }

    #[test]
    fn test_glob_match_exact() {
        assert!(glob_match("foo.txt", "foo.txt"));
        assert!(!glob_match("foo.txt", "bar.txt"));
    }

    #[test]
    fn test_glob_match_wildcard() {
        assert!(glob_match("*.rs", "main.rs"));
        assert!(!glob_match("*.rs", "main.go"));
    }

    #[test]
    fn test_glob_match_prefix() {
        assert!(glob_match("test_*", "test_foo.rs"));
        assert!(!glob_match("test_*", "foo_test.rs"));
    }

    #[test]
    fn test_glob_match_question_mark() {
        assert!(glob_match("file.?sv", "file.rsv"));
        assert!(!glob_match("file.?sv", "file.rs"));
    }

    #[test]
    fn test_glob_match_dot_in_pattern() {
        assert!(glob_match("*.min.js", "app.min.js"));
    }

    #[test]
    fn test_glob_match_invalid_pattern() {
        assert!(!glob_match("[invalid", "test"));
    }
}
