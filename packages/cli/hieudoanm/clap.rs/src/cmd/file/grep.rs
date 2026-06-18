use crate::cmd::file::common::{is_binary, split_lines};
use anyhow::Context;
use regex::Regex;
use serde::Serialize;
use walkdir::WalkDir;

#[derive(Debug, Serialize)]
struct LineMatch {
    #[serde(skip_serializing_if = "Option::is_none")]
    file: Option<String>,
    line: usize,
    content: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    before: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    after: Option<String>,
}

fn compile_search_pattern(pattern: &str, fixed: bool, ignore_case: bool) -> anyhow::Result<Regex> {
    let p = if fixed {
        regex::escape(pattern)
    } else if ignore_case {
        format!("(?i){pattern}")
    } else {
        pattern.to_string()
    };
    Regex::new(&p).with_context(|| format!("invalid regex {pattern:?}"))
}

fn compile_include_pattern(include: &str) -> Option<Regex> {
    if include.is_empty() {
        return None;
    }
    let pattern = glob_to_regex(include);
    Regex::new(&pattern).ok()
}

fn glob_to_regex(pattern: &str) -> String {
    let escaped = regex::escape(pattern);
    let result = escaped.replace("\\*", ".*").replace("\\?", ".");
    format!("^{result}$")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compile_search_pattern_literal() {
        let re = compile_search_pattern("hello", false, false).unwrap();
        assert!(re.is_match("hello"));
        assert!(!re.is_match("world"));
    }

    #[test]
    fn test_compile_search_pattern_fixed() {
        let re = compile_search_pattern("he.lo", true, false).unwrap();
        assert!(re.is_match("he.lo"));
        assert!(!re.is_match("hello"));
    }

    #[test]
    fn test_compile_search_pattern_ignore_case() {
        let re = compile_search_pattern("hello", false, true).unwrap();
        assert!(re.is_match("Hello"));
        assert!(re.is_match("HELLO"));
    }

    #[test]
    fn test_compile_search_pattern_invalid_regex() {
        let result = compile_search_pattern(r"[invalid", false, false);
        assert!(result.is_err());
    }

    #[test]
    fn test_compile_include_pattern_empty() {
        assert!(compile_include_pattern("").is_none());
    }

    #[test]
    fn test_compile_include_pattern_basic() {
        let re = compile_include_pattern("*.rs").unwrap();
        assert!(re.is_match("main.rs"));
        assert!(!re.is_match("main.go"));
    }

    #[test]
    fn test_compile_include_pattern_no_extension() {
        let re = compile_include_pattern("Dockerfile").unwrap();
        assert!(re.is_match("Dockerfile"));
        assert!(!re.is_match("dockerfile"));
    }

    #[test]
    fn test_glob_to_regex_simple() {
        let re = regex::Regex::new(&glob_to_regex("*.rs")).unwrap();
        assert!(re.is_match("main.rs"));
        assert!(!re.is_match("main.go"));
    }

    #[test]
    fn test_glob_to_regex_question_mark() {
        let re = regex::Regex::new(&glob_to_regex("file.???")).unwrap();
        assert!(re.is_match("file.rsv"));
        assert!(!re.is_match("file.rs"));
    }

    #[test]
    fn test_glob_to_regex_literal_dot() {
        let re = regex::Regex::new(&glob_to_regex("min.js")).unwrap();
        assert!(re.is_match("min.js"));
        assert!(!re.is_match("minXjs"));
    }

    #[test]
    fn test_glob_to_regex_no_wildcards() {
        let re = regex::Regex::new(&glob_to_regex("exact.txt")).unwrap();
        assert!(re.is_match("exact.txt"));
        assert!(!re.is_match("exact"));
    }
}

fn search_file(
    re: &Regex,
    path: &str,
    context: usize,
    max_count: usize,
) -> anyhow::Result<Vec<LineMatch>> {
    let data = std::fs::read_to_string(path)?;
    let lines = split_lines(&data);
    let mut matches = Vec::new();

    for (i, line) in lines.iter().enumerate() {
        if re.is_match(line) {
            let mut m = LineMatch {
                file: None,
                line: i + 1,
                content: line.clone(),
                before: None,
                after: None,
            };

            if context > 0 {
                let start = i.saturating_sub(context);
                let end = (i + context + 1).min(lines.len());
                let mut ctx_lines: Vec<String> = Vec::new();
                for (j, line) in lines.iter().enumerate().skip(start).take(end - start) {
                    let mark = if j == i { ">" } else { " " };
                    ctx_lines.push(format!("{}{:>5}| {}", mark, j + 1, line));
                }
                let num_before = context.min(ctx_lines.len());
                m.before = Some(ctx_lines[..num_before].join("\n"));
                m.after = Some(ctx_lines.join("\n"));
            }

            matches.push(m);
            if max_count > 0 && matches.len() >= max_count {
                break;
            }
        }
    }

    Ok(matches)
}

fn grep_file(re: &Regex, path: &str, context: usize, max_count: usize) -> (Vec<LineMatch>, usize) {
    match search_file(re, path, context, max_count) {
        Ok(mut file_matches) => {
            for fm in &mut file_matches {
                fm.file = Some(path.to_string());
            }
            (file_matches, 1)
        }
        Err(e) => {
            eprintln!("error searching {path}: {e}");
            (Vec::new(), 0)
        }
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("grep")
        .about("Search file contents using regex or fixed strings")
        .arg(
            clap::Arg::new("pattern")
                .short('p')
                .long("pattern")
                .help("Regex or fixed string pattern to search for")
                .required(true),
        )
        .arg(
            clap::Arg::new("path")
                .short('P')
                .long("path")
                .help("File or directory to search (default: .)")
                .default_value(".")
                .required(false),
        )
        .arg(
            clap::Arg::new("include")
                .short('i')
                .long("include")
                .help("Glob pattern for file names (e.g. \"*.go\")")
                .required(false),
        )
        .arg(
            clap::Arg::new("context")
                .short('C')
                .long("context")
                .help("Show N lines of context around matches")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("fixed")
                .short('F')
                .long("fixed")
                .help("Fixed string match (not regex)")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("max-count")
                .short('m')
                .long("max-count")
                .help("Maximum number of matches")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("ignore-case")
                .short('v')
                .long("ignore-case")
                .help("Case-insensitive search")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let pattern = m.get_one::<String>("pattern").unwrap();
    let path = m.get_one::<String>("path").unwrap();
    let include = m
        .get_one::<String>("include")
        .map(|s| s.as_str())
        .unwrap_or("");
    let context: usize = m.get_one::<String>("context").unwrap().parse().unwrap_or(0);
    let fixed = m.get_flag("fixed");
    let max_count: usize = m
        .get_one::<String>("max-count")
        .unwrap()
        .parse()
        .unwrap_or(0);
    let ignore_case = m.get_flag("ignore-case");

    let re = compile_search_pattern(pattern, fixed, ignore_case)?;
    let include_re = compile_include_pattern(include);

    let mut matches = Vec::new();
    let mut total_files = 0;

    let info = std::fs::metadata(path)?;
    if !info.is_dir() {
        let (m, f) = grep_file(&re, path, context, max_count);
        matches.extend(m);
        total_files += f;
    } else {
        for entry in WalkDir::new(path).into_iter().filter_map(|e| e.ok()) {
            if entry.file_type().is_dir() {
                continue;
            }
            let entry_path = entry.path();
            let file_name = entry_path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("");
            if let Some(ref inc) = include_re {
                if !inc.is_match(file_name) {
                    continue;
                }
            }
            let path_str = entry_path.display().to_string();
            if is_binary(&path_str) {
                continue;
            }
            let (m, f) = grep_file(&re, &path_str, context, max_count);
            matches.extend(m);
            total_files += f;
        }
    }

    if json {
        let output = serde_json::json!({
            "pattern": pattern,
            "files": total_files,
            "matches": matches.len(),
            "results": matches,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
        return Ok(());
    }

    if matches.is_empty() {
        println!("(no matches)");
        return Ok(());
    }

    let multi_file = total_files > 1;
    for m in &matches {
        let prefix = if multi_file {
            format!("{}:", m.file.as_deref().unwrap_or(""))
        } else {
            String::new()
        };
        if let Some(ref before) = m.before {
            for line in before.lines() {
                println!("{prefix}  {line}");
            }
        }
        println!("{prefix}{}: {}", m.line, m.content);
        if let Some(ref after) = m.after {
            for line in after.lines() {
                println!("{prefix}  {line}");
            }
        }
    }

    Ok(())
}
