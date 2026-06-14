fn load_services() -> Vec<(String, String)> {
    let services = crate::configs::services();
    let mut result = Vec::new();
    for svcs in services.values() {
        for (name, url) in svcs {
            result.push((name.clone(), url.clone()));
        }
    }
    result
}

async fn check_service(_name: &str, url: &str) -> String {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .unwrap();
    match client.get(url).send().await {
        Ok(resp) => {
            let status = resp.status();
            if status.is_success() {
                format!("UP ({status})")
            } else {
                format!("DOWN ({status})")
            }
        }
        Err(e) => format!("ERROR: {e}"),
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("status").about("Check service status")
}

pub fn command_all() -> clap::Command {
    clap::Command::new("status-all")
        .about("Show status of all services")
        .alias("all")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let services = load_services();
    let mut options: Vec<String> = Vec::new();
    for (name, url) in &services {
        options.push(name.clone());
        println!("{name}: {}", check_service(name, url).await);
    }
    Ok(())
}

pub async fn run_all(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let services = load_services();
    println!("┌─────────────────────────────────────────────────────────────┐");
    println!("│                    Service Status Dashboard                  │");
    println!("├─────────────────────────────────────────────────────────────┤");
    for (name, url) in &services {
        print!("│ {name:<30} ");
        let status = check_service(name, url).await;
        let status_display = if status.starts_with("UP") {
            format!("\x1b[32m{status}\x1b[0m")
        } else if status.starts_with("DOWN") {
            format!("\x1b[31m{status}\x1b[0m")
        } else {
            format!("\x1b[33m{status}\x1b[0m")
        };
        println!("{status_display:<37} │");
    }
    println!("└─────────────────────────────────────────────────────────────┘");
    Ok(())
}
