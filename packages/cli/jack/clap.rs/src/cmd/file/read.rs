use std::io::{BufRead, BufReader};
use std::path::Path;

use crate::cmd::file::common::{detect_mime, split_lines};

pub fn compute_line_slice(offset: usize, lines: usize, total_lines: usize) -> (usize, usize) {
    let start = offset.min(total_lines);
    let end = if lines == 0 {
        total_lines
    } else {
        (start + lines).min(total_lines)
    };
    (start, end)
}

fn read_file_content(
    path: &str,
    offset: usize,
    lines: usize,
) -> anyhow::Result<(String, Vec<String>, usize)> {
    let path = Path::new(path);
    let info = std::fs::metadata(path)?;
    if info.is_dir() {
        anyhow::bail!("{:?} is a directory", path);
    }

    let data = std::fs::read_to_string(path)?;
    let all_lines = split_lines(&data);
    let total_lines = all_lines.len();

    let (start, end) = compute_line_slice(offset, lines, total_lines);
    let display_lines: Vec<String> = all_lines[start..end].to_vec();
    Ok((data, display_lines, total_lines))
}

fn render_read_text(
    path: &str,
    display_lines: &[String],
    start: usize,
    total_lines: usize,
    show_line_numbers: bool,
) {
    let abs = std::fs::canonicalize(path)
        .map(|p| p.display().to_string())
        .unwrap_or_else(|_| path.to_string());
    println!("── {abs} ──");

    if display_lines.is_empty() {
        println!("(empty file)");
        return;
    }

    let end = start + display_lines.len();
    let line_width = format!("{end}").len();
    for (i, line) in display_lines.iter().enumerate() {
        let num = start + i + 1;
        if show_line_numbers {
            println!("{num:>line_width$} | {line}");
        } else {
            println!("{line}");
        }
    }

    if start > 0 || end < total_lines {
        println!(
            "── {}/{} lines ({}-{}) ──",
            end - start,
            total_lines,
            start + 1,
            end
        );
    }
}

pub fn read_command() -> clap::Command {
    clap::Command::new("read")
        .about("Read file content with line numbers")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
        .arg(
            clap::Arg::new("lines")
                .short('n')
                .long("lines")
                .help("Number of lines to show (0 = all)")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("offset")
                .short('o')
                .long("offset")
                .help("Starting line offset (0-based)")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("numbers")
                .long("numbers")
                .help("Show line numbers")
                .default_value("true")
                .action(clap::ArgAction::Set),
        )
}

pub async fn read_run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let path = m.get_one::<String>("file").unwrap();
    let lines: usize = m.get_one::<String>("lines").unwrap().parse().unwrap_or(0);
    let offset: usize = m.get_one::<String>("offset").unwrap().parse().unwrap_or(0);
    let show_line_numbers = m
        .get_one::<String>("numbers")
        .map(|s| s != "false")
        .unwrap_or(true);

    let (content, display_lines, total_lines) = read_file_content(path, offset, lines)?;

    if json {
        let display_content = if offset > 0 || lines > 0 {
            display_lines.join("\n")
        } else {
            content
        };
        let info = std::fs::metadata(path)?;
        let output = serde_json::json!({
            "file": path,
            "size": info.len(),
            "mode": format!("{:o}", std::os::unix::fs::PermissionsExt::mode(&info.permissions())),
            "mime": detect_mime(path),
            "totalLines": total_lines,
            "content": display_content,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        render_read_text(path, &display_lines, offset, total_lines, show_line_numbers);
    }

    Ok(())
}

pub fn head_command() -> clap::Command {
    clap::Command::new("head")
        .about("Show the first N lines of a file")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
        .arg(
            clap::Arg::new("lines")
                .short('n')
                .long("lines")
                .help("Number of lines")
                .default_value("10"),
        )
}

pub async fn head_run(m: &clap::ArgMatches) -> anyhow::Result<()> {
    let path = m.get_one::<String>("file").unwrap();
    let lines: usize = m.get_one::<String>("lines").unwrap().parse().unwrap_or(10);

    let file = std::fs::File::open(path)?;
    let reader = BufReader::new(file);
    for (i, line) in reader.lines().enumerate() {
        if i >= lines {
            break;
        }
        println!("{}", line?);
    }
    Ok(())
}

pub fn tail_command() -> clap::Command {
    clap::Command::new("tail")
        .about("Show the last N lines of a file")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
        .arg(
            clap::Arg::new("lines")
                .short('n')
                .long("lines")
                .help("Number of lines")
                .default_value("10"),
        )
}

pub async fn tail_run(m: &clap::ArgMatches) -> anyhow::Result<()> {
    let path = m.get_one::<String>("file").unwrap();
    let lines: usize = m.get_one::<String>("lines").unwrap().parse().unwrap_or(10);

    let file = std::fs::File::open(path)?;
    let reader = BufReader::new(file);
    let mut ring: Vec<String> = Vec::with_capacity(lines);
    for line in reader.lines() {
        let line = line?;
        if ring.len() >= lines {
            ring.remove(0);
        }
        ring.push(line);
    }
    for line in &ring {
        println!("{line}");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compute_line_slice_no_limit() {
        assert_eq!(compute_line_slice(0, 0, 100), (0, 100));
    }

    #[test]
    fn test_compute_line_slice_with_limit() {
        assert_eq!(compute_line_slice(0, 10, 100), (0, 10));
    }

    #[test]
    fn test_compute_line_slice_with_offset() {
        assert_eq!(compute_line_slice(5, 10, 100), (5, 15));
    }

    #[test]
    fn test_compute_line_slice_offset_beyond_end() {
        assert_eq!(compute_line_slice(200, 10, 100), (100, 100));
    }

    #[test]
    fn test_compute_line_slice_limit_beyond_end() {
        assert_eq!(compute_line_slice(90, 20, 100), (90, 100));
    }

    #[test]
    fn test_compute_line_slice_exact_fit() {
        assert_eq!(compute_line_slice(0, 100, 100), (0, 100));
    }

    #[test]
    fn test_compute_line_slice_empty() {
        assert_eq!(compute_line_slice(0, 10, 0), (0, 0));
    }
}
