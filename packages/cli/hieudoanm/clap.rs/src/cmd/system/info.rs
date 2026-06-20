use std::time::Duration;

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("info").about("Show system info").arg(
        clap::Arg::new("json")
            .long("json")
            .help("Output in JSON format"),
    )
}

pub fn format_uptime(seconds: u64) -> String {
    let days = seconds / 86400;
    let hours = (seconds % 86400) / 3600;
    let mins = (seconds % 3600) / 60;
    format!("{}d {}h {}m", days, hours, mins)
}

pub fn memory_to_gb(bytes: u64) -> f64 {
    bytes as f64 / 1_073_741_824.0
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let json = matches.json;
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

    let mem_total = memory_to_gb(total_mem);
    let mem_used = memory_to_gb(used_mem);

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
        println!("Uptime:   {}", format_uptime(uptime.as_secs()));
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_format_uptime_seconds() {
        assert_eq!(format_uptime(45), "0d 0h 0m");
    }

    #[test]
    fn test_format_uptime_minutes() {
        assert_eq!(format_uptime(125), "0d 0h 2m");
    }

    #[test]
    fn test_format_uptime_hours() {
        assert_eq!(format_uptime(3661), "0d 1h 1m");
    }

    #[test]
    fn test_format_uptime_days() {
        assert_eq!(format_uptime(90061), "1d 1h 1m");
    }

    #[test]
    fn test_format_uptime_exact_day() {
        assert_eq!(format_uptime(86400), "1d 0h 0m");
    }

    #[test]
    fn test_format_uptime_zero() {
        assert_eq!(format_uptime(0), "0d 0h 0m");
    }

    #[test]
    fn test_memory_to_gb() {
        let gb = memory_to_gb(1_073_741_824);
        assert!((gb - 1.0).abs() < 0.01);
    }

    #[test]
    fn test_memory_to_gb_zero() {
        assert!((memory_to_gb(0)).abs() < 0.01);
    }

    #[test]
    fn test_memory_to_gb_512mb() {
        let gb = memory_to_gb(536_870_912);
        assert!((gb - 0.5).abs() < 0.01);
    }
}
