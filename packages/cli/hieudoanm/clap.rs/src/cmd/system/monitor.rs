use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("monitor")
        .about("Show system metrics (CPU, RAM, processes)")
        .arg(
            clap::Arg::new("watch")
                .short('w')
                .long("watch")
                .default_value("0")
                .value_parser(clap::value_parser!(u64))
                .help("Refresh interval in seconds (0 = one-shot)"),
        )
        .arg(
            clap::Arg::new("procs")
                .short('p')
                .long("procs")
                .default_value("10")
                .value_parser(clap::value_parser!(usize))
                .help("Number of top processes to show"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let watch = *matches.get_one::<u64>("watch").unwrap_or(&0);
    let procs = *matches.get_one::<usize>("procs").unwrap_or(&10);
    run_monitor(watch, procs)
}

fn format_duration(d: Duration) -> String {
    let days = d.as_secs() / 86400;
    let hours = (d.as_secs() % 86400) / 3600;
    let mins = (d.as_secs() % 3600) / 60;
    let mut parts = Vec::new();
    if days > 0 {
        parts.push(format!("{days}d"));
    }
    if hours > 0 {
        parts.push(format!("{hours}h"));
    }
    parts.push(format!("{mins}m"));
    parts.join(" ")
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Duration;

    #[test]
    fn test_format_duration_seconds() {
        assert_eq!(format_duration(Duration::from_secs(30)), "0m");
        assert_eq!(format_duration(Duration::from_secs(59)), "0m");
    }

    #[test]
    fn test_format_duration_minutes() {
        assert_eq!(format_duration(Duration::from_secs(60)), "1m");
        assert_eq!(format_duration(Duration::from_secs(120)), "2m");
        assert_eq!(format_duration(Duration::from_secs(3600 - 1)), "59m");
    }

    #[test]
    fn test_format_duration_hours() {
        assert_eq!(format_duration(Duration::from_secs(3600)), "1h 0m");
        assert_eq!(format_duration(Duration::from_secs(3660)), "1h 1m");
        assert_eq!(format_duration(Duration::from_secs(86399)), "23h 59m");
    }

    #[test]
    fn test_format_duration_days() {
        assert_eq!(format_duration(Duration::from_secs(86400)), "1d 0m");
        assert_eq!(format_duration(Duration::from_secs(90000)), "1d 1h 0m");
        assert_eq!(format_duration(Duration::from_secs(172800)), "2d 0m");
    }

    #[test]
    fn test_format_duration_zero() {
        assert_eq!(format_duration(Duration::from_secs(0)), "0m");
    }
}

fn run_monitor(watch_secs: u64, top_n: usize) -> anyhow::Result<()> {
    use sysinfo::System;
    loop {
        let mut sys = System::new_all();
        sys.refresh_all();
        let cpu_total = sys.global_cpu_usage();
        let cpu_per_core: Vec<f32> = sys.cpus().iter().map(|c| c.cpu_usage()).collect();
        let ram_used = sys.used_memory() as f64 / 1_073_741_824.0;
        let ram_total = sys.total_memory() as f64 / 1_073_741_824.0;
        let ram_pct = if ram_total > 0.0 {
            (sys.used_memory() as f32 / sys.total_memory() as f32) * 100.0
        } else {
            0.0
        };
        let uptime = Duration::from_secs(System::uptime());
        let uptime_str = format_duration(uptime);
        let mut procs: Vec<_> = sys
            .processes()
            .values()
            .map(|p| {
                (
                    p.pid().as_u32(),
                    p.name().to_string_lossy().into_owned(),
                    p.cpu_usage(),
                    p.memory() / 1024,
                )
            })
            .collect();
        procs.sort_by(|a, b| b.2.partial_cmp(&a.2).unwrap_or(std::cmp::Ordering::Equal));
        procs.truncate(top_n);

        println!("\n┌─────────────────────────────────────────────┐");
        println!("│           SYSTEM MONITOR                    │");
        println!("├─────────────────────────────────────────────┤");
        println!(
            "│ CPU:  {cpu_total:>5.1}%  ({} cores)                    │",
            cpu_per_core.len()
        );
        println!("│ RAM:  {ram_pct:>5.1}%  ({ram_used:.1}/{ram_total:.1} GB)              │");
        println!("│ Uptime: {uptime_str:<20}          │");
        println!("├─────────────────────────────────────────────┤");
        println!("│ Top {top_n} Processes (by CPU)                  │");
        println!("├─────────────────────────────────────────────┤");
        println!(
            "│ {:<7} {:<20} {:>6} {:>8} │",
            "PID", "NAME", "CPU%", "MEM(KB)"
        );
        for (pid, name, cpu, mem) in &procs {
            let name = if name.len() > 18 {
                format!("{}…", &name[..18])
            } else {
                name.clone()
            };
            println!("│ {pid:<7} {name:<20} {cpu:>5.1} {mem:>8} │");
        }
        println!("└─────────────────────────────────────────────┘");

        if watch_secs == 0 {
            break;
        }
        std::thread::sleep(Duration::from_secs(watch_secs));
    }
    Ok(())
}
