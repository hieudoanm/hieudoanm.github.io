use anyhow::Context;
use serde::Serialize;

#[derive(Serialize)]
struct TextMatch {
    file: String,
    line: usize,
    content: String,
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'p', long = "pattern", help = "Regex pattern to search")]
    pub pattern: String,
    #[arg(
        short = 'P',
        long = "path",
        default_value = ".",
        help = "File or directory to search"
    )]
    pub path: String,
    #[arg(short = 'i', long = "ignore-case", action = clap::ArgAction::SetTrue, help = "Case-insensitive search")]
    pub ignore_case: bool,
    #[arg(
        short = 'm',
        long = "max-count",
        default_value = "0",
        help = "Maximum number of matches"
    )]
    pub max_count: String,
    #[arg(long = "include")]
    pub include: Option<String>,
    #[arg(
        short = 'd',
        long = "max-depth",
        default_value = "0",
        help = "Maximum directory depth (0 = unlimited)"
    )]
    pub max_depth: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("text")
        .about("Search file contents using regex")
        .arg(
            clap::Arg::new("pattern")
                .long("pattern")
                .short('p')
                .help("Regex pattern to search")
                .required(true),
        )
        .arg(
            clap::Arg::new("path")
                .long("path")
                .short('P')
                .help("File or directory to search")
                .default_value("."),
        )
        .arg(
            clap::Arg::new("ignore_case")
                .long("ignore-case")
                .short('i')
                .action(clap::ArgAction::SetTrue)
                .help("Case-insensitive search"),
        )
        .arg(
            clap::Arg::new("max_count")
                .long("max-count")
                .short('m')
                .help("Maximum number of matches")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("include")
                .long("include")
                .help("Glob pattern for file names (e.g. \"*.go\")"),
        )
        .arg(
            clap::Arg::new("max_depth")
                .long("max-depth")
                .short('d')
                .help("Maximum directory depth (0 = unlimited)")
                .default_value("0"),
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
    let path = Some(&matches.path).map(|s| s.as_str()).unwrap_or(".");
    let ignore_case = matches.ignore_case;
    let max_count: usize = Some(&matches.max_count)
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);
    let include = matches.include.as_deref();
    let max_depth: usize = Some(&matches.max_depth)
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);
    let use_json = matches.json;

    let re_pattern = if ignore_case {
        format!("(?i){pattern}")
    } else {
        pattern.clone()
    };

    let re = regex::Regex::new(&re_pattern).context("invalid regex")?;
    let include_re = include.and_then(include_to_regex);

    let results = search_text_in_root(&re, include_re.as_ref(), path, max_depth, max_count)?;

    if use_json {
        let out = serde_json::json!({
            "pattern": pattern,
            "matches": results.len(),
            "results": results,
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else if results.is_empty() {
        println!("(no matches)");
    } else {
        for m in &results {
            println!("{}:{}: {}", m.file, m.line, m.content);
        }
        if results.len() > 1 {
            println!("\n{} matches", results.len());
        }
    }

    Ok(())
}

fn include_to_regex(include: &str) -> Option<regex::Regex> {
    let glob_re = include.replace('.', "\\.").replace('*', ".*");
    let re_str = format!("^{glob_re}$");
    regex::Regex::new(&re_str).ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_include_to_regex_exact() {
        let re = include_to_regex("main.rs").unwrap();
        assert!(re.is_match("main.rs"));
        assert!(!re.is_match("main.go"));
    }

    #[test]
    fn test_include_to_regex_wildcard() {
        let re = include_to_regex("*.rs").unwrap();
        assert!(re.is_match("main.rs"));
        assert!(re.is_match("lib.rs"));
        assert!(!re.is_match("main.go"));
    }

    #[test]
    fn test_include_to_regex_prefix_wildcard() {
        let re = include_to_regex("test_*").unwrap();
        assert!(re.is_match("test_foo.rs"));
        assert!(!re.is_match("foo_test.rs"));
    }

    #[test]
    fn test_include_to_regex_dot_in_pattern() {
        let re = include_to_regex("*.min.js").unwrap();
        assert!(re.is_match("app.min.js"));
        assert!(!re.is_match("app.dev.js"));
    }

    #[test]
    fn test_include_to_regex_invalid_pattern() {
        let re = include_to_regex("[invalid");
        assert!(re.is_none());
    }

    #[test]
    fn test_include_to_regex_empty() {
        let re = include_to_regex("").unwrap();
        assert!(re.is_match(""));
        assert!(!re.is_match("anything"));
    }
}

fn search_text_in_root(
    re: &regex::Regex,
    include: Option<&regex::Regex>,
    root: &str,
    max_depth: usize,
    max_count: usize,
) -> anyhow::Result<Vec<TextMatch>> {
    let mut results = Vec::new();
    let mut seen = std::collections::HashSet::new();

    let root_path = std::path::Path::new(root);
    if !root_path.exists() {
        return Ok(results);
    }

    if root_path.is_file() {
        let matches = search_file_text(root_path, re, max_count);
        for m in matches {
            let key = format!("{}:{}", m.file, m.content);
            if seen.insert(key) {
                results.push(m);
            }
        }
        return Ok(results);
    }

    let mut walker = walkdir::WalkDir::new(root);
    if max_depth > 0 {
        walker = walker.max_depth(max_depth);
    }

    for entry in walker.into_iter().filter_map(|e| e.ok()) {
        if !entry.file_type().is_file() {
            continue;
        }

        if let Some(inc) = include {
            let name = entry.file_name().to_string_lossy();
            if !inc.is_match(&name) {
                continue;
            }
        }

        let matches = search_file_text(entry.path(), re, max_count);
        for m in matches {
            let key = format!("{}:{}", m.file, m.content);
            if seen.insert(key) {
                results.push(m);
            }
        }
    }

    Ok(results)
}

fn search_file_text(path: &std::path::Path, re: &regex::Regex, max_count: usize) -> Vec<TextMatch> {
    let data = match std::fs::read(path) {
        Ok(d) => d,
        Err(_) => return Vec::new(),
    };

    if data.contains(&0) {
        return Vec::new();
    }

    let content = match String::from_utf8(data) {
        Ok(c) => c,
        Err(_) => return Vec::new(),
    };

    let mut matches = Vec::new();
    let file = path.to_string_lossy().to_string();

    for (i, line) in content.lines().enumerate() {
        if re.is_match(line) {
            matches.push(TextMatch {
                file: file.clone(),
                line: i + 1,
                content: line.to_string(),
            });
            if max_count > 0 && matches.len() >= max_count {
                break;
            }
        }
    }

    matches
}
