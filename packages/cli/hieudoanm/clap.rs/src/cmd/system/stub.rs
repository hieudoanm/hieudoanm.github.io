pub fn info_cmd() -> clap::Command {
    clap::Command::new("info").about("Show system info")
}

pub fn env_cmd() -> clap::Command {
    clap::Command::new("env").about("Show environment variables")
}

pub fn path_cmd() -> clap::Command {
    clap::Command::new("path").about("Show PATH entries")
}

pub fn disk_cmd() -> clap::Command {
    clap::Command::new("disk").about("Show disk usage")
}

pub fn battery_cmd() -> clap::Command {
    clap::Command::new("battery").about("Show battery status")
}

pub async fn run(name: &str, _matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("system {name} (not yet implemented)");
    Ok(())
}
