use crate::cmd::file::common::split_lines;
use regex::Regex;

fn perform_edit(
    content: &str,
    old: &str,
    new_str: &str,
    use_regex: bool,
    count: usize,
) -> (String, usize) {
    if use_regex {
        let re = match Regex::new(old) {
            Ok(r) => r,
            Err(e) => {
                eprintln!("invalid regex {old:?}: {e}");
                return (content.to_string(), 0);
            }
        };

        let match_count = re.find_iter(content).count();

        if count > 0 {
            let mut result = String::new();
            let mut last_end = 0;
            let mut replaced = 0;

            for mat in re.find_iter(content) {
                if replaced >= count {
                    break;
                }
                result.push_str(&content[last_end..mat.start()]);
                result.push_str(new_str);
                last_end = mat.end();
                replaced += 1;
            }
            result.push_str(&content[last_end..]);
            return (result, replaced.min(count));
        }

        let replaced = re.replace_all(content, new_str).to_string();
        return (replaced, match_count);
    }

    let match_count = content.matches(old).count();
    let limit = if count > 0 && count < match_count {
        count
    } else {
        match_count
    };
    if count > 0 {
        (content.replacen(old, new_str, count), limit)
    } else {
        (content.replace(old, new_str), match_count)
    }
}

fn build_diff(before: &str, after: &str) -> String {
    let before_lines = split_lines(before);
    let after_lines = split_lines(after);
    let max_len = before_lines.len().max(after_lines.len());
    let mut result = String::new();

    for i in 0..max_len {
        let b_line = before_lines.get(i).map(|s| s.as_str()).unwrap_or("");
        let a_line = after_lines.get(i).map(|s| s.as_str()).unwrap_or("");
        if b_line != a_line {
            if !b_line.is_empty() {
                result.push_str(&format!("- {b_line}\n"));
            }
            if !a_line.is_empty() {
                result.push_str(&format!("+ {a_line}\n"));
            }
        }
    }

    while result.ends_with('\n') {
        result.pop();
    }
    result
}

fn show_diff(before: &str, after: &str) {
    let before_lines = split_lines(before);
    let after_lines = split_lines(after);
    let max_len = before_lines.len().max(after_lines.len());

    for i in 0..max_len {
        let b_line = before_lines.get(i).map(|s| s.as_str()).unwrap_or("");
        let a_line = after_lines.get(i).map(|s| s.as_str()).unwrap_or("");
        if b_line != a_line {
            println!("- {b_line}");
            println!("+ {a_line}");
        } else {
            println!("  {b_line}");
        }
    }
}

fn plural_s(n: usize) -> &'static str {
    if n == 1 {
        ""
    } else {
        "s"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_plural_s_singular() {
        assert_eq!(plural_s(1), "");
    }

    #[test]
    fn test_plural_s_plural() {
        assert_eq!(plural_s(0), "s");
        assert_eq!(plural_s(2), "s");
        assert_eq!(plural_s(100), "s");
    }

    #[test]
    fn test_perform_edit_basic_replace() {
        let (result, count) = perform_edit("hello world", "world", "there", false, 0);
        assert_eq!(result, "hello there");
        assert_eq!(count, 1);
    }

    #[test]
    fn test_perform_edit_no_match() {
        let (result, count) = perform_edit("hello world", "xyz", "abc", false, 0);
        assert_eq!(result, "hello world");
        assert_eq!(count, 0);
    }

    #[test]
    fn test_perform_edit_multiple_occurrences() {
        let (result, count) = perform_edit("a a a", "a", "b", false, 0);
        assert_eq!(result, "b b b");
        assert_eq!(count, 3);
    }

    #[test]
    fn test_perform_edit_with_count_limit() {
        let (result, count) = perform_edit("a a a", "a", "b", false, 2);
        assert_eq!(result, "b b a");
        assert_eq!(count, 2);
    }

    #[test]
    fn test_perform_edit_regex() {
        let (result, count) = perform_edit("hello 123 world 456", r"\d+", "NUM", true, 0);
        assert_eq!(result, "hello NUM world NUM");
        assert_eq!(count, 2);
    }

    #[test]
    fn test_perform_edit_regex_with_count() {
        let (result, count) = perform_edit("a1 b2 c3", r"\d", "X", true, 2);
        assert_eq!(result, "aX bX c3");
        assert_eq!(count, 2);
    }

    #[test]
    fn test_perform_edit_invalid_regex() {
        let (result, count) = perform_edit("hello", r"[invalid", "", true, 0);
        assert_eq!(result, "hello");
        assert_eq!(count, 0);
    }

    #[test]
    fn test_perform_edit_regex_no_match() {
        let (result, count) = perform_edit("hello", r"\d+", "NUM", true, 0);
        assert_eq!(result, "hello");
        assert_eq!(count, 0);
    }

    #[test]
    fn test_build_diff_identical() {
        let diff = build_diff("hello\nworld", "hello\nworld");
        assert!(diff.is_empty());
    }

    #[test]
    fn test_build_diff_added_line() {
        let diff = build_diff("hello", "hello\nworld");
        assert!(diff.contains("+ world"));
    }

    #[test]
    fn test_build_diff_removed_line() {
        let diff = build_diff("hello\nworld", "hello");
        assert!(diff.contains("- world"));
    }

    #[test]
    fn test_build_diff_changed_line() {
        let diff = build_diff("hello", "there");
        assert!(diff.contains("- hello"));
        assert!(diff.contains("+ there"));
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_show_diff_does_not_panic() {
        show_diff("hello\nworld", "hello\nthere");
        show_diff("", "new line");
        show_diff("old line", "");
    }

    #[tokio::test]
    async fn test_run_nonexistent_file() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec![
                "edit",
                "-f",
                "/tmp/nonexistent_edit_file_xyz.txt",
                "-o",
                "old",
                "--new",
                "new",
            ])
            .unwrap();
        let result = run(&m, false).await;
        assert!(result.is_err());
    }
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'f', long = "file", help = "File path")]
    pub file: String,
    #[arg(short = 'o', long = "old", help = "Text or pattern to replace")]
    pub old: String,
    #[arg(long = "new", help = "Replacement text")]
    pub new: String,
    #[arg(short = 'r', long = "regex", action = clap::ArgAction::SetTrue, help = "Interpret old as a regex pattern")]
    pub regex: bool,
    #[arg(short = 'p', long = "preview", action = clap::ArgAction::SetTrue, help = "Preview changes without modifying the file")]
    pub preview: bool,
    #[arg(
        short = 'n',
        long = "count",
        default_value = "0",
        help = "Number of occurrences to replace (0 = all)"
    )]
    pub count: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("edit")
        .about("Find and replace text in a file")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
        .arg(
            clap::Arg::new("old")
                .short('o')
                .long("old")
                .help("Text or pattern to replace")
                .required(true),
        )
        .arg(
            clap::Arg::new("new")
                .long("new")
                .help("Replacement text")
                .required(true),
        )
        .arg(
            clap::Arg::new("regex")
                .short('r')
                .long("regex")
                .help("Interpret old as a regex pattern")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("preview")
                .short('p')
                .long("preview")
                .help("Preview changes without modifying the file")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("count")
                .short('n')
                .long("count")
                .help("Number of occurrences to replace (0 = all)")
                .default_value("0"),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let path = m.get_one::<String>("file").unwrap();
    let old_str = m.get_one::<String>("old").unwrap();
    let new_str = m.get_one::<String>("new").unwrap();
    let use_regex = m.get_flag("regex");
    let preview = m.get_flag("preview");
    let count: usize = m.get_one::<String>("count").unwrap().parse().unwrap_or(0);

    let info = std::fs::metadata(path)?;
    if info.is_dir() {
        anyhow::bail!("{:?} is a directory", path);
    }

    let data = std::fs::read_to_string(path)?;
    let (replaced, match_count) = perform_edit(&data, old_str, new_str, use_regex, count);

    if match_count == 0 {
        if json {
            let output = serde_json::json!({
                "file": path,
                "matches": 0,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!("No matches found in {path}");
        }
        return Ok(());
    }

    if preview {
        if json {
            let diff = build_diff(&data, &replaced);
            let output = serde_json::json!({
                "file": path,
                "matches": match_count,
                "diff": diff,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!(
                "── Preview for {path} ({match_count} match{}) ──",
                plural_s(match_count)
            );
            show_diff(&data, &replaced);
        }
        return Ok(());
    }

    let mode = info.permissions();
    std::fs::write(path, &replaced)?;
    std::fs::set_permissions(path, mode)?;

    if json {
        let output = serde_json::json!({
            "file": path,
            "matches": match_count,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!(
            "Replaced {match_count} occurrence{} in {path}",
            plural_s(match_count)
        );
    }

    Ok(())
}
