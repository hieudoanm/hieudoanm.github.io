use crate::cmd::file::common::format_size;
use std::collections::HashMap;
use walkdir::WalkDir;

pub fn size_command() -> clap::Command {
    clap::Command::new("size")
        .about("Show file or directory size")
        .arg(
            clap::Arg::new("path")
                .short('p')
                .long("path")
                .help("File or directory path")
                .required(true),
        )
}

pub async fn size_run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let path = m.get_one::<String>("path").unwrap();
    let info = std::fs::metadata(path)?;

    let total = if info.is_dir() {
        let mut s = 0u64;
        for entry in WalkDir::new(path).into_iter().filter_map(|e| e.ok()) {
            if entry.file_type().is_file() {
                s += entry.metadata().map(|m| m.len()).unwrap_or(0);
            }
        }
        s
    } else {
        info.len()
    };

    if json {
        let output = serde_json::json!({
            "path": path,
            "size": total,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}  {path}", format_size(total));
    }

    Ok(())
}

pub fn stats_command() -> clap::Command {
    clap::Command::new("stats")
        .about("Show file statistics by extension")
        .arg(
            clap::Arg::new("dir")
                .short('d')
                .long("dir")
                .help("Directory path")
                .required(true),
        )
}

pub async fn stats_run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let dir = m.get_one::<String>("dir").unwrap();
    let mut ext_stats: HashMap<String, (usize, u64)> = HashMap::new();
    let mut total_files = 0usize;
    let mut total_size = 0u64;

    for entry in WalkDir::new(dir).into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_dir() {
            continue;
        }
        total_files += 1;
        let meta = entry.metadata().ok();
        let size = meta.as_ref().map(|m| m.len()).unwrap_or(0);
        total_size += size;
        let ext = entry
            .path()
            .extension()
            .and_then(|e| e.to_str())
            .map(|e| e.to_lowercase())
            .unwrap_or_default();
        let ext = if ext.is_empty() {
            "(no extension)".to_string()
        } else {
            format!(".{ext}")
        };
        let entry = ext_stats.entry(ext).or_insert((0, 0));
        entry.0 += 1;
        entry.1 += size;
    }

    let mut entries: Vec<(&String, &(usize, u64))> = ext_stats.iter().collect();
    entries.sort_by_key(|b| std::cmp::Reverse(b.1 .1));

    if json {
        let json_entries: Vec<serde_json::Value> = entries
            .iter()
            .map(|(ext, (count, size))| {
                serde_json::json!({
                    "extension": ext,
                    "files": count,
                    "size": size,
                })
            })
            .collect();
        let output = serde_json::json!({
            "path": dir,
            "totalFiles": total_files,
            "totalSize": total_size,
            "byExtension": json_entries,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
        return Ok(());
    }

    println!("Total files : {total_files}");
    println!("Total size  : {}", format_size(total_size));
    println!();
    println!("{:<20} {:>8} {:>12}", "Extension", "Files", "Size");
    println!("{}", "-".repeat(42));
    for (ext, (count, size)) in &entries {
        println!("{ext:<20} {count:>8} {:>12}", format_size(*size));
    }

    Ok(())
}


