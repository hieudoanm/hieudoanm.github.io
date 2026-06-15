use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("info")
        .about("Show system info")
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let json = matches.get_flag("json");
    let mut sys = sysinfo::System::new_all();
    sys.refresh_all();

    let hostname = sysinfo::System::host_name().unwrap_or_else(|| "unknown".into());
    let os_name = sysinfo::System::name().unwrap_or_else(|| "unknown".into());
    let os_version = sysinfo::System::os_version().unwrap_or_else(|| "unknown".into());
    let kernel = sysinfo::System::kernel_version().unwrap_or_else(|| "unknown".into());
    let arch = std::env::consts::ARCH;
    let cpus = sys.cpus();
    let cpu_cores = cpus.len();
    let cpu_brand = if cpu_cores > 0 {
        cpus[0].brand().to_string()
    } else {
        "unknown".into()
    };
    let total_mem = sys.total_memory();
    let used_mem = sys.used_memory();
    let uptime = Duration::from_secs(sysinfo::System::uptime());

    let mem_total = total_mem as f64 / 1_073_741_824.0;
    let mem_used = used_mem as f64 / 1_073_741_824.0;

    if json {
        let output = serde_json::json!({
            "hostname": hostname,
            "os": os_name,
            "os_version": os_version,
            "kernel": kernel,
            "arch": arch,
            "cpu_cores": cpu_cores,
            "cpu_brand": cpu_brand,
            "memory_total_gb": format!("{:.1}", mem_total),
            "memory_used_gb": format!("{:.1}", mem_used),
            "uptime_seconds": uptime.as_secs(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("Hostname: {}", hostname);
        println!("OS:       {} {}", os_name, os_version);
        println!("Kernel:   {}", kernel);
        println!("Arch:     {}", arch);
        println!("CPU:      {} ({} cores)", cpu_brand, cpu_cores);
        println!("Memory:   {:.1}/{:.1} GB", mem_used, mem_total);
        println!(
            "Uptime:   {}d {}h {}m",
            uptime.as_secs() / 86400,
            (uptime.as_secs() % 86400) / 3600,
            (uptime.as_secs() % 3600) / 60,
        );
    }

    Ok(())
}
