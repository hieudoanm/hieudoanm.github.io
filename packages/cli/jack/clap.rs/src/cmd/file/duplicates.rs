use crate::cmd::file::common::{format_size, hex_encode};
use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::io::Read;
use walkdir::WalkDir;

fn quick_hash(path: &std::path::Path) -> anyhow::Result<String> {
    let mut file = std::fs::File::open(path)?;
    let mut buf = Vec::new();
    file.read_to_end(&mut buf)?;
    let mut hasher = Sha256::new();
    hasher.update(&buf);
    Ok(hex_encode(&hasher.finalize()))
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'd', long = "dir", help = "Directory to scan")]
    pub dir: String,
    #[arg(
        short = 'm',
        long = "min-size",
        default_value = "1",
        help = "Minimum file size to consider (bytes)"
    )]
    pub min_size: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("duplicates")
        .about("Find duplicate files by size and partial hash")
        .arg(
            clap::Arg::new("dir")
                .short('d')
                .long("dir")
                .help("Directory to scan")
                .required(true),
        )
        .arg(
            clap::Arg::new("min-size")
                .short('m')
                .long("min-size")
                .help("Minimum file size to consider (bytes)")
                .default_value("1"),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let dir = m.get_one::<String>("dir").unwrap();
    let min_size: u64 = m
        .get_one::<String>("min-size")
        .unwrap()
        .parse()
        .unwrap_or(1);

    let mut by_size: HashMap<u64, Vec<std::path::PathBuf>> = HashMap::new();

    for entry in WalkDir::new(dir).into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_dir() {
            continue;
        }
        let size = entry.metadata().map(|m| m.len()).unwrap_or(0);
        if size >= min_size {
            by_size
                .entry(size)
                .or_default()
                .push(entry.path().to_path_buf());
        }
    }

    let mut dup_groups: Vec<serde_json::Value> = Vec::new();
    let mut found_any = false;

    for (size, paths) in &by_size {
        if paths.len() < 2 {
            continue;
        }
        let mut by_hash: HashMap<String, Vec<String>> = HashMap::new();
        for p in paths {
            if let Ok(h) = quick_hash(p) {
                by_hash.entry(h).or_default().push(p.display().to_string());
            }
        }
        for dups in by_hash.values() {
            if dups.len() < 2 {
                continue;
            }
            found_any = true;
            if json {
                dup_groups.push(serde_json::json!({
                    "size": size,
                    "files": dups,
                }));
            } else {
                println!("Duplicates ({} each):", format_size(*size));
                for d in dups {
                    println!("  {d}");
                }
                println!();
            }
        }
    }

    if json {
        println!("{}", serde_json::to_string_pretty(&dup_groups)?);
    } else if !found_any {
        println!("No duplicates found.");
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
