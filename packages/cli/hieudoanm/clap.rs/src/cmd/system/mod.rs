use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("system")
        .about("System monitoring and clipboard management")
        .subcommand_required(true)
        .subcommand(
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
                ),
        )
        .subcommand(
            clap::Command::new("clipboard").about("Listen to clipboard changes and store them"),
        )
        .subcommand(clap::Command::new("info").about("Show system info"))
        .subcommand(clap::Command::new("env").about("Show environment variables"))
        .subcommand(clap::Command::new("path").about("Show PATH entries"))
        .subcommand(clap::Command::new("disk").about("Show disk usage"))
        .subcommand(clap::Command::new("battery").about("Show battery status"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("monitor", sub_m)) => {
            let watch = *sub_m.get_one::<u64>("watch").unwrap_or(&0);
            let procs = *sub_m.get_one::<usize>("procs").unwrap_or(&10);
            run_monitor(watch, procs)?;
        }
        Some(("clipboard", _m)) => {
            run_clipboard()?;
        }
        Some(("info", _m)) => {
            println!("system info (not yet implemented)");
        }
        Some((name, _m)) => {
            println!("system {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
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

fn run_clipboard() -> anyhow::Result<()> {
    use rusqlite::Connection;

    let home = dirs::home_dir().ok_or_else(|| anyhow::anyhow!("cannot find home dir"))?;
    let dir = home.join(".hieudoanm");
    std::fs::create_dir_all(&dir)?;
    let path = dir.join("hieudoanm.db");
    let conn = Connection::open(&path)?;
    conn.execute_batch("CREATE TABLE IF NOT EXISTS clips (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);")?;

    #[cfg(target_os = "macos")]
    let read_clip = || -> anyhow::Result<String> {
        let output = std::process::Command::new("pbpaste")
            .output()
            .map_err(|e| anyhow::anyhow!("pbpaste failed: {e}"))?;
        Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
    };

    #[cfg(not(target_os = "macos"))]
    let read_clip =
        || -> anyhow::Result<String> { anyhow::bail!("clipboard not supported on this platform") };

    println!("Clipboard watcher started... (Ctrl+C to stop)");
    let mut last_text = String::new();
    loop {
        if let Ok(text) = read_clip() {
            if !text.is_empty() && text != last_text {
                conn.execute(
                    "INSERT INTO clips (content) VALUES (?1)",
                    rusqlite::params![text],
                )?;
                let preview: String = if text.len() > 40 {
                    format!("{}...", &text[..40])
                } else {
                    text.clone()
                };
                println!("Saved: {preview}");
                last_text = text;
            }
        }
        std::thread::sleep(Duration::from_millis(500));
    }
}
