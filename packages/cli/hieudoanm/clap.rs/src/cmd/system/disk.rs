use sysinfo::Disks;

fn format_bytes(bytes: u64) -> String {
    const UNITS: &[&str] = &["B", "KB", "MB", "GB", "TB"];
    let mut size = bytes as f64;
    let mut unit_idx = 0;
    while size >= 1024.0 && unit_idx < UNITS.len() - 1 {
        size /= 1024.0;
        unit_idx += 1;
    }
    format!("{:.1} {}", size, UNITS[unit_idx])
}

pub fn command() -> clap::Command {
    clap::Command::new("disk").about("Show disk usage").arg(
        clap::Arg::new("json")
            .long("json")
            .help("Output in JSON format"),
    )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let json = matches.get_flag("json");
    let disks = Disks::new_with_refreshed_list();

    if json {
        let entries: Vec<serde_json::Value> = disks
            .iter()
            .map(|d| {
                let total = d.total_space();
                let available = d.available_space();
                let used = total.saturating_sub(available);
                let pct = if total > 0 {
                    used as f64 / total as f64 * 100.0
                } else {
                    0.0
                };
                serde_json::json!({
                    "filesystem": d.name().to_string_lossy(),
                    "mount": d.mount_point().to_string_lossy(),
                    "size": format_bytes(total),
                    "used": format_bytes(used),
                    "avail": format_bytes(available),
                    "use_percent": format!("{:.0}%", pct),
                })
            })
            .collect();
        println!("{}", serde_json::to_string_pretty(&entries)?);
    } else {
        println!(
            "{:<24} {:>8} {:>8} {:>8} {:>6}  {:<8}",
            "Filesystem", "Size", "Used", "Avail", "Use%", "Mounted"
        );
        for disk in &disks {
            let total = disk.total_space();
            let available = disk.available_space();
            let used = total.saturating_sub(available);
            let pct = if total > 0 {
                used as f64 / total as f64 * 100.0
            } else {
                0.0
            };
            let fs_name = disk.name().to_string_lossy();
            let mount = disk.mount_point().to_string_lossy();
            println!(
                "{:<24} {:>8} {:>8} {:>8} {:>5.0}%  {}",
                fs_name,
                format_bytes(total),
                format_bytes(used),
                format_bytes(available),
                pct,
                mount,
            );
        }
    }

    Ok(())
}
